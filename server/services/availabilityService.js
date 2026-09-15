const Booking = require("../models/Booking");
const VehicleReservation = require("../models/VehicleReservation");

const BLOCKING_BOOKING_STATUSES = ["pending", "confirmed"];
const MAX_RESERVATION_DAYS = 120;

function toDateKey(value) {
    const date = value instanceof Date ? new Date(value) : new Date(String(value || ""));

    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid travel date.");
    }

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function dateKeyToUtcDate(dateKey) {
    return new Date(`${dateKey}T00:00:00.000Z`);
}

function getReservationDateKeys({ travelDate, returnDate, tripType = "one_way" }) {
    const startKey = toDateKey(travelDate);
    const endKey =
        tripType === "round_trip" && returnDate
            ? toDateKey(returnDate)
            : startKey;

    const start = dateKeyToUtcDate(startKey);
    const end = dateKeyToUtcDate(endKey);

    if (end.getTime() < start.getTime()) {
        throw new Error("Return date cannot be before travel date.");
    }

    const keys = [];
    const cursor = new Date(start);

    while (cursor.getTime() <= end.getTime()) {
        keys.push(toDateKey(cursor));

        if (keys.length > MAX_RESERVATION_DAYS) {
            throw new Error(
                `A single booking cannot reserve more than ${MAX_RESERVATION_DAYS} days.`
            );
        }

        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return keys;
}

async function findBlockingBooking({
    vehicleId,
    travelDate,
    returnDate,
    tripType = "one_way",
    excludeBookingId = null
}) {
    const requestedKeys = getReservationDateKeys({
        travelDate,
        returnDate,
        tripType
    });

    const firstDate = dateKeyToUtcDate(requestedKeys[0]);
    const lastDate = dateKeyToUtcDate(requestedKeys[requestedKeys.length - 1]);
    lastDate.setUTCHours(23, 59, 59, 999);

    const query = {
        vehicle: vehicleId,
        bookingStatus: { $in: BLOCKING_BOOKING_STATUSES },
        travelDate: { $lte: lastDate },
        $or: [
            { returnDate: { $gte: firstDate } },
            {
                returnDate: null,
                travelDate: { $gte: firstDate }
            }
        ]
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    return Booking.findOne(query)
        .select("bookingNumber travelDate returnDate pickupTime bookingStatus")
        .lean();
}

async function findReservationConflict({
    vehicleId,
    travelDate,
    returnDate,
    tripType = "one_way",
    excludeBookingId = null
}) {
    const dateKeys = getReservationDateKeys({
        travelDate,
        returnDate,
        tripType
    });

    const query = {
        vehicle: vehicleId,
        dateKey: { $in: dateKeys }
    };

    if (excludeBookingId) {
        query.booking = { $ne: excludeBookingId };
    }

    return VehicleReservation.findOne(query).lean();
}

async function getVehicleConflict(params) {
    const reservationConflict = await findReservationConflict(params);

    if (reservationConflict) {
        return {
            type: "reservation",
            dateKey: reservationConflict.dateKey,
            booking: reservationConflict.booking
        };
    }

    const bookingConflict = await findBlockingBooking(params);

    if (bookingConflict) {
        return {
            type: "booking",
            booking: bookingConflict
        };
    }

    return null;
}

async function reserveVehicleDates({
    vehicleId,
    bookingId,
    travelDate,
    returnDate,
    tripType = "one_way"
}) {
    await VehicleReservation.init();

    const dateKeys = getReservationDateKeys({
        travelDate,
        returnDate,
        tripType
    });

    const docs = dateKeys.map((dateKey) => ({
        vehicle: vehicleId,
        booking: bookingId,
        dateKey
    }));

    try {
        await VehicleReservation.insertMany(docs, { ordered: true });
        return dateKeys;
    } catch (error) {
        // insertMany can insert the earlier documents before encountering
        // a duplicate. Remove only this booking's partial reservation set.
        await VehicleReservation.deleteMany({ booking: bookingId });

        if (error && (error.code === 11000 || error.name === "MongoBulkWriteError")) {
            const conflictError = new Error(
                "This vehicle is already booked for one or more selected dates. Please choose another vehicle or date."
            );
            conflictError.code = "VEHICLE_ALREADY_BOOKED";
            throw conflictError;
        }

        throw error;
    }
}

async function replaceVehicleDates({
    vehicleId,
    bookingId,
    travelDate,
    returnDate,
    tripType = "one_way"
}) {
    const oldReservations = await VehicleReservation.find({ booking: bookingId })
        .select("vehicle booking dateKey")
        .lean();

    const conflict = await getVehicleConflict({
        vehicleId,
        travelDate,
        returnDate,
        tripType,
        excludeBookingId: bookingId
    });

    if (conflict) {
        const error = new Error(
            "This vehicle is already booked for the newly selected date(s). Please choose another date."
        );
        error.code = "VEHICLE_ALREADY_BOOKED";
        throw error;
    }

    await VehicleReservation.deleteMany({ booking: bookingId });

    try {
        await reserveVehicleDates({
            vehicleId,
            bookingId,
            travelDate,
            returnDate,
            tripType
        });
    } catch (error) {
        if (oldReservations.length) {
            try {
                await VehicleReservation.insertMany(oldReservations, { ordered: false });
            } catch (restoreError) {
                console.error(
                    "Unable to restore previous vehicle reservations:",
                    restoreError.message
                );
            }
        }

        throw error;
    }
}

async function releaseVehicleDates(bookingId) {
    await VehicleReservation.deleteMany({ booking: bookingId });
}

async function getUnavailableVehicleIds({ travelDate, returnDate, tripType = "one_way" }) {
    const dateKeys = getReservationDateKeys({
        travelDate,
        returnDate,
        tripType
    });

    const rows = await VehicleReservation.find({
        dateKey: { $in: dateKeys }
    })
        .distinct("vehicle");

    return rows.map((id) => String(id));
}

async function syncActiveBookingReservations() {
    await VehicleReservation.init();

    const activeBookings = await Booking.find({
        bookingStatus: { $in: BLOCKING_BOOKING_STATUSES },
        vehicle: { $ne: null }
    })
        .select("_id vehicle travelDate returnDate tripType")
        .lean();

    const activeBookingIds = activeBookings.map((booking) => booking._id);

    // Remove stale locks left by cancelled/rejected/completed bookings or by
    // an interrupted create flow. Only pending/confirmed bookings own locks.
    const cleanupResult = await VehicleReservation.deleteMany({
        booking: { $nin: activeBookingIds }
    });

    let created = 0;

    for (const booking of activeBookings) {
        let dateKeys;

        try {
            dateKeys = getReservationDateKeys({
                travelDate: booking.travelDate,
                returnDate: booking.returnDate,
                tripType: booking.tripType
            });
        } catch (error) {
            console.warn(
                `Skipping reservation sync for booking ${booking._id}: ${error.message}`
            );
            continue;
        }

        for (const dateKey of dateKeys) {
            try {
                const result = await VehicleReservation.updateOne(
                    {
                        vehicle: booking.vehicle,
                        dateKey
                    },
                    {
                        $setOnInsert: {
                            vehicle: booking.vehicle,
                            booking: booking._id,
                            dateKey
                        }
                    },
                    { upsert: true }
                );

                if (result.upsertedCount) {
                    created += 1;
                }
            } catch (error) {
                // If old data already contains two overlapping bookings,
                // preserve the first reservation and log the conflict.
                console.warn(
                    `Reservation sync conflict for vehicle ${booking.vehicle} on ${dateKey}: ${error.message}`
                );
            }
        }
    }

    return {
        activeBookings: activeBookings.length,
        created,
        removedStale: cleanupResult.deletedCount || 0
    };
}

module.exports = {
    BLOCKING_BOOKING_STATUSES,
    getReservationDateKeys,
    getVehicleConflict,
    reserveVehicleDates,
    replaceVehicleDates,
    releaseVehicleDates,
    getUnavailableVehicleIds,
    syncActiveBookingReservations
};

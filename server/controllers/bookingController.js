const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const { calculateBookingAmount } = require("../utils/pricing");
const {
    getVehicleConflict,
    reserveVehicleDates,
    replaceVehicleDates,
    releaseVehicleDates
} = require("../services/availabilityService");

// How long (ms) a customer has to modify/cancel a fresh booking
// before the partner may start acting on it.
const BOOKING_EDIT_WINDOW_MS = 5 * 60 * 1000;

const BOOKING_POPULATE_VEHICLE_FIELDS =
    "vehicleName brand model vehicleNumber vehicleType seatCapacity airConditioning fuelType pricePerKm minimumKm fixedRoutes driverIncluded driverAllowance extraCharges vehiclePhotos availabilityStatus availabilityNote";

// CREATE BOOKING
async function createBooking(req, res) {
    try {
        const {
            vehicle,
            partner,
            serviceType,
            serviceName,
            tripType,
            pickup,
            drop,
            travelDate,
            returnDate,
            pickupTime,
            flightNumber,
            guests,
            distanceKm,
            notes
        } = req.body;

        // BASIC VALIDATION
        if (!serviceType || !serviceName || !travelDate) {
            return res.status(400).json({
                message:
                    "Service type, service name and travel date are required."
            });
        }

        if (!["tour", "ride"].includes(serviceType)) {
            return res.status(400).json({
                message: "Invalid service type."
            });
        }

        if (serviceType === "ride") {
            if (!vehicle) {
                return res.status(400).json({
                    message: "Vehicle is required for a ride booking."
                });
            }

            if (!pickup || !drop) {
                return res.status(400).json({
                    message: "Pickup and drop locations are required."
                });
            }

            if (!pickupTime) {
                return res.status(400).json({
                    message: "Pickup time is required."
                });
            }
        }

        const guestCount = Number(guests || 1);

        if (!Number.isInteger(guestCount) || guestCount < 1) {
            return res.status(400).json({
                message: "Guests must be at least 1."
            });
        }

        if (!["one_way", "round_trip"].includes(tripType || "one_way")) {
            return res.status(400).json({
                message: "Invalid trip type."
            });
        }

        if (
            (tripType || "one_way") === "round_trip" &&
            !returnDate
        ) {
            return res.status(400).json({
                message: "Return date is required for round trip."
            });
        }

        let selectedVehicle = null;
        let selectedPartner = null;

        // VEHICLE BOOKING
        if (serviceType === "ride") {
            selectedVehicle = await Vehicle.findOne({
                _id: vehicle,
                vehicleStatus: "active",
                adminApproval: "approved"
            });

            if (!selectedVehicle) {
                return res.status(400).json({
                    message:
                        "Selected vehicle is no longer available."
                });
            }

            // CHECK SEATING CAPACITY
            if (guestCount > selectedVehicle.seatCapacity) {
                return res.status(400).json({
                    message:
                        `This vehicle can carry a maximum of ${selectedVehicle.seatCapacity} passengers.`
                });
            }

            // VEHICLE PARTNER
            selectedPartner = await User.findOne({
                _id: selectedVehicle.partner,
                role: "partner",
                partnerStatus: "approved",
                accountStatus: "active"
            });

            if (!selectedPartner) {
                return res.status(400).json({
                    message:
                        "The partner for this vehicle is currently unavailable."
                });
            }

            // IF FRONTEND SENT PARTNER, MAKE SURE IT MATCHES
            if (
                partner &&
                partner.toString() !== selectedPartner._id.toString()
            ) {
                return res.status(400).json({
                    message:
                        "Selected vehicle and partner do not match."
                });
            }

            if (
                selectedVehicle.availabilityStatus &&
                selectedVehicle.availabilityStatus !== "available"
            ) {
                const state =
                    selectedVehicle.availabilityStatus === "maintenance"
                        ? "under maintenance"
                        : "currently unavailable";

                return res.status(409).json({
                    success: false,
                    code: "VEHICLE_UNAVAILABLE",
                    message: `This vehicle is ${state}. Please choose another vehicle.`
                });
            }

            const conflict = await getVehicleConflict({
                vehicleId: selectedVehicle._id,
                travelDate,
                returnDate,
                tripType: tripType || "one_way"
            });

            if (conflict) {
                return res.status(409).json({
                    success: false,
                    code: "VEHICLE_ALREADY_BOOKED",
                    message:
                        "This vehicle is already booked for the selected date(s). Please choose another vehicle or travel date."
                });
            }
        }

        // DISTANCE
        let routeDistanceKm = Number(distanceKm || 0);

        if (!Number.isFinite(routeDistanceKm) || routeDistanceKm < 0) {
            routeDistanceKm = 0;
        }

        // PRICING (fixed route price if it matches, else per-km)
        let amount = 0;

        let pricePerKm = 0;
        let minimumKm = 0;
        let billableKm = 0;
        let driverAllowance = 0;
        let extraCharges = 0;
        let pricingType = "per_km";
        let matchedRoute = null;

        if (selectedVehicle) {
            const priced = calculateBookingAmount(selectedVehicle, {
                pickup,
                drop,
                tripType: tripType || "one_way",
                distanceKm: routeDistanceKm
            });

            amount = priced.amount;
            pricePerKm = priced.pricePerKm;
            minimumKm = priced.minimumKm;
            billableKm = priced.billableKm;
            driverAllowance = priced.driverAllowance;
            extraCharges = priced.extraCharges;
            pricingType = priced.pricingType;
            matchedRoute = priced.matchedRoute;
        }

        // BOOKING NUMBER
        const bookingNumber =
            "TZ-" +
            Date.now().toString().slice(-8) +
            Math.floor(100 + Math.random() * 900);

        // Reserve the selected vehicle's calendar days BEFORE creating the
        // booking. The reservation collection has a unique vehicle/date index,
        // so two near-simultaneous requests cannot double-book the same car.
        const bookingId = new mongoose.Types.ObjectId();
        let datesReserved = false;

        if (selectedVehicle) {
            try {
                await reserveVehicleDates({
                    vehicleId: selectedVehicle._id,
                    bookingId,
                    travelDate,
                    returnDate,
                    tripType: tripType || "one_way"
                });
                datesReserved = true;
            } catch (reservationError) {
                if (reservationError.code === "VEHICLE_ALREADY_BOOKED") {
                    return res.status(409).json({
                        success: false,
                        code: "VEHICLE_ALREADY_BOOKED",
                        message: reservationError.message
                    });
                }

                throw reservationError;
            }
        }

        // CREATE BOOKING
        let booking;

        try {
            booking = await Booking.create({
            _id: bookingId,
            bookingNumber,

            customer: req.user._id,

            partner: selectedPartner
                ? selectedPartner._id
                : partner || null,

            vehicle: selectedVehicle
                ? selectedVehicle._id
                : vehicle || null,

            serviceType,

            serviceName,

            tripType: tripType || "one_way",

            pickup: pickup || "",

            drop: drop || "",

            travelDate,

            returnDate:
                (tripType || "one_way") === "round_trip"
                    ? returnDate
                    : null,

            pickupTime: pickupTime || "",

            flightNumber: flightNumber || "",

            guests: guestCount,

            distanceKm: routeDistanceKm,

            amount,

            pricing: {
                pricePerKm,
                minimumKm,
                billableKm,
                driverAllowance,
                extraCharges
            },

            pricingType,

            fixedRouteMatched: matchedRoute || {
                fromCity: "",
                toCity: "",
                price: 0
            },

            paymentMethod: "pending",

            paymentStatus: "pending",

            bookingStatus: "pending",

            notes: notes || "",

            // Customer can freely modify/cancel for the next 5 minutes
            editableUntil: new Date(Date.now() + BOOKING_EDIT_WINDOW_MS)
            });
        } catch (createError) {
            if (datesReserved) {
                await releaseVehicleDates(bookingId);
            }
            throw createError;
        }

        // RETURN COMPLETE BOOKING
        const populatedBooking =
            await Booking.findById(booking._id)
                .populate(
                    "customer",
                    "firstName lastName email phone city"
                )
                .populate(
                    "partner",
                    "firstName lastName email phone city partnerStatus"
                )
                .populate(
                    "vehicle",
                    BOOKING_POPULATE_VEHICLE_FIELDS
                );

        return res.status(201).json({
            message:
                "Booking request created successfully.",

            booking: populatedBooking
        });
    } catch (error) {
        console.error("Create booking error:", error);

        return res.status(500).json({
            message: "Failed to create booking."
        });
    }
}


// CUSTOMER BOOKINGS
async function getMyBookings(req, res) {
    try {
        const bookings = await Booking.find({
            customer: req.user._id
        })
            .populate(
                "partner",
                "firstName lastName email phone city partnerStatus"
            )
            .populate(
                "vehicle",
                "vehicleName brand model vehicleNumber vehicleType seatCapacity airConditioning fuelType vehiclePhotos"
            )
            .sort({ createdAt: -1 });

        return res.json({
            bookings
        });
    } catch (error) {
        console.error(
            "Get customer bookings error:",
            error
        );

        return res.status(500).json({
            message: "Failed to load bookings."
        });
    }
}


// PARTNER BOOKINGS
async function getPartnerBookings(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message:
                    "Only partners can access partner bookings."
            });
        }

        const bookings = await Booking.find({
            partner: req.user._id
        })
            .populate(
                "customer",
                "firstName lastName email phone city"
            )
            .populate(
                "vehicle",
                "vehicleName brand model vehicleNumber vehicleType seatCapacity airConditioning fuelType vehiclePhotos"
            )
            .sort({ createdAt: -1 });

        return res.json({
            bookings
        });
    } catch (error) {
        console.error(
            "Get partner bookings error:",
            error
        );

        return res.status(500).json({
            message: "Failed to load bookings."
        });
    }
}


// SINGLE BOOKING
async function getBookingById(req, res) {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate(
                "customer",
                "firstName lastName email phone city"
            )
            .populate(
                "partner",
                "firstName lastName email phone city partnerStatus"
            )
            .populate(
                "vehicle",
                BOOKING_POPULATE_VEHICLE_FIELDS
            );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        const isCustomer =
            booking.customer &&
            booking.customer._id.toString() ===
                req.user._id.toString();

        const isPartner =
            booking.partner &&
            booking.partner._id.toString() ===
                req.user._id.toString();

        const isAdmin =
            req.user.role === "admin";

        if (!isCustomer && !isPartner && !isAdmin) {
            return res.status(403).json({
                message:
                    "You are not allowed to view this booking."
            });
        }

        return res.json({
            booking
        });
    } catch (error) {
        console.error(
            "Get booking error:",
            error
        );

        return res.status(500).json({
            message: "Failed to load booking."
        });
    }
}


// PARTNER ACCEPTS BOOKING
async function acceptBooking(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message:
                    "Only partners can accept bookings."
            });
        }

        const { driverName, driverPhone } = req.body;

        // Confirming a booking now means dispatching a driver for it,
        // so the partner must provide who is driving before the
        // booking can move to "confirmed".
        if (!driverName || !String(driverName).trim()) {
            return res.status(400).json({
                message:
                    "Driver name is required to confirm this booking."
            });
        }

        if (!driverPhone || !String(driverPhone).trim()) {
            return res.status(400).json({
                message:
                    "Driver phone number is required to confirm this booking."
            });
        }

        const booking = await Booking.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (booking.bookingStatus !== "pending") {
            return res.status(400).json({
                message:
                    "Only pending bookings can be accepted."
            });
        }

        booking.bookingStatus = "confirmed";

        booking.driver = {
            name: String(driverName).trim(),
            phone: String(driverPhone).trim(),
            assignedAt: new Date()
        };

        // Once confirmed, the customer's self-service edit window closes -
        // any further changes go through the partner/support.
        booking.editableUntil = null;

        await booking.save();

        const populatedBooking = await Booking.findById(booking._id)
            .populate(
                "customer",
                "firstName lastName email phone city"
            )
            .populate(
                "vehicle",
                BOOKING_POPULATE_VEHICLE_FIELDS
            );

        return res.json({
            message:
                "Booking confirmed and driver assigned successfully.",
            booking: populatedBooking
        });
    } catch (error) {
        console.error(
            "Accept booking error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to accept booking."
        });
    }
}


// CUSTOMER MODIFIES A PENDING BOOKING (within the 5-minute window)
async function updateBooking(req, res) {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            customer: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (booking.bookingStatus !== "pending") {
            return res.status(400).json({
                message:
                    "Only pending bookings can be modified. This one has already moved forward."
            });
        }

        if (
            !booking.editableUntil ||
            Date.now() > new Date(booking.editableUntil).getTime()
        ) {
            return res.status(400).json({
                message:
                    "The 5-minute modification window for this booking has expired."
            });
        }

        const {
            pickup,
            drop,
            travelDate,
            returnDate,
            pickupTime,
            flightNumber,
            guests,
            tripType,
            notes
        } = req.body;

        if (tripType !== undefined) {
            if (!["one_way", "round_trip"].includes(tripType)) {
                return res.status(400).json({
                    message: "Invalid trip type."
                });
            }

            booking.tripType = tripType;
        }

        if (pickup !== undefined) {
            if (!String(pickup).trim()) {
                return res.status(400).json({
                    message: "Pickup location cannot be empty."
                });
            }

            booking.pickup = String(pickup).trim();
        }

        if (drop !== undefined) {
            if (!String(drop).trim()) {
                return res.status(400).json({
                    message: "Drop location cannot be empty."
                });
            }

            booking.drop = String(drop).trim();
        }

        if (travelDate !== undefined) {
            booking.travelDate = travelDate;
        }

        if (returnDate !== undefined) {
            booking.returnDate =
                booking.tripType === "round_trip" ? returnDate : null;
        }

        if (pickupTime !== undefined) {
            booking.pickupTime = String(pickupTime).trim();
        }

        if (flightNumber !== undefined) {
            booking.flightNumber = String(flightNumber).trim();
        }

        if (notes !== undefined) {
            booking.notes = String(notes).trim();
        }

        if (guests !== undefined) {
            const guestCount = Number(guests);

            if (!Number.isInteger(guestCount) || guestCount < 1) {
                return res.status(400).json({
                    message: "Guests must be at least 1."
                });
            }

            if (booking.vehicle) {
                const vehicle = await Vehicle.findById(booking.vehicle);

                if (vehicle && guestCount > vehicle.seatCapacity) {
                    return res.status(400).json({
                        message:
                            `This vehicle can carry a maximum of ${vehicle.seatCapacity} passengers.`
                    });
                }
            }

            booking.guests = guestCount;
        }

        // Re-price the trip if the route or trip type changed, in
        // case it now matches (or no longer matches) a fixed route.
        if (
            booking.vehicle &&
            (pickup !== undefined ||
                drop !== undefined ||
                tripType !== undefined)
        ) {
            const vehicle = await Vehicle.findById(booking.vehicle);

            if (vehicle) {
                const priced = calculateBookingAmount(vehicle, {
                    pickup: booking.pickup,
                    drop: booking.drop,
                    tripType: booking.tripType,
                    distanceKm: booking.distanceKm
                });

                booking.amount = priced.amount;
                booking.pricingType = priced.pricingType;

                booking.fixedRouteMatched = priced.matchedRoute || {
                    fromCity: "",
                    toCity: "",
                    price: 0
                };

                booking.pricing = {
                    pricePerKm: priced.pricePerKm,
                    minimumKm: priced.minimumKm,
                    billableKm: priced.billableKm,
                    driverAllowance: priced.driverAllowance,
                    extraCharges: priced.extraCharges
                };
            }
        }

        if (
            booking.vehicle &&
            (travelDate !== undefined ||
                returnDate !== undefined ||
                tripType !== undefined)
        ) {
            const vehicleRecord = await Vehicle.findById(booking.vehicle);

            if (
                vehicleRecord &&
                vehicleRecord.availabilityStatus &&
                vehicleRecord.availabilityStatus !== "available"
            ) {
                return res.status(409).json({
                    success: false,
                    code: "VEHICLE_UNAVAILABLE",
                    message:
                        "This vehicle is currently unavailable. Please contact the partner or choose another vehicle."
                });
            }

            try {
                await replaceVehicleDates({
                    vehicleId: booking.vehicle,
                    bookingId: booking._id,
                    travelDate: booking.travelDate,
                    returnDate: booking.returnDate,
                    tripType: booking.tripType
                });
            } catch (availabilityError) {
                if (availabilityError.code === "VEHICLE_ALREADY_BOOKED") {
                    return res.status(409).json({
                        success: false,
                        code: "VEHICLE_ALREADY_BOOKED",
                        message: availabilityError.message
                    });
                }

                throw availabilityError;
            }
        }

        await booking.save();

        const populatedBooking = await Booking.findById(booking._id)
            .populate(
                "customer",
                "firstName lastName email phone city"
            )
            .populate(
                "partner",
                "firstName lastName email phone city partnerStatus"
            )
            .populate(
                "vehicle",
                BOOKING_POPULATE_VEHICLE_FIELDS
            );

        return res.json({
            message: "Booking updated successfully.",
            booking: populatedBooking
        });
    } catch (error) {
        console.error(
            "Update booking error:",
            error
        );

        return res.status(500).json({
            message: "Failed to update booking."
        });
    }
}


// PARTNER REJECTS BOOKING
async function rejectBooking(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message:
                    "Only partners can reject bookings."
            });
        }

        const { reason } = req.body;

        const booking = await Booking.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (booking.bookingStatus !== "pending") {
            return res.status(400).json({
                message:
                    "Only pending bookings can be rejected."
            });
        }

        booking.bookingStatus = "rejected";
        booking.rejectedReason = reason || "";

        await booking.save();
        await releaseVehicleDates(booking._id);

        return res.json({
            message: "Booking rejected.",
            booking
        });
    } catch (error) {
        console.error(
            "Reject booking error:",
            error
        );

        return res.status(500).json({
            message: "Failed to reject booking."
        });
    }
}


// CUSTOMER CANCELS BOOKING
async function cancelBooking(req, res) {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            customer: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (
            !["pending", "confirmed"].includes(
                booking.bookingStatus
            )
        ) {
            return res.status(400).json({
                message:
                    "This booking cannot be cancelled."
            });
        }

        booking.bookingStatus = "cancelled";

        booking.cancelledReason =
            req.body.reason || "";

        await booking.save();
        await releaseVehicleDates(booking._id);

        return res.json({
            message:
                "Booking cancelled successfully.",
            booking
        });
    } catch (error) {
        console.error(
            "Cancel booking error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to cancel booking."
        });
    }
}


// PARTNER COMPLETES TRIP
async function completeBooking(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message:
                    "Only partners can complete trips."
            });
        }

        const booking = await Booking.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (booking.bookingStatus !== "confirmed") {
            return res.status(400).json({
                message:
                    "Only confirmed bookings can be completed."
            });
        }

        booking.bookingStatus = "completed";
        booking.completedAt = new Date();

        await booking.save();
        await releaseVehicleDates(booking._id);

        return res.json({
            message:
                "Trip completed successfully.",
            booking
        });
    } catch (error) {
        console.error(
            "Complete booking error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to complete trip."
        });
    }
}


module.exports = {
    createBooking,
    getMyBookings,
    getPartnerBookings,
    getBookingById,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    completeBooking,
    updateBooking
};
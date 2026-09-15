const Vehicle = require("../models/Vehicle");
const PartnerProfile = require("../models/PartnerProfile");
const { getUnavailableVehicleIds, getVehicleConflict } = require("../services/availabilityService");

function publicVehiclePayload(vehicle) {
    return {
        _id: vehicle._id,
        vehiclePhotos: vehicle.vehiclePhotos,
        vehicleName: vehicle.vehicleName,
        brand: vehicle.brand,
        model: vehicle.model,
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        seatCapacity: vehicle.seatCapacity,
        airConditioning: vehicle.airConditioning,
        fuelType: vehicle.fuelType,
        pricePerKm: vehicle.pricePerKm,
        fixedRoutes: vehicle.fixedRoutes,
        minimumKm: vehicle.minimumKm,
        driverIncluded: vehicle.driverIncluded,
        driverAllowance: vehicle.driverAllowance,
        extraCharges: vehicle.extraCharges,
        description: vehicle.description,
        availabilityStatus: vehicle.availabilityStatus || "available"
    };
}

const searchVehicles = async (req, res) => {
    try {
        const members = Number(req.query.members || 1);
        const travelDate = req.query.travelDate || "";
        const returnDate = req.query.returnDate || "";
        const tripType = req.query.tripType === "round_trip" ? "round_trip" : "one_way";

        if (!Number.isInteger(members) || members < 1) {
            return res.status(400).json({
                success: false,
                message: "Members must be at least 1."
            });
        }

        const query = {
            seatCapacity: { $gte: members },
            vehicleStatus: "active",
            adminApproval: "approved",
            $or: [
                { availabilityStatus: "available" },
                { availabilityStatus: { $exists: false } }
            ]
        };

        // If the customer already selected travel dates, hide cars that are
        // reserved for any overlapping day before the list is even rendered.
        if (travelDate) {
            let unavailableVehicleIds;

            try {
                unavailableVehicleIds = await getUnavailableVehicleIds({
                    travelDate,
                    returnDate,
                    tripType
                });
            } catch (dateError) {
                return res.status(400).json({
                    success: false,
                    message: dateError.message
                });
            }

            if (unavailableVehicleIds.length) {
                query._id = { $nin: unavailableVehicleIds };
            }
        }

        const vehicles = await Vehicle.find(query)
            .populate(
                "partner",
                "firstName lastName email phone city role partnerStatus accountStatus"
            )
            .sort({
                seatCapacity: 1,
                pricePerKm: 1
            });

        const results = [];

        for (const vehicle of vehicles) {
            if (!vehicle.partner) {
                continue;
            }

            if (
                vehicle.partner.accountStatus !== "active" ||
                vehicle.partner.partnerStatus !== "approved"
            ) {
                continue;
            }

            const profile = await PartnerProfile.findOne({
                user: vehicle.partner._id
            }).select(
                "profilePicture businessName displayName city about experienceYears languages partnerType"
            );

            results.push({
                vehicle: publicVehiclePayload(vehicle),
                partner: {
                    _id: vehicle.partner._id,
                    firstName: vehicle.partner.firstName,
                    lastName: vehicle.partner.lastName,
                    email: vehicle.partner.email,
                    phone: vehicle.partner.phone,
                    city: vehicle.partner.city
                },
                profile: profile || null
            });
        }

        return res.status(200).json({
            success: true,
            members,
            travelDate: travelDate || null,
            count: results.length,
            data: results
        });
    } catch (error) {
        console.error("Vehicle search error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to search vehicles."
        });
    }
};

const getVehicleDetails = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            vehicleStatus: "active",
            adminApproval: "approved"
        }).populate(
            "partner",
            "firstName lastName email phone city role partnerStatus accountStatus"
        );

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found."
            });
        }

        if (
            vehicle.availabilityStatus &&
            vehicle.availabilityStatus !== "available"
        ) {
            return res.status(409).json({
                success: false,
                code: "VEHICLE_UNAVAILABLE",
                message:
                    vehicle.availabilityStatus === "maintenance"
                        ? "This vehicle is currently under maintenance."
                        : "This vehicle is currently unavailable."
            });
        }

        if (!vehicle.partner) {
            return res.status(404).json({
                success: false,
                message: "Vehicle partner not found."
            });
        }

        if (
            vehicle.partner.accountStatus !== "active" ||
            vehicle.partner.partnerStatus !== "approved"
        ) {
            return res.status(404).json({
                success: false,
                message: "Vehicle is currently unavailable."
            });
        }

        const profile = await PartnerProfile.findOne({
            user: vehicle.partner._id
        }).select(
            "profilePicture businessName displayName city about experienceYears languages partnerType"
        );

        return res.status(200).json({
            success: true,
            data: {
                vehicle: publicVehiclePayload(vehicle),
                partner: {
                    _id: vehicle.partner._id,
                    firstName: vehicle.partner.firstName,
                    lastName: vehicle.partner.lastName,
                    email: vehicle.partner.email,
                    phone: vehicle.partner.phone,
                    city: vehicle.partner.city
                },
                profile: profile || null
            }
        });
    } catch (error) {
        console.error("Vehicle details error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load vehicle details."
        });
    }
};

const getVehicleAvailability = async (req, res) => {
    try {
        const travelDate = req.query.travelDate;
        const returnDate = req.query.returnDate || null;
        const tripType = req.query.tripType === "round_trip" ? "round_trip" : "one_way";

        if (!travelDate) {
            return res.status(400).json({
                success: false,
                message: "travelDate is required."
            });
        }

        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            vehicleStatus: "active",
            adminApproval: "approved"
        }).select("availabilityStatus availabilityNote vehicleName");

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found."
            });
        }

        const operationalStatus = vehicle.availabilityStatus || "available";

        if (operationalStatus !== "available") {
            return res.status(200).json({
                success: true,
                available: false,
                reason: operationalStatus,
                message:
                    operationalStatus === "maintenance"
                        ? "Vehicle is under maintenance."
                        : "Vehicle is currently unavailable."
            });
        }

        const conflict = await getVehicleConflict({
            vehicleId: vehicle._id,
            travelDate,
            returnDate,
            tripType
        });

        return res.status(200).json({
            success: true,
            available: !conflict,
            reason: conflict ? "booked" : "available",
            message: conflict
                ? "Vehicle is already booked for one or more selected dates."
                : "Vehicle is available for the selected date(s)."
        });
    } catch (error) {
        console.error("Vehicle availability error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to check vehicle availability."
        });
    }
};

module.exports = {
    searchVehicles,
    getVehicleDetails,
    getVehicleAvailability
};

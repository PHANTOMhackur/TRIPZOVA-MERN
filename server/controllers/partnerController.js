const User = require("../models/User");
const PartnerProfile = require("../models/PartnerProfile");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const { getReservationDateKeys } = require("../services/availabilityService");

// =====================================================
// FIXED ROUTE PRICING HELPER
// =====================================================

// Validates + cleans up the fixedRoutes array sent from the
// Add/Edit Vehicle form. Throws a string error message on the
// first invalid row so the controller can return a 400.
function sanitizeFixedRoutes(fixedRoutes) {
    if (fixedRoutes === undefined) {
        return undefined;
    }

    if (!Array.isArray(fixedRoutes)) {
        throw "Fixed routes must be a list.";
    }

    const cleaned = [];

    for (const route of fixedRoutes) {
        if (!route) {
            continue;
        }

        const fromCity = String(route.fromCity || "").trim();
        const toCity = String(route.toCity || "").trim();
        const price = Number(route.price);

        // Skip completely empty rows (the form always keeps one
        // blank row visible for convenience).
        if (!fromCity && !toCity && (route.price === "" || route.price === undefined)) {
            continue;
        }

        if (!fromCity || !toCity) {
            throw "Each fixed route needs both a from-city and a to-city.";
        }

        if (Number.isNaN(price) || price < 0) {
            throw `Please enter a valid price for the ${fromCity} to ${toCity} route.`;
        }

        cleaned.push({ fromCity, toCity, price });
    }

    return cleaned;
}

// =====================================================
// PARTNER PROFILE
// =====================================================

// Get logged-in partner profile
async function getMyProfile(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can access this profile."
            });
        }

        let profile = await PartnerProfile.findOne({
            user: req.user._id
        }).populate(
            "user",
            "firstName lastName email phone city address role partnerStatus accountStatus"
        );

        // Create an initial profile automatically if it doesn't exist
        if (!profile) {
            profile = await PartnerProfile.create({
                user: req.user._id,
                displayName:
                    `${req.user.firstName} ${req.user.lastName}`.trim(),
                phone: req.user.phone || "",
                email: req.user.email || "",
                city: req.user.city || "",
                address: req.user.address || ""
            });

            profile = await PartnerProfile.findById(profile._id).populate(
                "user",
                "firstName lastName email phone city address role partnerStatus accountStatus"
            );
        }

        return res.status(200).json({
            profile
        });
    } catch (error) {
        console.error("Get partner profile error:", error);

        return res.status(500).json({
            message: "Unable to load partner profile."
        });
    }
}


// Create or update partner profile
async function updateMyProfile(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can update this profile."
            });
        }

        const {
            profilePicture,
            businessName,
            displayName,
            phone,
            email,
            city,
            address,
            about,
            experienceYears,
            languages,
            partnerType
        } = req.body;

        if (!displayName || !displayName.trim()) {
            return res.status(400).json({
                message: "Display name is required."
            });
        }

        let profile = await PartnerProfile.findOne({
            user: req.user._id
        });

        const profileData = {
            profilePicture:
                typeof profilePicture === "string"
                    ? profilePicture.trim()
                    : profile?.profilePicture || "",

            businessName:
                typeof businessName === "string"
                    ? businessName.trim()
                    : profile?.businessName || "",

            displayName: displayName.trim(),

            phone:
                typeof phone === "string"
                    ? phone.trim()
                    : profile?.phone || req.user.phone || "",

            email:
                typeof email === "string"
                    ? email.trim().toLowerCase()
                    : profile?.email || req.user.email || "",

            city:
                typeof city === "string"
                    ? city.trim()
                    : profile?.city || req.user.city || "",

            address:
                typeof address === "string"
                    ? address.trim()
                    : profile?.address || req.user.address || "",

            about:
                typeof about === "string"
                    ? about.trim()
                    : profile?.about || "",

            experienceYears:
                experienceYears !== undefined &&
                experienceYears !== ""
                    ? Number(experienceYears)
                    : profile?.experienceYears || 0,

            languages:
                Array.isArray(languages)
                    ? languages
                    : profile?.languages || [],

            partnerType:
                ["individual", "business", "travel_agency"].includes(
                    partnerType
                )
                    ? partnerType
                    : profile?.partnerType || "individual",

            profileStatus: "complete"
        };

        if (
            Number.isNaN(profileData.experienceYears) ||
            profileData.experienceYears < 0
        ) {
            return res.status(400).json({
                message: "Experience years must be a valid number."
            });
        }

        if (!profile) {
            profile = await PartnerProfile.create({
                user: req.user._id,
                ...profileData
            });
        } else {
            Object.assign(profile, profileData);
            await profile.save();
        }

        // Keep basic contact/location information synchronized
        // with the main User account as well.
        await User.findByIdAndUpdate(req.user._id, {
            firstName: displayName.trim().split(" ")[0],
            city: profileData.city,
            address: profileData.address
        });

        const populatedProfile = await PartnerProfile.findById(
            profile._id
        ).populate(
            "user",
            "firstName lastName email phone city address role partnerStatus accountStatus"
        );

        return res.status(200).json({
            message: "Partner profile updated successfully.",
            profile: populatedProfile
        });
    } catch (error) {
        console.error("Update partner profile error:", error);

        return res.status(500).json({
            message: "Unable to update partner profile."
        });
    }
}


// =====================================================
// VEHICLES
// =====================================================

// Get all vehicles belonging to logged-in partner
async function getMyVehicles(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can access vehicles."
            });
        }

        const vehicles = await Vehicle.find({
            partner: req.user._id
        })
            .sort({ createdAt: -1 })
            .lean();

        const vehicleIds = vehicles.map((vehicle) => vehicle._id);

        const activeBookings = vehicleIds.length
            ? await Booking.find({
                partner: req.user._id,
                vehicle: { $in: vehicleIds },
                bookingStatus: { $in: ["pending", "confirmed"] }
            })
                .select(
                    "bookingNumber vehicle travelDate returnDate tripType pickupTime bookingStatus"
                )
                .sort({ travelDate: 1 })
                .lean()
            : [];

        const todayKey = getReservationDateKeys({
            travelDate: new Date(),
            tripType: "one_way"
        })[0];

        const enrichedVehicles = vehicles.map((vehicle) => {
            const vehicleBookings = activeBookings.filter(
                (booking) =>
                    String(booking.vehicle) === String(vehicle._id)
            );

            const isBookedToday = vehicleBookings.some((booking) => {
                try {
                    return getReservationDateKeys({
                        travelDate: booking.travelDate,
                        returnDate: booking.returnDate,
                        tripType: booking.tripType
                    }).includes(todayKey);
                } catch (error) {
                    return false;
                }
            });

            const manualAvailability =
                vehicle.availabilityStatus || "available";

            const displayAvailability =
                manualAvailability !== "available"
                    ? manualAvailability
                    : isBookedToday
                        ? "booked"
                        : "available";

            const nextBooking =
                vehicleBookings.find((booking) => {
                    try {
                        const keys = getReservationDateKeys({
                            travelDate: booking.travelDate,
                            returnDate: booking.returnDate,
                            tripType: booking.tripType
                        });
                        return keys[keys.length - 1] >= todayKey;
                    } catch (error) {
                        return false;
                    }
                }) || null;

            return {
                ...vehicle,
                availabilityStatus: manualAvailability,
                displayAvailability,
                isBookedToday,
                nextBooking
            };
        });

        return res.status(200).json({
            vehicles: enrichedVehicles
        });
    } catch (error) {
        console.error("Get partner vehicles error:", error);

        return res.status(500).json({
            message: "Unable to load vehicles."
        });
    }
}


// Add a new vehicle
async function addVehicle(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can add vehicles."
            });
        }

        // Only approved partners should be able to list vehicles
        if (req.user.partnerStatus !== "approved") {
            return res.status(403).json({
                message:
                    "Your partner account must be approved before adding vehicles."
            });
        }

        const {
            vehiclePhotos,
            vehicleName,
            brand,
            model,
            vehicleNumber,
            vehicleType,
            seatCapacity,
            airConditioning,
            fuelType,
            pricePerKm,
            fixedRoutes,
            minimumKm,
            driverIncluded,
            driverAllowance,
            extraCharges,
            description
        } = req.body;

        if (!vehicleName || !vehicleName.trim()) {
            return res.status(400).json({
                message: "Vehicle name is required."
            });
        }

        if (!vehicleNumber || !vehicleNumber.trim()) {
            return res.status(400).json({
                message: "Vehicle number is required."
            });
        }

        if (!vehicleType) {
            return res.status(400).json({
                message: "Vehicle type is required."
            });
        }

        if (!fuelType) {
            return res.status(400).json({
                message: "Fuel type is required."
            });
        }

        const seats = Number(seatCapacity);

        // pricePerKm is now a fallback rate, so it's optional -
        // an empty field just means "0" (rely on fixed routes only).
        const kmPrice =
            pricePerKm === undefined || pricePerKm === ""
                ? 0
                : Number(pricePerKm);

        const minKm = Number(minimumKm || 0);
        const allowance = Number(driverAllowance || 0);
        const extra = Number(extraCharges || 0);

        if (!Number.isInteger(seats) || seats < 1) {
            return res.status(400).json({
                message: "Seat capacity must be at least 1."
            });
        }

        if (Number.isNaN(kmPrice) || kmPrice < 0) {
            return res.status(400).json({
                message: "Price per KM must be a valid number."
            });
        }

        if (Number.isNaN(minKm) || minKm < 0) {
            return res.status(400).json({
                message: "Minimum KM must be a valid number."
            });
        }

        let cleanedFixedRoutes;

        try {
            cleanedFixedRoutes = sanitizeFixedRoutes(fixedRoutes) || [];
        } catch (routeError) {
            return res.status(400).json({
                message: routeError
            });
        }

        // A vehicle needs some way to be priced - either fixed
        // routes, or a fallback per-km rate.
        if (kmPrice <= 0 && cleanedFixedRoutes.length === 0) {
            return res.status(400).json({
                message:
                    "Add at least one fixed route price, or set a price per KM."
            });
        }

        const existingVehicle = await Vehicle.findOne({
            vehicleNumber: vehicleNumber.trim().toUpperCase()
        });

        if (existingVehicle) {
            return res.status(409).json({
                message:
                    "A vehicle with this registration number already exists."
            });
        }

        const vehicle = await Vehicle.create({
            partner: req.user._id,

            vehiclePhotos: Array.isArray(vehiclePhotos)
                ? vehiclePhotos
                : [],

            vehicleName: vehicleName.trim(),

            brand:
                typeof brand === "string"
                    ? brand.trim()
                    : "",

            model:
                typeof model === "string"
                    ? model.trim()
                    : "",

            vehicleNumber:
                vehicleNumber.trim().toUpperCase(),

            vehicleType,

            seatCapacity: seats,

            airConditioning:
                airConditioning === "non_ac"
                    ? "non_ac"
                    : "ac",

            fuelType,

            pricePerKm: kmPrice,

            fixedRoutes: cleanedFixedRoutes,

            minimumKm: minKm,

            driverIncluded:
                driverIncluded !== undefined
                    ? Boolean(driverIncluded)
                    : true,

            driverAllowance: allowance,

            extraCharges: extra,

            description:
                typeof description === "string"
                    ? description.trim()
                    : "",

            availabilityStatus: "available",
            availabilityNote: "",

            // New vehicles require admin approval
            vehicleStatus: "pending",
            adminApproval: "pending"
        });

        return res.status(201).json({
            message:
                "Vehicle added successfully and submitted for admin approval.",
            vehicle
        });
    } catch (error) {
        console.error("Add vehicle error:", error);

        return res.status(500).json({
            message: "Unable to add vehicle."
        });
    }
}


// Update vehicle
async function updateVehicle(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can update vehicles."
            });
        }

        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }

        const {
            vehiclePhotos,
            vehicleName,
            brand,
            model,
            vehicleNumber,
            vehicleType,
            seatCapacity,
            airConditioning,
            fuelType,
            pricePerKm,
            fixedRoutes,
            minimumKm,
            driverIncluded,
            driverAllowance,
            extraCharges,
            description
        } = req.body;

        if (vehicleName !== undefined) {
            if (!String(vehicleName).trim()) {
                return res.status(400).json({
                    message: "Vehicle name cannot be empty."
                });
            }

            vehicle.vehicleName = String(vehicleName).trim();
        }

        if (vehiclePhotos !== undefined) {
            vehicle.vehiclePhotos = Array.isArray(vehiclePhotos)
                ? vehiclePhotos
                : [];
        }

        if (brand !== undefined) {
            vehicle.brand = String(brand).trim();
        }

        if (model !== undefined) {
            vehicle.model = String(model).trim();
        }

        if (vehicleNumber !== undefined) {
            const normalizedNumber =
                String(vehicleNumber).trim().toUpperCase();

            const duplicate = await Vehicle.findOne({
                vehicleNumber: normalizedNumber,
                _id: { $ne: vehicle._id }
            });

            if (duplicate) {
                return res.status(409).json({
                    message:
                        "Another vehicle already uses this registration number."
                });
            }

            vehicle.vehicleNumber = normalizedNumber;
        }

        if (vehicleType !== undefined) {
            vehicle.vehicleType = vehicleType;
        }

        if (seatCapacity !== undefined) {
            const seats = Number(seatCapacity);

            if (!Number.isInteger(seats) || seats < 1) {
                return res.status(400).json({
                    message: "Seat capacity must be at least 1."
                });
            }

            vehicle.seatCapacity = seats;
        }

        if (airConditioning !== undefined) {
            vehicle.airConditioning = airConditioning;
        }

        if (fuelType !== undefined) {
            vehicle.fuelType = fuelType;
        }

        if (pricePerKm !== undefined) {
            const price = Number(pricePerKm);

            if (Number.isNaN(price) || price < 0) {
                return res.status(400).json({
                    message: "Price per KM must be a valid number."
                });
            }

            vehicle.pricePerKm = price;
        }

        if (fixedRoutes !== undefined) {
            try {
                vehicle.fixedRoutes = sanitizeFixedRoutes(fixedRoutes) || [];
            } catch (routeError) {
                return res.status(400).json({
                    message: routeError
                });
            }
        }

        if (minimumKm !== undefined) {
            const minKm = Number(minimumKm);

            if (Number.isNaN(minKm) || minKm < 0) {
                return res.status(400).json({
                    message: "Minimum KM must be a valid number."
                });
            }

            vehicle.minimumKm = minKm;
        }

        if (driverIncluded !== undefined) {
            vehicle.driverIncluded = Boolean(driverIncluded);
        }

        if (driverAllowance !== undefined) {
            const allowance = Number(driverAllowance);

            if (Number.isNaN(allowance) || allowance < 0) {
                return res.status(400).json({
                    message: "Driver allowance must be valid."
                });
            }

            vehicle.driverAllowance = allowance;
        }

        if (extraCharges !== undefined) {
            const extra = Number(extraCharges);

            if (Number.isNaN(extra) || extra < 0) {
                return res.status(400).json({
                    message: "Extra charges must be valid."
                });
            }

            vehicle.extraCharges = extra;
        }

        if (description !== undefined) {
            vehicle.description = String(description).trim();
        }

        if (
            Number(vehicle.pricePerKm || 0) <= 0 &&
            (!Array.isArray(vehicle.fixedRoutes) || vehicle.fixedRoutes.length === 0)
        ) {
            return res.status(400).json({
                message:
                    "Add at least one fixed route price, or set a price per KM."
            });
        }

        // Changing vehicle details sends it back through approval.
        vehicle.adminApproval = "pending";
        vehicle.vehicleStatus = "pending";

        await vehicle.save();

        return res.status(200).json({
            message:
                "Vehicle updated and submitted for admin approval.",
            vehicle
        });
    } catch (error) {
        console.error("Update vehicle error:", error);

        return res.status(500).json({
            message: "Unable to update vehicle."
        });
    }
}


// Delete vehicle
async function updateVehicleAvailability(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can update vehicle availability."
            });
        }

        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }

        const availabilityStatus = String(
            req.body.availabilityStatus || ""
        ).trim();

        if (
            !["available", "maintenance", "unavailable"].includes(
                availabilityStatus
            )
        ) {
            return res.status(400).json({
                message:
                    "Availability must be available, maintenance or unavailable."
            });
        }

        const availabilityNote = String(
            req.body.availabilityNote || ""
        ).trim();

        if (availabilityNote.length > 160) {
            return res.status(400).json({
                message: "Availability note cannot exceed 160 characters."
            });
        }

        vehicle.availabilityStatus = availabilityStatus;
        vehicle.availabilityNote = availabilityNote;
        await vehicle.save();

        return res.status(200).json({
            success: true,
            message:
                availabilityStatus === "available"
                    ? "Vehicle is now visible to customers when its dates are free."
                    : availabilityStatus === "maintenance"
                        ? "Vehicle marked under maintenance and hidden from customer search."
                        : "Vehicle marked unavailable and hidden from customer search.",
            vehicle
        });
    } catch (error) {
        console.error("Update vehicle availability error:", error);

        return res.status(500).json({
            message: "Unable to update vehicle availability."
        });
    }
}


async function deleteVehicle(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can delete vehicles."
            });
        }

        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }

        const activeBooking = await Booking.findOne({
            vehicle: vehicle._id,
            bookingStatus: { $in: ["pending", "confirmed"] }
        }).select("bookingNumber travelDate bookingStatus");

        if (activeBooking) {
            return res.status(409).json({
                message:
                    `This vehicle has an active booking (${activeBooking.bookingNumber}). Mark it unavailable instead of deleting it.`
            });
        }

        await Vehicle.deleteOne({ _id: vehicle._id });

        return res.status(200).json({
            message: "Vehicle deleted successfully."
        });
    } catch (error) {
        console.error("Delete vehicle error:", error);

        return res.status(500).json({
            message: "Unable to delete vehicle."
        });
    }
}


// Get a single vehicle belonging to logged-in partner
async function getMyVehicleById(req, res) {
    try {
        if (req.user.role !== "partner") {
            return res.status(403).json({
                message: "Only partners can access vehicles."
            });
        }

        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            partner: req.user._id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found."
            });
        }

        return res.status(200).json({
            vehicle
        });
    } catch (error) {
        console.error("Get partner vehicle error:", error);

        return res.status(500).json({
            message: "Unable to load vehicle."
        });
    }
}

// =====================================================
// PARTNER DASHBOARD
// =====================================================

async function getPartnerDashboard(req, res) {
    try {
        const partnerId = req.user._id;

        // ---------------------------------------------
        // PARTNER PROFILE
        // ---------------------------------------------

        const profile = await PartnerProfile.findOne({
            user: partnerId
        }).populate(
            "user",
            "firstName lastName email phone city address partnerStatus accountStatus role"
        );


        // ---------------------------------------------
        // VEHICLES
        // ---------------------------------------------

        const vehicles = await Vehicle.find({
            partner: partnerId
        })
            .sort({ createdAt: -1 })
            .limit(10);


        const vehicleCount = await Vehicle.countDocuments({
            partner: partnerId
        });


        const approvedVehicleCount =
            await Vehicle.countDocuments({
                partner: partnerId,
                adminApproval: "approved",
                vehicleStatus: "active"
            });


        const pendingVehicleCount =
            await Vehicle.countDocuments({
                partner: partnerId,
                adminApproval: "pending"
            });


        // ---------------------------------------------
        // BOOKINGS
        // ---------------------------------------------

        const Booking =
            require("../models/Booking");


        const totalBookings =
            await Booking.countDocuments({
                partner: partnerId
            });


        const pendingBookings =
            await Booking.countDocuments({
                partner: partnerId,
                bookingStatus: "pending"
            });


        const confirmedBookings =
            await Booking.countDocuments({
                partner: partnerId,
                bookingStatus: "confirmed"
            });


        const completedBookings =
            await Booking.countDocuments({
                partner: partnerId,
                bookingStatus: "completed"
            });


        const cancelledBookings =
            await Booking.countDocuments({
                partner: partnerId,
                bookingStatus: "cancelled"
            });


        const rejectedBookings =
            await Booking.countDocuments({
                partner: partnerId,
                bookingStatus: "rejected"
            });


        // ---------------------------------------------
        // RECENT BOOKINGS
        // ---------------------------------------------

        const recentBookings =
            await Booking.find({
                partner: partnerId
            })
                .populate(
                    "customer",
                    "firstName lastName email phone"
                )
                .sort({
                    createdAt: -1
                })
                .limit(5)
                .lean();


        // ---------------------------------------------
        // UNIQUE CUSTOMERS
        // ---------------------------------------------

        const customerResult =
            await Booking.distinct(
                "customer",
                {
                    partner: partnerId
                }
            );


        const customerCount =
            customerResult.length;


        // ---------------------------------------------
        // REVENUE
        // ---------------------------------------------

        const revenueResult =
            await Booking.aggregate([
                {
                    $match: {
                        partner: partnerId,
                        bookingStatus: {
                            $in: [
                                "confirmed",
                                "completed"
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$amount"
                        }
                    }
                }
            ]);


        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // ---------------------------------------------
        // COMPLETED REVENUE
        // ---------------------------------------------

        const completedRevenueResult =
            await Booking.aggregate([
                {
                    $match: {
                        partner: partnerId,
                        bookingStatus: "completed"
                    }
                },
                {
                    $group: {
                        _id: null,
                        revenue: {
                            $sum: "$amount"
                        }
                    }
                }
            ]);


        const completedRevenue =
            completedRevenueResult.length > 0
                ? completedRevenueResult[0].revenue
                : 0;


        // ---------------------------------------------
        // PENDING REVENUE
        // ---------------------------------------------

        const pendingRevenueResult =
            await Booking.aggregate([
                {
                    $match: {
                        partner: partnerId,
                        bookingStatus: {
                            $in: [
                                "pending",
                                "confirmed"
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        revenue: {
                            $sum: "$amount"
                        }
                    }
                }
            ]);


        const pendingRevenue =
            pendingRevenueResult.length > 0
                ? pendingRevenueResult[0].revenue
                : 0;


        // ---------------------------------------------
        // RESPONSE
        // ---------------------------------------------

        return res.status(200).json({
            success: true,

            data: {

                profile,

                vehicles,

                vehicleCount,

                approvedVehicleCount,

                pendingVehicleCount,

                totalBookings,

                pendingBookings,

                confirmedBookings,

                completedBookings,

                cancelledBookings,

                rejectedBookings,

                customerCount,

                totalRevenue,

                completedRevenue,

                pendingRevenue,

                recentBookings
            }
        });

    } catch (error) {

        console.error(
            "Partner dashboard error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to load partner dashboard."
        });
    }
}

module.exports = {
    getMyProfile,
    updateMyProfile,
    getMyVehicles,
    getMyVehicleById,
    addVehicle,
    updateVehicle,
    updateVehicleAvailability,
    deleteVehicle,
    getPartnerDashboard
};
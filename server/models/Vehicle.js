const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehiclePhotos: {
            type: [String],
            default: []
        },

        vehicleName: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            trim: true,
            default: ""
        },

        model: {
            type: String,
            trim: true,
            default: ""
        },

        vehicleNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },

        vehicleType: {
            type: String,
            enum: [
                "hatchback",
                "sedan",
                "suv",
                "muv",
                "tempo_traveller",
                "minibus",
                "bus",
                "other"
            ],
            required: true
        },

        seatCapacity: {
            type: Number,
            required: true,
            min: 1
        },

        airConditioning: {
            type: String,
            enum: ["ac", "non_ac"],
            default: "ac"
        },

        fuelType: {
            type: String,
            enum: [
                "petrol",
                "diesel",
                "cng",
                "electric",
                "hybrid",
                "other"
            ],
            required: true
        },

        pricePerKm: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        },

        // Fixed one-way prices for specific routes, e.g.
        // Surat -> Mumbai = 7000. When a booking's pickup/drop
        // matches one of these, this price is used instead of
        // the pricePerKm fallback above.
        fixedRoutes: {
            type: [
                {
                    fromCity: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    toCity: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    price: {
                        type: Number,
                        required: true,
                        min: 0
                    }
                }
            ],
            default: []
        },

        minimumKm: {
            type: Number,
            default: 0,
            min: 0
        },

        driverIncluded: {
            type: Boolean,
            default: true
        },

        driverAllowance: {
            type: Number,
            default: 0,
            min: 0
        },

        extraCharges: {
            type: Number,
            default: 0,
            min: 0
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        vehicleStatus: {
            type: String,
            enum: ["active", "inactive", "pending", "rejected"],
            default: "pending"
        },

        // Partner-controlled operational availability. This is separate
        // from adminApproval/vehicleStatus so a fully approved vehicle can
        // temporarily be hidden while it is under maintenance or offline.
        availabilityStatus: {
            type: String,
            enum: ["available", "maintenance", "unavailable"],
            default: "available"
        },

        availabilityNote: {
            type: String,
            trim: true,
            default: "",
            maxlength: 160
        },

        adminApproval: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

vehicleSchema.index({
    partner: 1
});

vehicleSchema.index({
    vehicleNumber: 1
});

vehicleSchema.index({
    vehicleStatus: 1
});

vehicleSchema.index({
    availabilityStatus: 1
});

module.exports = mongoose.model(
    "Vehicle",
    vehicleSchema
);
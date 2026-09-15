const mongoose = require("mongoose");

const vehicleReservationSchema = new mongoose.Schema(
    {
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
            index: true
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            index: true
        },
        dateKey: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// One vehicle can only be reserved once for a calendar date.
// This unique index is the final race-condition protection when two
// customers try to book the same vehicle at nearly the same moment.
vehicleReservationSchema.index(
    { vehicle: 1, dateKey: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "VehicleReservation",
    vehicleReservationSchema
);

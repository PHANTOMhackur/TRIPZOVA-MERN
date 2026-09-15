const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
        phone: { type: String, trim: true, default: "", maxlength: 30 },
        subject: { type: String, required: true, trim: true, maxlength: 140 },
        message: { type: String, required: true, trim: true, maxlength: 2000 },
        status: {
            type: String,
            enum: ["new", "read", "resolved"],
            default: "new"
        }
    },
    { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ status: 1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);

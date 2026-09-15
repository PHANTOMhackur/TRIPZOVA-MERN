const nodemailer = require("nodemailer");
const ContactMessage = require("../models/ContactMessage");

function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

async function createContactMessage(req, res) {
    try {
        const name = String(req.body.name || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const phone = String(req.body.phone || "").trim();
        const subject = String(req.body.subject || "").trim();
        const message = String(req.body.message || "").trim();

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject and message are required."
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        const contact = await ContactMessage.create({
            name,
            email,
            phone,
            subject,
            message
        });

        // The form remains functional even when SMTP is not configured: the
        // enquiry is always saved to MongoDB first. Email forwarding is best-effort.
        if (
            process.env.SMTP_HOST &&
            process.env.SMTP_USER &&
            process.env.SMTP_PASS &&
            !String(process.env.SMTP_HOST).includes("example.com") &&
            !String(process.env.SMTP_USER).includes("your_")
        ) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT || 587),
                    secure: String(process.env.SMTP_SECURE || "false") === "true",
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });

                await transporter.sendMail({
                    from: process.env.SMTP_FROM || process.env.SMTP_USER,
                    to: process.env.SUPPORT_EMAIL || "tripzovasupport@gmail.com",
                    replyTo: email,
                    subject: `[TRIPZOVA Support] ${subject}`,
                    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`
                });
            } catch (mailError) {
                console.warn("Contact email forwarding failed:", mailError.message);
            }
        }

        return res.status(201).json({
            success: true,
            message:
                "Thanks for contacting TRIPZOVA. Your message has been received.",
            reference: String(contact._id)
        });
    } catch (error) {
        console.error("Contact message error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to send your message right now. Please call or email support."
        });
    }
}

async function getContactMessages(req, res) {
    try {
        const messages = await ContactMessage.find({})
            .sort({ createdAt: -1 })
            .limit(200)
            .lean();

        return res.json({ success: true, messages });
    } catch (error) {
        console.error("Get contact messages error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load contact messages."
        });
    }
}

module.exports = {
    createContactMessage,
    getContactMessages
};

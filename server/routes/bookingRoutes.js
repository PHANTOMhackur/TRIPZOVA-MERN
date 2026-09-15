const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    getPartnerBookings,
    getBookingById,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    completeBooking,
    updateBooking
} = require("../controllers/bookingController");

const router = express.Router();


// All booking routes require login
router.use(authMiddleware);


// Customer
router.post("/", createBooking);
router.get("/my", getMyBookings);


// Partner
router.get("/partner", getPartnerBookings);
router.put("/:id/accept", acceptBooking);
router.put("/:id/reject", rejectBooking);
router.put("/:id/complete", completeBooking);


// Customer cancellation / self-service edit (within 5-minute window)
router.put("/:id/cancel", cancelBooking);
router.put("/:id", updateBooking);


// Customer / Partner / Admin
router.get("/:id", getBookingById);


module.exports = router;
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
    createContactMessage,
    getContactMessages
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", authMiddleware, adminMiddleware, getContactMessages);

module.exports = router;

const express = require("express");

const {
    searchVehicles,
    getVehicleDetails,
    getVehicleAvailability
} = require("../controllers/vehicleSearchController");

const router = express.Router();

router.get("/search", searchVehicles);
router.get("/:id/availability", getVehicleAvailability);
router.get("/:id", getVehicleDetails);

module.exports = router;

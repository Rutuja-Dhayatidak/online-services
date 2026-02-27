const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {getVendorBookings} = require("../controllers/vendorController");

router.get("/bookings", protect, authorizeRoles("vendor"), getVendorBookings);

module.exports = router;

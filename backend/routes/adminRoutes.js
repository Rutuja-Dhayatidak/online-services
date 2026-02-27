const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  approveVendor,
  getAllBookings,
  getDashboardStats
} = require("../controllers/adminController");

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.put("/approve/:id", protect, authorizeRoles("admin"), approveVendor);
router.get("/bookings", protect, authorizeRoles("admin"), getAllBookings);
router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);

module.exports = router;

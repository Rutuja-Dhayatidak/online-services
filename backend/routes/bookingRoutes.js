const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
  requestCompletion,
  verifyCompletion,
  getBookingById,
  getVendorBookings
} = require("../controllers/bookingController");

// create booking
router.post("/", protect, authorizeRoles("customer"), createBooking);


router.get("/my", protect, getMyBookings);

// ⭐ vendor
router.get("/vendor", protect, authorizeRoles("vendor"), getVendorBookings);

router.put("/:id/status", protect, authorizeRoles("vendor"), updateBookingStatus);
router.put("/:id/cancel", protect, authorizeRoles("customer"), cancelBooking);

router.put("/:id/request-complete", protect, authorizeRoles("vendor"), requestCompletion);
router.put("/:id/verify-otp", protect, verifyCompletion);

// LAST
router.get("/:id", protect, getBookingById);



module.exports = router;

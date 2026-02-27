const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createService,
  getServices,
  getVendorServices,
  deleteService,
  toggleServiceStatus,
  addAvailability
} = require("../controllers/serviceController");


// PUBLIC
router.get("/", getServices);

// VENDOR
router.post("/", protect, authorizeRoles("vendor"), createService);
router.get("/vendor", protect, authorizeRoles("vendor"), getVendorServices);
router.delete("/:id", protect, authorizeRoles("vendor"), deleteService);
router.patch("/:id/toggle", protect, authorizeRoles("vendor"), toggleServiceStatus);

// ⭐ IMPORTANT (MATCH FRONTEND)
router.post("/:id/availability", protect, authorizeRoles("vendor"), addAvailability);

module.exports = router;

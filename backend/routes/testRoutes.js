const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// logged in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// only admin
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// only vendor
router.get("/vendor", protect, authorizeRoles("vendor"), (req, res) => {
  res.json({ message: "Welcome Vendor" });
});

module.exports = router;

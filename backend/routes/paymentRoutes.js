const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {collectCash} = require("../controllers/paymentController");

router.post("/:bookingId/collect", protect, authorizeRoles("vendor"), collectCash);

module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {addReview} = require("../controllers/reviewController");

router.post("/:serviceId", protect, addReview);

module.exports = router;

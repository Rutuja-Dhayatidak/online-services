const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // ⭐ add this

router.post("/register", register);
router.post("/login", login);

// 🔐 JWT test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authorized ✅",
    user: req.user
  });
});

module.exports = router;

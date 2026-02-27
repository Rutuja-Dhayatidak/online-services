const express = require("express");
const cors = require("cors");

const app = express();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);


module.exports = app;

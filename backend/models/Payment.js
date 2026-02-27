const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number,
  method: {
    type: String,
    enum: ["COD"],
    default: "COD"
  },
  status: {
    type: String,
    enum: ["pending","collected"],
    default: "pending"
  }
},{timestamps:true});

module.exports = mongoose.model("Payment", paymentSchema);

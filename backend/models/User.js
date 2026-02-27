const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["customer", "vendor", "admin"],
    default: "customer"
  },

  // NEW FIELD ⭐
  isApproved: {
    type: Boolean,
    default: function() {
      // customer auto approved, vendor needs admin approval
      return this.role === "customer";
    }
  },

  phone: String,
  address: String

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);

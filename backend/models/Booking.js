const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
bookingDate: {
  type: Date,
  required: true
},
  timeSlot: {
    type: String,
    required: true
  },
  address:{
  type:String,
  required:true
},
city:String,
pincode:String,
contactNumber:{
  type:String,
  required:true
},

otp:{
  type:String
},
otpVerified:{
  type:Boolean,
  default:false
},

  status: {
  type: String,
  enum: ["pending","accepted","rejected","completed","cancelled"],
  default: "pending"
}
},{timestamps:true});

module.exports = mongoose.model("Booking", bookingSchema);

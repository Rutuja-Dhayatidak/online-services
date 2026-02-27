const Booking = require("../models/Booking");

exports.getVendorBookings = async (req,res)=>{
  const bookings = await Booking.find({vendor:req.user._id})
    .populate("service","title price")
    .populate("customer","name phone")
    .sort({createdAt:-1});

  res.json(bookings);
};

const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

exports.collectCash = async (req,res)=>{
  try{

    const booking = await Booking.findById(req.params.bookingId);

    if(!booking)
      return res.status(404).json({message:"Booking not found"});

    // sirf vendor hi collect kare
    if(booking.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({message:"Not your booking"});

    // booking complete honi chahiye
    if(booking.status !== "completed")
      return res.status(400).json({message:"Service not completed yet"});

    const payment = await Payment.create({
      booking: booking._id,
      collectedBy: req.user._id,
      amount: req.body.amount,
      status: "collected"
    });

    res.json({
      message:"Cash collected successfully",
      payment
    });

  }catch(err){
    res.status(500).json({message:err.message});
  }
};

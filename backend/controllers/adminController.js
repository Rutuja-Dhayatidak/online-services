const User = require("../models/User");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");


// all users
exports.getAllUsers = async (req,res)=>{
  const users = await User.find().select("-password");
  res.json(users);
};


// approve vendor
exports.approveVendor = async (req,res)=>{
  try {

    const user = await User.findById(req.params.id);

    if(!user)
      return res.status(404).json({message:"User not found"});

    if(user.role !== "vendor")
      return res.status(400).json({message:"User is not a vendor"});

    user.isApproved = true;
    await user.save();

    res.json({message:"Vendor approved successfully"});

  } catch(err){
    console.log("APPROVE ERROR:", err.message);
    res.status(500).json({message:"Server error"});
  }
};



// all bookings
exports.getAllBookings = async (req,res)=>{
  const bookings = await Booking.find()
    .populate("customer","name email")
    .populate("vendor","name")
    .populate("service","title price");

  res.json(bookings);
};


// dashboard analytics
exports.getDashboardStats = async (req,res)=>{
  try{

    const totalUsers = await User.countDocuments();
    const totalVendors = await User.countDocuments({ role:"vendor" });
    const pendingVendors = await User.countDocuments({ role:"vendor", isApproved:false });
    const totalBookings = await Booking.countDocuments();

    const revenue = await Payment.aggregate([
      {$match:{status:"collected"}},
      {$group:{_id:null,total:{$sum:"$amount"}}}
    ]);

    res.json({
      totalUsers,
      totalVendors,
      pendingVendors,
      totalBookings,
      totalRevenue: revenue[0]?.total || 0
    });

  }catch(err){
    console.log("STATS ERROR:",err);
    res.status(500).json({message:"Stats error"});
  }
};


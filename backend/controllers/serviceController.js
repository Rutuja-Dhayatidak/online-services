const Service = require("../models/Service");

// Add service (only vendor)
exports.createService = async (req,res)=>{
  try{
    const service = await Service.create({
      ...req.body,
      vendor: req.user._id
    });

    res.status(201).json(service);
  }catch(err){
    res.status(500).json(err.message);
  }
};


// Get all services (public)
// Get all services (public)
exports.getServices = async (req,res)=>{
  try{

    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "All";

    const skip = (page - 1) * limit;

    // filter object
    let filter = { isAvailable:true };

    // category filter
    if(category !== "All"){
      filter.category = category;
    }

    // search filter
    if(search){
      filter.title = { $regex: search, $options:"i" };
    }

    // total count
    const total = await Service.countDocuments(filter);

    // paginated data
    const services = await Service.find(filter)
      .populate("vendor","name email")
      .populate({
        path:"reviews",
        populate:{ path:"user", select:"name" }
      })
      .sort({createdAt:-1})
      .skip(skip)
      .limit(limit);

    res.json({
      services,
      currentPage:page,
      totalPages:Math.ceil(total/limit),
      totalServices:total
    });

  }catch(err){
    res.status(500).json({message:err.message});
  }
};




// exports.addAvailability = async (req,res)=>{
//   try{

//     const service = await Service.findById(req.params.id);

//     if(service.vendor.toString() !== req.user._id.toString())
//       return res.status(403).json({message:"Not your service"});

//     service.availability.push(req.body);

//     await service.save();

//     res.json({message:"Availability added",service});

//   }catch(err){
//     res.status(500).json({message:err.message});
//   }
// };




exports.getServiceReviews = async (req,res)=>{
  const reviews = await Review.find({service:req.params.serviceId})
    .populate("user","name");
  res.json(reviews);
};

// GET MY SERVICES (Vendor dashboard)
exports.getVendorServices = async (req,res)=>{
  try{
    const services = await Service.find({ vendor:req.user._id });
    res.json(services);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};


// DELETE SERVICE
exports.deleteService = async (req,res)=>{
  try{

    const service = await Service.findById(req.params.id);

    if(!service)
      return res.status(404).json({message:"Service not found"});

    // owner check
    if(service.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({message:"Not your service"});

    await service.deleteOne();

    res.json({message:"Service deleted successfully"});

  }catch(err){
    res.status(500).json({message:err.message});
  }
};


// TOGGLE SERVICE AVAILABILITY
exports.toggleServiceStatus = async (req,res)=>{
  try{

    const service = await Service.findById(req.params.id);

    if(!service)
      return res.status(404).json({message:"Service not found"});

    // owner check
    if(service.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({message:"Not your service"});

    // toggle
    service.isAvailable = !service.isAvailable;

    await service.save();

    res.json({
      message:"Service status updated",
      isAvailable: service.isAvailable
    });

  }catch(err){
    res.status(500).json({message:err.message});
  }
};


exports.addAvailability = async (req,res)=>{
  try{
    const service = await Service.findById(req.params.id);

    if(!service)
      return res.status(404).json({message:"Service not found"});

    if(service.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({message:"Not your service"});

    // date safe conversion (timezone proof)
    const [year,month,day] = req.body.date.split("-");
    const safeDate = new Date(year, month-1, day);

    service.availability.push({
      date: safeDate,
      slots: req.body.slots
    });

    await service.save();

    res.json({message:"Availability added",service});

  }catch(err){
    res.status(500).json({message:err.message});
  }
};





const Review = require("../models/Review");
const Service = require("../models/Service");

// Add review
exports.addReview = async (req,res)=>{
  try{

    const {rating,comment} = req.body;
    const serviceId = req.params.serviceId;

    // prevent duplicate review
    const already = await Review.findOne({
      service:serviceId,
      user:req.user._id
    });

    if(already)
      return res.status(400).json({message:"Already reviewed"});

    const review = await Review.create({
      service:serviceId,
      user:req.user._id,
      rating,
      comment
    });

    // update average rating
    const reviews = await Review.find({service:serviceId});
    const avg = reviews.reduce((acc,r)=>acc+r.rating,0)/reviews.length;

    await Service.findByIdAndUpdate(serviceId,{
      averageRating:avg,
      totalReviews:reviews.length
    });

    res.status(201).json(review);

  }catch(err){
    res.status(500).json({message:err.message});
  }
};

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  price: {
    type: Number,
    required: true
  },
  duration: String,
  location: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  averageRating:{
    type:Number,
    default:0
  },
  totalReviews:{
    type:Number,
    default:0
  },
 availability:[
  {
    date:{
      type: Date,
      required:true
    },
    slots:[String]
  }
]
},{timestamps:true});


// ⭐ ADD THIS (virtual relation)
serviceSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "service"
});

// allow virtual fields in JSON
serviceSchema.set("toObject", { virtuals: true });
serviceSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Service", serviceSchema);

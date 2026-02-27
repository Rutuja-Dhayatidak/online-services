const mongoose = require("mongoose");
const seedAdmin = require("./seedAdmin"); // ⭐ add

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await seedAdmin(); // ⭐ admin auto create

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

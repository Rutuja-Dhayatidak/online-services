const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isApproved: true
    });

    console.log("Default admin created successfully");

  } catch (error) {
    console.log("Admin seeding error:", error.message);
  }
};

module.exports = seedAdmin;

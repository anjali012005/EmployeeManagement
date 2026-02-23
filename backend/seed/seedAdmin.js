// backend/seed/seedAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@hr.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      fullName: "System Admin",
      email: "admin@hr.com",
      password: hashedPassword,
      role: "Admin",
      dateOfJoining: new Date(),
      leaveBalance: 0,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
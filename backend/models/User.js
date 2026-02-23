// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Employee", "Admin"],
      default: "Employee",
    },

    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
    },

    leaveBalance: {
      type: Number,
      default: 20,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
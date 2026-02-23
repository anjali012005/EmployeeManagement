// backend/models/Attendance.js

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 Ensure only one attendance per user per day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

// 🚫 Prevent marking future attendance
attendanceSchema.pre("validate", function (next) {
  const today = new Date();
  if (this.date > today) {
    next(new Error("Cannot mark attendance for future dates"));
  }
  
});

module.exports = mongoose.model("Attendance", attendanceSchema);
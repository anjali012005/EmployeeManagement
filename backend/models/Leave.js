// backend/models/Leave.js

const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leaveType: {
      type: String,
      enum: ["Casual", "Sick", "Paid"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    reason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Optional: Prevent invalid date ranges
leaveSchema.pre("validate", function (next) {
  if (this.startDate > this.endDate) {
    next(new Error("Start date cannot be after end date"));
  }
 
});

module.exports = mongoose.model("Leave", leaveSchema);
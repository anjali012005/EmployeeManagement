const Leave = require("../models/Leave");
const User = require("../models/User");

// 📅 Apply Leave
exports.applyLeave = async (req, res) => {
  console.log("User:", req.user);
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    const totalDays =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      userId: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    });

    res.status(201).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 👤 Get My Leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👨‍💼 Admin - Get All Leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("userId", "fullName email");

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👨‍💼 Admin - Approve/Reject Leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);
    if (!leave)
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Leave already processed",
      });
    }

    if (status === "Approved") {
      const user = await User.findById(leave.userId);

      if (user.leaveBalance < leave.totalDays) {
        return res.status(400).json({
          success: false,
          message: "Insufficient leave balance",
        });
      }

      user.leaveBalance -= leave.totalDays;
      await user.save();
    }

    leave.status = status;
    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
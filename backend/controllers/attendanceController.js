const Attendance = require("../models/Attendance");

// 📌 Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { date, status } = req.body;

    const today = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Cannot mark attendance for future date",
      });
    }

    const attendance = await Attendance.create({
      userId: req.user.id,
      date,
      status,
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👤 My Attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👨‍💼 Admin - All Attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate(
      "userId",
      "fullName email"
    );

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
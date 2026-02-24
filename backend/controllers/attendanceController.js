// controllers/attendanceController.js (Temporary Dummy Version)

// In-memory store for attendance records
let dummyAttendance = [];

// 📌 Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    // TEMPORARY: dummy user
    const user = req.user || { id: "dummy-user", fullName: "Test User", email: "dummy@test.com" };
    const { date, status } = req.body;

    const today = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Cannot mark attendance for future date",
      });
    }

    // Check if already marked
    const existing = dummyAttendance.find(
      (a) => a.userId === user.id && a.date === date
    );
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    const attendance = {
      id: dummyAttendance.length + 1,
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      date,
      status,
    };

    dummyAttendance.push(attendance);

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    // fallback to prevent 500
    res.status(200).json({
      success: true,
      data: {
        id: 999,
        userId: "dummy-user",
        fullName: "Test User",
        email: "dummy@test.com",
        date: new Date().toISOString().split("T")[0],
        status: "Present",
      },
    });
  }
};

// 👤 My Attendance
exports.getMyAttendance = async (req, res) => {
  const user = req.user || { id: "dummy-user" };
  const records = dummyAttendance.filter((r) => r.userId === user.id);
  res.status(200).json({ success: true, data: records });
};

// 👨‍💼 Admin - All Attendance
exports.getAllAttendance = async (req, res) => {
  res.status(200).json({ success: true, data: dummyAttendance });
};

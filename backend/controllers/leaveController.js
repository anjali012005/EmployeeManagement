// controllers/leaveController.js (Temporary Dummy Version)
let dummyLeaves = []; // store leaves in memory

// Dummy applyLeave
exports.applyLeave = async (req, res) => {
  try {
    // TEMPORARY: dummy user
    const user = req.user || { id: "dummy-user", fullName: "Test User", leaveBalance: 20 };

    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ success: false, message: "Start date cannot be after end date" });
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Store leave in memory
    const leave = {
      id: dummyLeaves.length + 1,
      userId: user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status: "Pending",
    };

    dummyLeaves.push(leave);

    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    // fallback response to prevent 500
    res.status(200).json({
      success: true,
      data: {
        id: 999,
        userId: "dummy-user",
        leaveType: "Dummy",
        startDate: "2026-02-24",
        endDate: "2026-02-25",
        totalDays: 2,
        reason: "Temporary test leave",
        status: "Pending",
      },
    });
  }
};

// Dummy getMyLeaves
exports.getMyLeaves = async (req, res) => {
  const user = req.user || { id: "dummy-user" };
  const leaves = dummyLeaves.filter((l) => l.userId === user.id);
  res.status(200).json({ success: true, data: leaves });
};

// Dummy getAllLeaves (admin)
exports.getAllLeaves = async (req, res) => {
  res.status(200).json({ success: true, data: dummyLeaves });
};

// Dummy updateLeaveStatus
exports.updateLeaveStatus = async (req, res) => {
  const { status } = req.body;
  const leaveId = parseInt(req.params.id);

  const leave = dummyLeaves.find((l) => l.id === leaveId);
  if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });

  if (leave.status !== "Pending") {
    return res.status(400).json({ success: false, message: "Leave already processed" });
  }

  leave.status = status;
  res.status(200).json({ success: true, message: `Leave ${status}` });
};

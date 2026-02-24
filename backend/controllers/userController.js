// controllers/profileController.js (Temporary Dummy Version)

// Temporary dummy users store
let dummyUsers = [
  { id: "dummy-user", fullName: "Test User", email: "dummy@test.com", role: "Employee", dateOfJoining: "2026-01-01" },
  { id: "admin-user", fullName: "Admin User", email: "admin@test.com", role: "Admin", dateOfJoining: "2025-01-01" },
];

// 👤 Get Own Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || "dummy-user"; // fallback dummy user
    const user = dummyUsers.find((u) => u.id === userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👨‍💼 Admin - Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: dummyUsers.length,
      data: dummyUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

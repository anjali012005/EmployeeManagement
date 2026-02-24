// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TEMPORARY DUMMY USER STORE
let dummyUsers = []; // stores {fullName, email, password, role, dateOfJoining}

// 🔐 Register User (temporary)
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, dateOfJoining, role } = req.body;

    // Check if already registered in dummy store
    const existingUser = dummyUsers.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered (dummy)",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in dummy store
    dummyUsers.push({
      fullName,
      email,
      password: hashedPassword,
      dateOfJoining,
      role: role || "Employee",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully (dummy)",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔐 Login User (temporary)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in dummy store
    const user = dummyUsers.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (dummy)",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (dummy)",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: email, role: user.role }, // use email as id for dummy
      process.env.JWT_SECRET || "supersecretkey123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    // Always respond 200 with dummy token if something fails (temporary)
    const token = jwt.sign({ id: "dummy-id", role: "Employee" }, process.env.JWT_SECRET || "supersecretkey123", { expiresIn: "1d" });
    res.status(200).json({
      success: true,
      token,
      role: "Employee",
      email: "dummy@test.com",
      fullName: "Temporary User",
    });
  }
};

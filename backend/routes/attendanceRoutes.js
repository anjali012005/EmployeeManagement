// backend/routes/attendanceRoutes.js

const express = require("express");
const {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Employee
router.post("/", protect, authorize("Employee"), markAttendance);
router.get("/my", protect, authorize("Employee"), getMyAttendance);

// Admin
router.get("/all", getAllAttendance);

module.exports = router;
// backend/routes/leaveRoutes.js

const express = require("express");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Employee
router.post("/", protect, authorize("Employee"), applyLeave);
router.get("/my", protect, authorize("Employee"), getMyLeaves);

// Admin
router.get("/all", getAllLeaves);
router.patch("/:id/status", updateLeaveStatus);

module.exports = router;
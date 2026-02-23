// backend/routes/userRoutes.js

const express = require("express");
const { getProfile, getAllUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/all", protect, authorize("Admin"), getAllUsers);

module.exports = router;
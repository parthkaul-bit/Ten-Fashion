const express = require("express");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

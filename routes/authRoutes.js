const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

// Routes
router.post("/register", registerController);  // Register route
router.post("/login", loginController);        // Login route

module.exports = router;

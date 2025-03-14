const express = require("express");
const { testUserController } = require("../controllers/testController");

const router = express.Router();

// Test route
router.get("/test-user", testUserController);

module.exports = router;

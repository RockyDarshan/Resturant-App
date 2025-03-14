const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address ,answer} = req.body;

    // Validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    res.status(201).json({
      success: true,
      message: "Successfully Registered",
      user: {
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        usertype: user.usertype,
        profile: user.profile,
        answer:user.answer,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
user.password=undefined;
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        usertype: user.usertype,
        profile: user.profile,
        answer:user.answer,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };

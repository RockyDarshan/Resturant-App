const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const userModel = require("../models/userModel");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // Find user by the id from the token (instead of req.body.id)
    const user = await userModel.findById(req.user.id); // Using req.user.id

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Hide password
    user.password = undefined;

    // Response
    res.status(200).send({
      success: true,
      message: 'User fetched successfully',
      user, // Send user data (password is already undefined)
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in GET user API',
      error: error.message || error, // Send the actual error message
    });
  }
};

// Update user
const updateUserController = async (req, res) => {
  try {
    // Find user by ID (use req.user.id)
    const user = await userModel.findById(req.user.id); // Using req.user.id

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Update the fields if they are provided
    const { userName, address, phone,answer } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (answer) user.answer = answer;

    // Save updated user
    await user.save();

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating user profile',
      error: error.message || error, // Provide the actual error message
    });
  }
};

// Update password
const updatePasswordController = async (req, res) => {
  try {
    // Find user by ID (use req.user.id instead of req.body.id)
    const user = await userModel.findById(req.user.id); // Using req.user.id

    // Validation: Ensure the user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Get the new password from the request body
    const { oldPassword, newPassword } = req.body;

    // Validation: Check if old and new passwords are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: 'Please provide both old and new password',
      });
    }

    // Check if the old password matches the user's current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid old password',
      });
    }

    // Hash the new password and save it to the user record
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save the new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: 'Password updated successfully',
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in password update API',
      error: error.message || error,
    });
  }
};


// Reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please provide email, new password, and answer',
      });
    }

    // Find user by email and answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found or invalid answer',
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: 'Password has been successfully changed',
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in password reset API',
      error: error.message || error,
    });
  }
};

//delete profile
const deleteProfileController=async(req,res)=>{
  try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success:true,
      message:'profile is deleted ',
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting profile API',
      error: error.message || error,
    });
  }
 };

module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController ,deleteProfileController};

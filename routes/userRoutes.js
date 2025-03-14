const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
// GET USER || GET 
router.get('/getUser',authMiddleware, getUserController )

//UPDATE
router.put('/updateUser',authMiddleware,updateUserController);

//password update
router.post('/updatePassword',authMiddleware,updatePasswordController);

//Reset password
router.post('/resetPassword',authMiddleware,resetPasswordController);

// //delete
router.delete('/delete/:id',authMiddleware,deleteProfileController);
// router.delete('/user/:id', authMiddleware, deleteProfileController);
module.exports = router;

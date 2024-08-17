const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser,logout,getUsercount,getAllUsers,forgotPassword, verifyOtp, resetPassword} = require('../Controllers/UserController');
const { validateUser } = require('../Middleware/Validation/UserValidation');
const { authenticateToken } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/update/:id', updateUser);
router.delete('/delete/:id',deleteUser);
router.post('/logout',logout);
router.get('/usercount', getUsercount);
router.get('/users', getAllUsers);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);

// Route to reset password
router.post('/reset-password', resetPassword);

module.exports = router;

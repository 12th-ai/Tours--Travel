const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser,logout,getSummary,forgotPassword,resetPassword } = require('../Controllers/UserController');
const { validateUser } = require('../Middleware/Validation/UserValidation');
const { authenticateToken } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/update', authenticateToken, updateUser);
router.delete('/delete', authenticateToken, deleteUser);
router.post('/logout',logout);
router.get('/summary', getSummary);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

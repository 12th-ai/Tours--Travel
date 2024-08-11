const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser } = require('../Controllers/UserController');
const { validateUser } = require('../Middleware/Validation/UserValidation');
const { authenticateToken } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/update', authenticateToken, updateUser);
router.delete('/delete', authenticateToken, deleteUser);

module.exports = router;

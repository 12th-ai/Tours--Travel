const express = require('express');
const router = express.Router();
const { validateUser, validateLogin, validationHandler } = require('../Validation/UserValidator');
const { register, login } = require('../Controllers/AuthController');
const { authMiddleware, isAdmin } = require('../Middleware/authMiddleware');

router.post('/register', validateUser, validationHandler, register);
router.post('/login', validateLogin, validationHandler, login);

// Example of a protected route
router.get('/admin', authMiddleware, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;

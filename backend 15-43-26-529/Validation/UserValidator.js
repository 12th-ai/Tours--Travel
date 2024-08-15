const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validateUser = [
    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                throw new Error('Username already exists');
            }
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUser,
    validateLogin,
    validationHandler
};

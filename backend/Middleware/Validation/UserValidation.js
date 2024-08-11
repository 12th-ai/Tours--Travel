const { body, validationResult } = require('express-validator');
const User = require('../../models/User');

const validateUser = [
    body('username').notEmpty().withMessage('Username is required').custom(async (username) => {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new Error('Username already in use');
        }
    }),
    body('email').isEmail().withMessage('Valid email is required').custom(async (email) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
    }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('role').notEmpty().withMessage('Role is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUser };

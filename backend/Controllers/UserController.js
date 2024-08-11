const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, email, phone, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserProfile = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findByPk(id, {
            attributes: ['username', 'phone', 'role'],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { email, phone, role } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = role || user.role;

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
};

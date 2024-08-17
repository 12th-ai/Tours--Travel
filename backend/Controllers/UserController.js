const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Import Sequelize operators


// Registration function
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

// Login function
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
            expiresIn: '7d',
        });

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user profile function
const getUserProfile = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findByPk(id, {
            attributes: ['username', 'phone','role','email','password','id'],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            status: 'success',
            user: {
              
                username: user.username,
                phone: user.phone,
              
                email:user.email,
                password:user.password,
                role:user.role,
                id: user.id
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user function
const updateUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    const { email, phone,password,username } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
         user.username = username || user.username
        user.email = email || user.email;
        user.phone = phone || user.phone;
        

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the request parameters

        // Check if user ID is valid
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Attempt to delete the user
        const result = await User.destroy({
            where: {
                id: userId, // This is the where clause
            },
        });

        // Check if the user was actually deleted
        if (result === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Respond with success if the user was deleted
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the user" });
    }
};


  

// Logout function
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

// Get summary function
const getUsercount = async (req, res) => {
    try {
        const totalUsers = await User.count();
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
     
        const users = await User.findAll({
            where: {
                role: 1, // Fetch only users with role = 
            }
        });

        res.status(200).json({
            success: true,
            data: users, // Return the list of users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



// Send OTP for password reset function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex');
        const otpExpires = Date.now() + 3600000; // 1 hour

        await user.update({ otp, otpExpires });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Verify OTP function
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Debugging logs
        console.log('Stored OTP:', user.otp);
        console.log('Provided OTP:', otp);
        console.log('OTP Expiration:', user.otpExpires);
        console.log('Current Time:', Date.now());

        // Check if OTP matches and is not expired
        if (String(user.otp) === String(otp) && user.otpExpires > Date.now()) {
            return res.status(200).json({ success: true, message: 'OTP verified' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Reset password function
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            user.otp = null; // Clear the OTP
            user.otpExpires = null; // Clear the OTP expiration

            await user.save();

            return res.status(200).json({ success: true, message: 'Password reset successful' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // App-specific password
    },
});

// Exporting the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
    logout,
    getUsercount,
    forgotPassword,
    verifyOtp,
    resetPassword,
   getAllUsers

};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const nodemailer = require('nodemailer');
const crypto = require('crypto');



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
            expiresIn: '7d',
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

        if (user) {
            // If user is found, return the user data along with a success status
            return res.status(200).json({
                status: 'success',
                user: {
                    username: user.username,
                    phone: user.phone,
                    role: user.role,
                },
            });
        } else {
            // If user is not found, return a different status
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
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

// authController.js

const logout = (req, res) => {
    res.clearCookie('token'); // Clear the authentication cookie
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  };


  const getSummary = async (req, res) => {
    try {
      const totalUsers = await User.count();
      // Add more stats here if needed
  
      res.status(200).json({
        success: true,
        data: {
          totalUsers,
          // Add other stats here
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };


 
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// });

const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
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
        text: `Your OTP code is ${otp}`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  // const resetPassword = async (req, res) => {
  //   try {
  //     const { email, otp, newPassword } = req.body;
  
  //     const user = await User.findOne({ where: { email, otp } });
  
  //     if (!user || user.otpExpires < Date.now()) {
  //       return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
  //     }
  
  //     await user.update({
  //       password: await bcrypt.hash(newPassword, 10),
  //       otp: null,
  //       otpExpires: null
  //     });
  
  //     res.status(200).json({ message: 'Password reset successfully' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Something went wrong', error });
  //   }
  // };

  // const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'mihigofololive@gmail',
  auth: {
    user: 'mihigofololive@gmail.com',
    pass: 'ecwuvkzyhxdhepwt', // Directly place the app-specific password here
  },
});

const mailOptions = {
  from: 'mihigofololive@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Log the details for debugging
    console.log('Stored OTP:', user.otp);
    console.log('Provided OTP:', otp);
    console.log('OTP Expiration:', user.otpExpires);
    console.log('Current Time:', Date.now());



    // Check if OTP matches and is not expired
    if (String(user.otp) === String(otp)) {
      return res.status(200).json({ success: true, message: 'OTP verified' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};


// Controller to reset password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify the OTP again as an extra precaution
    if (user.otp === otp) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the OTP
      user.password = hashedPassword;
      user.otp = null; // Clear the OTP
      user.otpExpiration = null; // Clear the OTP expiration
      await user.save();

      return res.status(200).json({ success: true, message: 'Password reset successful' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = { verifyOtp, resetPassword };


  
  
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
    logout,
    getSummary,
    verifyOtp,
    forgotPassword,
    resetPassword
 
    

};

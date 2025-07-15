const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserAccModel');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


require('dotenv').config();
const { saveOTP, verifyOTP } = require('../Otp_store');

// Login API
router.post('/login', async (req, res) => {
    try {
        const { login_name, login_pass } = req.body;

        if (!login_name || !login_pass) {
            return res.status(400).json({ message: 'Username and password required.' });
        }

        const user = await User.findOne({ login_name, is_deleted: 0,is_enabled:1});

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // If your passwords are hashed, use bcrypt.compare
        // If not hashed (not secure), compare directly:
        if (user.login_pass !== login_pass) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generate JWT Token
        const payload = {
            userId: user._id,
            login_name: user.login_name,
            role_id: user.role_id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
 
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                userId: user._id,
                login_name: user.login_name,
                first_name: user.first_name,
                last_name: user.last_name,
                role_id: user.role_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: 'Email is required' });

    const otp = generateOTP();
    saveOTP(email, otp);

    try {
        await transporter.sendMail({
            from: 'rakeshnagpure71@gmail',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        });
        res.send({ message: 'OTP sent to email',OTP:otp });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to send OTP' });
    }
});

// Route to verify OTP
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).send({ message: 'Email and OTP are required' });

    if (verifyOTP(email, otp)) {
        res.send({ message: 'OTP verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid or expired OTP' });
    }
});
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rakeshnagpure71@gmail.com',
        pass: 'qedi okrr fman kzqd'
    }
});
module.exports = router;

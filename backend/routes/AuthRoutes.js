const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserAccModel');
require('dotenv').config();

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

module.exports = router;

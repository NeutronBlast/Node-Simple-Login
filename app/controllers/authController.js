const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Find user by phone
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        // Generate a token that expires in 7 days
        const token = jwt.sign({ id: user.id, phone: user.phone }, process.env.JWT_SECRET, {
            expiresIn: '7d', // expires in 7 days
        });

        // Return user and token
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                session_active: true,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            access_token: token,
            token_type: "bearer"
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};




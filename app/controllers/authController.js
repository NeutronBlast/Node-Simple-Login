const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Authenticate a user and generate an access token upon successful login.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - An object containing user information and an access token upon successful login.
 * @throws {Object} - An error response object with details of the error, if authentication fails.
 *
 * @example
 * // Request
 * POST /login
 * {
 *   "phone": "user_phone_number",
 *   "password": "user_password"
 * }
 *
 * // Response (on successful login)
 * {
 *   "user": {
 *     "id": 123,
 *     "name": "Frank Hesse",
 *     "session_active": true,
 *     "email": "user@example.com",
 *     "phone": "user_phone_number",
 *     "address": "User Address"
 *   },
 *   "access_token": "jwt_access_token",
 *   "token_type": "bearer"
 * }
 *
 * // Response (on authentication failure)
 * {
 *   "error": "Password is incorrect"
 * }
 */

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
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};




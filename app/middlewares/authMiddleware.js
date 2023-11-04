/**
 * Middleware module containing functions for user authentication and password hashing.
 * These middlewares are used to enhance security and manage user authentication.
 *
 * @module authMiddleware
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Middleware function to hash the password in the request body before processing.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @throws {Object} - An error response object if password hashing fails.
 */

const hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Middleware function to authenticate and verify JWT tokens in the Authorization header.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @throws {Object} - An error response object if authentication fails, the token is invalid, or the Authorization header is missing.
 */

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Authorization: Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Authorization header is missing');
    }
};

module.exports = {
    authMiddleware,
    hashPassword
};
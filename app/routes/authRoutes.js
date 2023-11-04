/**
 * Authentication routes module.
 * Defines the routes related to user authentication, such as logging in.
 *
 * @module authRoutes
 */
const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');

/**
 * Route for user login.
 * Accepts a POST request to authenticate a user with their credentials.
 * It invokes the 'login' controller function to handle the login process.
 *
 * @name POST /login
 * @param {string} path - Express route path.
 * @param {function} controller - Controller function responsible for user login.
 */
router.post('/login', login);

module.exports = router;
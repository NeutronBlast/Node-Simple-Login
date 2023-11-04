/**
 * User management routes module.
 * Defines routes for managing user data, including retrieval, creation, update, and deletion.
 *
 * @module usersRoutes
 */
const express = require('express');
const router = express.Router();

const { getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/usersController');
const { hashPassword, authMiddleware} = require("../middlewares/authMiddleware");

/**
 * Route for retrieving all users.
 * Accepts a GET request to fetch a list of all users.
 * It invokes the 'getUsers' controller function to handle the request.
 *
 * @name GET /
 * @param {string} path - Express route path.
 * @param {function} controller - Controller function responsible for retrieving all users.
 */
router.get('/', getUsers);

/**
 * Route for retrieving a single user by ID.
 * Accepts a GET request with a user ID parameter to fetch a specific user.
 * It invokes the 'getUser' controller function to handle the request.
 *
 * @name GET /:id_user
 * @param {string} path - Express route path with a parameter for user ID.
 * @param {function} middleware - Middleware function for user authentication.
 * @param {function} controller - Controller function responsible for retrieving a single user.
 */
router.get('/:id_user', authMiddleware, getUser);

/**
 * Route for creating a new user.
 * Accepts a POST request to create a new user.
 * It invokes the 'createUser' controller function to handle user creation.
 *
 * @name POST /
 * @param {string} path - Express route path.
 * @param {function} middleware - Middleware function to hash the user's password.
 * @param {function} controller - Controller function responsible for user creation.
 */
router.post('/', hashPassword, authMiddleware, createUser);

/**
 * Route for updating an existing user.
 * Accepts a PUT request with a user ID parameter to update a specific user's data.
 * It invokes the 'updateUser' controller function to handle user updates.
 *
 * @name PUT /:id_user
 * @param {string} path - Express route path with a parameter for user ID.
 * @param {function} middleware - Middleware functions for password hashing and user authentication.
 * @param {function} controller - Controller function responsible for user updates.
 */
router.put('/:id_user', hashPassword, authMiddleware, updateUser);

/**
 * Route for deleting a user.
 * Accepts a DELETE request with a user ID parameter to delete a specific user.
 * It invokes the 'deleteUser' controller function to handle user deletion.
 *
 * @name DELETE /:id_user
 * @param {string} path - Express route path with a parameter for user ID.
 * @param {function} middleware - Middleware function for user authentication.
 * @param {function} controller - Controller function responsible for user deletion.
 */
router.delete('/:id_user', authMiddleware, deleteUser);

module.exports = router;
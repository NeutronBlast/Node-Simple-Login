const express = require('express');
const router = express.Router();

const { getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/usersController');
const { hashPassword } = require("../middlewares/authMiddleware");

// Get All Users
router.get('/', getUsers);

// Get Single User
router.get('/:id_user', getUser);

// Create a New User
router.post('/', hashPassword, createUser);

// Update an Existing User
router.put('/users/:id_user', hashPassword, updateUser);

// Delete a User
router.delete('/users/:id_user', deleteUser);

module.exports = router;
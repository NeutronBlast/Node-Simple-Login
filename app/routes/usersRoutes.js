const express = require('express');
const router = express.Router();

const { getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/usersController');
const { hashPassword, authMiddleware} = require("../middlewares/authMiddleware");

// Get All Users
router.get('/', getUsers);

// Get Single User
router.get('/:id_user', authMiddleware, getUser);

// Create a New User
router.post('/', hashPassword, authMiddleware, createUser);

// Update an Existing User
router.put('/:id_user', hashPassword, authMiddleware, updateUser);

// Delete a User
router.delete('/:id_user', authMiddleware, deleteUser);

module.exports = router;
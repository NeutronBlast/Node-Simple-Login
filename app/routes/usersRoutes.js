const express = require('express');
const router = express.Router();

const { getUsers, getUser, createUser } = require('../controllers/usersController');
const { hashPassword } = require("../middlewares/authMiddleware");

// Get All Users
router.get('/', getUsers);

// Get Single User
router.get('/:id_user', getUser);

// Create a New User
router.post('/', hashPassword, createUser);
//
// // Update an Existing User
// router.put('/users/:id_user', authMiddleware, (req, res) => {
//     // User update logic using req.params.id_user
//     res.status(200).json({
//         // Updated user object
//     });
// });
//
// // Delete a User
// router.delete('/users/:id_user', authMiddleware, (req, res) => {
//     // User deletion logic using req.params.id_user
//     res.status(204).send(); // No content to send back
// });

module.exports = router;
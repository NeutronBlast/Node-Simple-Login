const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const { login } = require('../controllers/authController');

// Login User
router.post('/login', login);

// Get All Users
// router.get('/users', authMiddleware, (req, res) => {
//     // Fetching users logic would go here
//     res.status(200).json([
//         // Array of users
//     ]);
// });
//
// // Get Single User
// router.get('/users/:id_user', authMiddleware, (req, res) => {
//     // Fetching a single user logic using req.params.id_user
//     res.status(200).json({
//         // User object
//     });
// });
//
// // Create a New User
// router.post('/users', (req, res) => {
//     // User creation logic would go here
//     res.status(200).json({
//         // Newly created user object
//     });
// });
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
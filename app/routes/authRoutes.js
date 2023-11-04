const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const { login, getUsers } = require('../controllers/authController');

// Login User
router.post('/login', login);

module.exports = router;
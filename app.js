require('dotenv').config();

const express = require('express');
const app = express();

// Config imports
const { connectDB } = require('./config/db'); // Directly import the connectDB function

// Apply routes
const applyRoutes = require('./app/routes');

// Apply Middlewares
const corsMiddleware = require('./app/middlewares/corsMiddleware');

// Apply middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(corsMiddleware);

// Apply routes
applyRoutes(app);

// Establish database connection
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

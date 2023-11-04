require('dotenv').config();

const express = require('express');
const app = express();

// Config imports
const { connectDB } = require('./config/db'); // Directly import the connectDB function

// Apply routes
const applyRoutes = require('./app/routes');

// Apply Middlewares
const corsMiddleware = require('./app/middlewares/corsMiddleware');

// Establish database connection
connectDB().then(() => {
    // Database connected
}).catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Apply middlewares and routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(corsMiddleware);
applyRoutes(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

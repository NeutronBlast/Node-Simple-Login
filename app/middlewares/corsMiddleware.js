/**
 * Middleware that enables Cross-Origin Resource Sharing (CORS) for HTTP requests.
 * By default, this middleware allows all origins and common HTTP methods.
 * Adjust the 'origin' property in 'corsOptions' to restrict allowed origins.
 *
 * @module corsMiddleware
 */
const cors = require('cors');

// Setup CORS options if needed
const corsOptions = {
    origin: '*', // This is a wildcard that allows all origins - adjust as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);

// corsMiddleware.js

const cors = require('cors');

// Setup CORS options if needed
const corsOptions = {
    origin: '*', // This is a wildcard that allows all origins - adjust as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);

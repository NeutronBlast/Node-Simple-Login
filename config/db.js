// config/db.js
const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const connectDB = async () => {
    try {
        // Here we are just making a simple query without checking out a client
        const res = await pool.query('SELECT 1'); // This will check if the connection is successful
        console.log('PostgreSQL connected', res);
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    query: (text, params) => pool.query(text, params), // Expose a query method for convenience
};

// config/db.js
const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const connectDB = async () => {
    try {
        // Attempt to get connection. If this fails, it will throw an error.
        const client = await pool.connect();

        // Release the client back to the pool
        client.release();

        console.log('PostgreSQL connected successfully.');
    } catch (error) {
        console.error('PostgreSQL connection failed:', error.stack);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    pool // You might want to export the pool to use it directly in your queries
};

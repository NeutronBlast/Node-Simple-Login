/**
 * PostgreSQL Database Configuration Module.
 *
 * This module provides a PostgreSQL database connection pool and a function to establish a connection to the database.
 * It exports the database connection pool and the `connectDB` function for establishing connections.
 *
 * @module config/db
 */
const { Pool } = require('pg');

/**
 * PostgreSQL connection pool instance.
 *
 * The pool is configured with the connection string obtained from the `DATABASE_URL` environment variable.
 * You can use this pool to execute SQL queries and manage database connections.
 *
 * @type {Pool}
 */
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

/**
 * Establishes a connection to the PostgreSQL database.
 *
 * This function attempts to get a connection from the connection pool.
 * If the connection attempt fails, it logs an error and exits the application.
 * If successful, the connection is released back to the pool, and a success message is logged.
 *
 * @async
 * @function
 * @throws {Error} If the database connection cannot be established.
 *
 * @example
 * const db = require('./config/db');
 * db.connectDB();
 *
 */
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
    pool // For queries
};

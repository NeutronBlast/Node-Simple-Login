const { Sequelize, DataTypes } = require('sequelize');

// Initialize DB connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

// Define the User model that reflects the structure of the SQL table
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates if the string is an email
        },
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
}, {
    sequelize, // Pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // We can specify the table name directly
    timestamps: false, // If true, Sequelize will expect createdAt & updatedAt columns
});

module.exports = User;

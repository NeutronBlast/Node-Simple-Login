const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Assuming 'findAll' is a method to get all users

        // Transform users if needed or just send the raw data
        const usersData = users.map(user => ({
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            session_active: user.session_active
        }));

        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
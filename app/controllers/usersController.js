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
            session_active: true
        }));

        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUser = async (req, res) => {
    const { id_user } = req.params; // Extract the ID from the request parameters

    try {
        const user = await User.findByPk(id_user); // Assuming 'findByPk' is the method to get a user by primary key

        if (!user) {
            return res.status(404).json({ error: 'User not found' }); // User with the given ID was not found
        }

        // Transform user if needed or just send the raw data
        const userData = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            session_active: true // As per requirements, this is always true
        };

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    let { name, phone, email, password, address } = req.body; // Extract the data from the request body

    // Validate the input
    if (!name || !phone || !email || !password || !address) {
        return res.status(400).json({ error: 'All fields are required' }); // Bad request
    }

    // Normalize the email to prevent case and whitespace issues
    if (email) {
        email = email.trim().toLowerCase();
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' }); // Conflict
        }

        // Create a new user in the database
        const newUser = await User.create({
            name,
            phone,
            email,
            password, // The password is already hashed by the middleware
            address
        });

        // Return the new user data, excluding the password
        const userData = {
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            address: newUser.address
        };

        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { id_user } = req.params;
    let { name, phone, email, password, address } = req.body;

    // Normalize the email to prevent case and whitespace issues
    if (email) {
        email = email.trim().toLowerCase();
    }

    // Validate the input
    if (!name || !phone || !email || !password || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Find the existing user by ID
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the new email is already in use by another user, considering normalization
        if (email !== user.email.toLowerCase()) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ error: 'Email already in use' });
            }
        }

        // Update the user's information
        const updatedInfo = {
            name,
            phone,
            email,
            password, // Ensure password hashing logic is in place
            address
        };

        // Trim strings to remove any extraneous whitespace
        for (let key in updatedInfo) {
            if (typeof updatedInfo[key] === 'string') {
                updatedInfo[key] = updatedInfo[key].trim();
            }
        }

        await user.update(updatedInfo);

        // Return the updated user data, excluding the password
        const updatedUserData = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address
        };

        res.status(200).json(updatedUserData);
    } catch (error) {
        // Handle possible errors, such as database errors
        res.status(500).json({ error: 'Internal server error' });
    }
};



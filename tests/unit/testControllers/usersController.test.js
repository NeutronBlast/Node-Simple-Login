// usersController.test.js
const { getUsers, getUser, createUser } = require('../../../app/controllers/usersController');
const User = require('../../../app/models/userModel'); // Adjust the import path as necessary
const bcrypt = require('bcryptjs');

// Mocking User model's findAll method
jest.mock('../../../app/models/userModel', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    // If you want to simulate a failure
    create: jest.fn().mockRejectedValue(new Error('Creation failed')),
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashedpassword')
}));

describe('getUsers', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        User.findAll.mockClear();
    });

    it('should return a list of users', async () => {
        // Arrange
        const mockUsers = [
            { id: 1, name: 'Alice', phone: '123456', email: 'alice@example.com', address: '123 Main St', session_active: true },
            // Add more mock users as necessary
        ];
        User.findAll.mockResolvedValue(mockUsers);

        const req = {}; // Mock req object
        const res = { // Mock res object
            status: jest.fn(() => res),
            json: jest.fn((users) => {
                console.log('Users List:', users); // This will print the list of users to the console
                return res; // Maintain the chainability of the res object
            }),
        };

        // Act
        await getUsers(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                address: expect.any(String)
            }),
        ]));
    });

    it('should handle errors', async () => {
        // Arrange
        const errorMessage = 'Internal server error';
        User.findAll.mockRejectedValue(new Error(errorMessage));

        const req = {}; // Mock req object
        const res = { // Mock res object
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Act
        await getUsers(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('getUser', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        User.findByPk.mockClear();
    });

    it('should return a single user', async () => {
        // Arrange
        const mockUser = {
            id: 2,
            name: 'Alice Nightray',
            phone: "5654654",
            email: "test@example.com",
            address: null,
            session_active: true // This will be overridden to always be true
        };
        User.findByPk.mockResolvedValue(mockUser);

        const req = { params: { id_user: 2 } }; // Mock req object with params
        const res = { // Mock res object
            status: jest.fn(() => res),
            json: jest.fn((user) => {
                console.log('User obtained:', user); // This will print the list of users to the console
                return res; // Maintain the chainability of the res object
            }),
        };

        // Act
        await getUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            id: mockUser.id,
            phone: mockUser.phone,
            email: mockUser.email,
            session_active: true
        }));
    });

    it('should return 404 if user not found', async () => {
        // Arrange
        User.findByPk.mockResolvedValue(null);

        const req = { params: { id_user: 2 } }; // Mock req object with params
        const res = { // Mock res object
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Act
        await getUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle errors', async () => {
        // Arrange
        const errorMessage = 'Internal server error';
        User.findByPk.mockRejectedValue(new Error(errorMessage));

        const req = { params: { id_user: 2 } }; // Mock req object with params
        const res = { // Mock res object
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Act
        await getUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('createUser', () => {
    // Mock bcrypt here if you want to test the hashPassword middleware as well

    it('should create a new user and return the user data', async () => {
        // Arrange
        const mockUser = {
            name: 'Test User',
            phone: '1234567890',
            email: 'testuser@example.com',
            password: 'hashedpassword', // This should be a hashed password
            address: '123 Test St'
        };

        User.create.mockResolvedValue(mockUser); // Mock the User.create method

        const req = {
            body: {
                ...mockUser,
                password: 'password123' // The unhashed password that the user submits
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn((user) => {
                console.log('User created:', user); // This will print the list of users to the console
                return res; // Maintain the chainability of the res object
            }),
        };

        // Act
        await createUser(req, res);

        // Assert
        expect(User.create).toHaveBeenCalledWith({
            ...req.body,
            password: expect.any(String) // Since password should have been hashed
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            name: mockUser.name,
            phone: mockUser.phone,
            email: mockUser.email,
            address: mockUser.address
        });
    });

    it('should handle errors if user creation fails', async () => {
        // Arrange
        const errorMessage = 'Error creating user';
        User.create.mockRejectedValue(new Error(errorMessage)); // Simulate an error

        const req = {
            body: {
                name: 'Test User',
                phone: '1234567890',
                email: 'testuser@example.com',
                password: 'password123', // The unhashed password
                address: '123 Test St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await createUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });

    it('should not create a user if the email already exists', async () => {
        // Arrange
        User.findOne.mockResolvedValue({
            name: 'Existing User',
            phone: '1234567890',
            email: 'existinguser@example.com',
            password: 'password123',
            address: '123 Existing St'
        }); // Simulate finding an existing user

        const req = {
            body: {
                name: 'Existing User',
                phone: '1234567890',
                email: 'existinguser@example.com',
                password: 'password123',
                address: '123 Existing St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await createUser(req, res);

        // Assert
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
        expect(res.status).toHaveBeenCalledWith(409); // Conflict, email already exists
        expect(res.json).toHaveBeenCalledWith({ error: 'Email already in use' });
    });


    it('should respond with an error if required fields are missing', async () => {
        // Arrange
        const req = {
            body: {
                // Missing 'name' and 'email'
                phone: '1234567890',
                password: 'password123',
                address: '123 Missing St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // You should have validation logic in your `createUser` function to check for required fields

        // Act
        await createUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400); // Use 400 for bad request/missing fields
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining('All fields are required') // The error message should mention the missing fields
        });
    });
});
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../../../app/controllers/usersController');
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
            { id: 1, name: 'Alice', phone: '123456', email: 'alice@example.com', address: '123 Main St', session_active: true }
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
            session_active: true
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
            json: jest.fn((user) => {
                console.log('User updated:', user); // This will print the list of users to the console
                return res; // Maintain the chainability of the res object
            }),
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

        // Act
        await createUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400); // Use 400 for bad request/missing fields
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining('All fields are required') // The error message should mention the missing fields
        });
    });
});

describe('updateUser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should update an existing user and return the updated user data', async () => {
        // Arrange
        const userId = 1;
        const mockUser = {
            id: userId,
            name: 'Updated User',
            phone: '1234567890',
            email: 'updateduser@example.com',
            password: 'hashedpassword', // This should be a hashed password
            address: '123 Updated St'
        };

        User.findByPk.mockResolvedValue({
            ...mockUser,
            update: jest.fn().mockResolvedValue(mockUser)
        }); // Mock the User.findByPk method and the update operation

        const req = {
            params: { id_user: userId },
            body: {
                ...mockUser,
                password: 'password123' // The unhashed password that the user submits
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn((user) => {
                return res; // Maintain the chainability of the res object
            }),
        };

        // Act
        await updateUser(req, res);

        // Assert
        expect(User.findByPk).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            name: mockUser.name,
            phone: mockUser.phone,
            email: mockUser.email,
            address: mockUser.address
        });
    });

    it('should respond with an error if the user does not exist', async () => {
        // Arrange
        const userId = 2;
        User.findByPk.mockResolvedValue(null); // Simulate user not found

        const req = {
            params: { id_user: userId },
            body: {
                name: 'Updated User',
                phone: '1234567890',
                email: 'updateduser@example.com',
                password: 'hashedpassword', // This should be a hashed password
                address: '123 Updated St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await updateUser(req, res);

        // Assert
        expect(User.findByPk).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should not update the user if the new email is already in use by another user', async () => {
        // Arrange
        const userId = 3;
        const duplicateEmail = 'duplicate@example.com';

        User.findByPk.mockResolvedValue({
            id: userId,
            email: 'originaluser@example.com',
            update: jest.fn()
        }); // Mock finding the original user

        User.findOne.mockResolvedValue({
            id: 4,
            email: duplicateEmail
        }); // Simulate finding another user with the same email

        const req = {
            params: { id_user: userId },
            body: {
                email: duplicateEmail,
                name: 'Updated User',
                phone: '1234567890',
                password: 'hashedpassword', // This should be a hashed password
                address: '123 Updated St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await updateUser(req, res);

        // Assert
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: duplicateEmail } });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email already in use' });
    });

    it('should respond with an error if required fields are missing', async () => {
        // Arrange
        const userId = 5;
        User.findByPk.mockResolvedValue({ id: userId, email: 'user@example.com' }); // Mock finding the user

        const req = {
            params: { id_user: userId },
            body: {
                // Missing 'name', 'phone', 'password', 'address'
                email: 'user@example.com'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await updateUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
    });

    it('should handle errors if the update operation fails', async () => {
        // Arrange
        const userId = 6;
        const error = new Error('Update failed');

        User.findByPk.mockResolvedValue({
            id: userId,
            email: 'user@example.com',
            update: jest.fn().mockRejectedValue(error)
        }); // Mock finding the user and simulate update failure

        const req = {
            params: { id_user: userId },
            body: {
                name: 'Updated User',
                phone: '1234567890',
                email: 'user@example.com',
                password: 'newpassword',
                address: '123 Updated St'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Act
        await updateUser(req, res);

        // Assert
        expect(User.findByPk).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});

describe('deleteUser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should delete the user if found', async () => {
        const req = {
            params: { id_user: '1' },
        };
        const res = {
            status: jest.fn(() => res),
            end: jest.fn(),
        };

        User.findByPk.mockResolvedValue({
            destroy: jest.fn().mockResolvedValue(true),
        });

        await deleteUser(req, res);

        expect(User.findByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return a 404 if the user is not found', async () => {
        const req = {
            params: { id_user: '2' },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        User.findByPk.mockResolvedValue(null);

        await deleteUser(req, res);

        expect(User.findByPk).toHaveBeenCalledWith('2');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return a 500 if there is a server error', async () => {
        const req = {
            params: { id_user: '3' },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        User.findByPk.mockResolvedValue({
            destroy: jest.fn().mockRejectedValue(new Error('Internal server error')),
        });

        await deleteUser(req, res);

        expect(User.findByPk).toHaveBeenCalledWith('3');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});

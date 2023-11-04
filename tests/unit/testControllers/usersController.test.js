// usersController.test.js
const { getUsers } = require('../../../app/controllers/usersController');
const User = require('../../../app/models/userModel'); // Adjust the import path as necessary

// Mocking User model's findAll method
jest.mock('../../../app/models/userModel', () => ({
    findAll: jest.fn(),
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

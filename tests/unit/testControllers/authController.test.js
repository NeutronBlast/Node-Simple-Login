const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { login } = require('../../../app/controllers/authController'); // Adjust the path as necessary
const User = require('../../../app/models/userModel'); // Adjust the path as necessary

// Mocking bcrypt
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

// Mocking jsonwebtoken
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

// Mocking User model
jest.mock('../../../app/models/userModel', () => ({
    findOne: jest.fn(),
    // ... any other methods you need to mock
}));

describe('authController login function', () => {
    const mockRequest = (sessionData) => {
        return {
            body: sessionData,
        };
    };

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        // Clear mock implementations before each test
        jwt.sign.mockClear();
        bcrypt.compare.mockClear();
        User.findOne.mockClear();
    });

    it('should login successfully and return a token', async () => {
        // Set up mock implementations
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');
        User.findOne.mockResolvedValue({
            id: 1,
            phone: '1234567890',
            password: 'hashedPassword',
            address: 'addy',
            email: 'frankh@sdx.com'
        });

        const req = mockRequest({ phone: '1234567890', password: 'password123' });
        const res = mockResponse();

        try {
            await login(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                access_token: 'mockToken',
                token_type: 'bearer',
                user: expect.objectContaining({
                    id: expect.any(Number),
                    phone: '1234567890',
                }),
            }));
        } catch (error) {
            console.error('Unexpected Error:', error);
        }
    });

    it('should return 404 if the user is not found', async () => {
        // Mock User.findOne to return null, indicating user not found
        User.findOne.mockResolvedValue(null);

        const req = mockRequest({ phone: 'unknown', password: 'password123' });
        const res = mockResponse();

        await login(req, res);

        // Assertions
        expect(User.findOne).toHaveBeenCalledWith({ where: { phone: 'unknown' } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 401 if the password is incorrect', async () => {
        // Mock User.findOne to return a user
        User.findOne.mockResolvedValue({
            id: 1,
            phone: '1234567890',
            password: 'hashedPassword'
        });
        // Mock bcrypt.compare to return false, indicating password mismatch
        bcrypt.compare.mockResolvedValue(false);

        const req = mockRequest({ phone: '1234567890', password: 'wrongPassword' });
        const res = mockResponse();

        await login(req, res);

        // Assertions
        expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Password is incorrect' });
    });

});

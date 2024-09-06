const { registerUser } = require('../controllers/userController')


jest.mock('../models/userModel', () => {
    const mockUser = {
        _id: 'user-id',
        name: 'test name',
        email: 'demo@demo.com',
    };

    return {
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(mockUser),
    };
});

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockResolvedValue('mock-token'),
}));

const bcrypt = require('bcryptjs');
bcrypt.getSalt = jest.fn().mockResolvedValue('mock-salt');
bcrypt.hash = jest.fn().mockResolvedValue('mock-hashed-password');


test('should register a new user', async () => {
    const req = {
        body: {
            firstName: 'Test',
            lastName: 'Name',
            email: 'demo@demo.com',
            password: 'password'
        },
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }

    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
});


test('should return error 400 if required fields are missing', async () => {
    const req = {
        body: {
            name: 'test name',
            email: '', //email is missing
            password: 'password'
        },
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }

    await expect(registerUser(req, res)).rejects.toThrow('All fields are required');
    expect(res.status).toHaveBeenCalledWith(400)
})


// root/middlewares/authMiddleware.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
};
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Authorization: Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Authorization header is missing');
    }
};

module.exports = {
    authMiddleware,
    hashPassword
};
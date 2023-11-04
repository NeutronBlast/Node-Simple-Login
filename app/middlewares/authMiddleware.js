// root/middlewares/authMiddleware.js

const bcrypt = require('bcryptjs');

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
    // Insert your authentication logic here
    // If authenticated, call next()
    // If not authenticated, you might send a 401 Unauthorized response, for example:
    // res.status(401).send('Unauthorized');

    // For now, we'll just call next()
    next();
};

module.exports = {
    authMiddleware,
    hashPassword
};
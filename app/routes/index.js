const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes')
const {authMiddleware} = require("../middlewares/authMiddleware");

module.exports = (app) => {
    app.use('/api/v1', authRoutes);
    app.use('/api/v1/users', authMiddleware, usersRoutes)
};

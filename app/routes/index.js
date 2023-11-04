const authRoutes = require('./authRoutes');

module.exports = (app) => {
    app.use('/api/v1', authRoutes);
};

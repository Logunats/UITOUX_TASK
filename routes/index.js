
const initializeRoutes = (app) => {
    app.use('/auth', require('./auth.route'));
    app.use('/cart', require('./cart.route'));
    app.use('/product', require('./product.route'));
};

module.exports = initializeRoutes;

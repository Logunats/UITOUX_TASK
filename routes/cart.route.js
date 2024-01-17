const { EXPRESS } = require('../utils/packages');
const { cartController } = require('../controller');
const { cartValidator } = require('../validators');
const verifyToken = require('../middleware/tokenAuth.middleware');

const cartRoutes = EXPRESS.Router();

cartRoutes.put('/updateCart', verifyToken, cartValidator.updateCart, cartController.updateCart);
cartRoutes.get('/getCart', verifyToken, cartController.getCart);

module.exports = cartRoutes;
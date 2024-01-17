const { EXPRESS } = require('../utils/packages');
const { authController } = require('../controller');
const { authValidator } = require('../validators');
const verifyToken = require('../middleware/tokenAuth.middleware');

const authRoutes = EXPRESS.Router();

authRoutes.post('/signup', authValidator.signup, authController.signup);
authRoutes.post('/login', authValidator.login, authController.login);
authRoutes.get('/getAccessToken', verifyToken, authController.getAccessToken);

module.exports = authRoutes;
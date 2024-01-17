const { JWT } = require('../utils/packages');
const config = require('../config/config');
const responseMessages = require('../utils/responseMessages');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.unAuthorized({ message: responseMessages[1013] });
        }
        const token = authHeader.split(' ')[1];
        const verifiedResp = JWT.verify(token, config.jwtSecretKey);
        req.loginUser = verifiedResp.customerData;
    } catch (err) {
        return res.unAuthorized({ message: responseMessages[1014] });
    }
    return next();
};

module.exports = verifyToken;

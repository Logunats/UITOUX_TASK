require('dotenv').config();

const config = {
    ...process.env,
    ... {
        port: process.env.PORT,
        appEnv: process.env.NODE_ENV,
        appName: process.env.APP_NAME,
        dbUrl: process.env.DB_CONNECTION,
        jwtSecretKey: process.env.JWT_SECRET_KEY,
        accessExpireTime: process.env.ACCESS_EXPIRE_TIME,
        refreshExpireTime: process.env.REFRESH_EXPIRE_TIME,
        bcryptSaltRound: process.env.BCRYPT_SALT_ROUND ? parseInt(process.env.BCRYPT_SALT_ROUND) : process.env.BCRYPT_SALT_ROUND,
    }
};

module.exports = config;
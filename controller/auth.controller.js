const { BCRYPT, JWT } = require('../utils/packages');
const { DB_MODELS } = require('../utils/constant');
const dbService = require('../services/db.service');
const dbConnection = require('../models');
const config = require('../config/config');
const responseMessages = require('./../utils/responseMessages');

class AuthController {

    signup = async (req, res) => {
        try {
            const payload = req.body;
            const findEmail = await dbService.findOne(
                dbConnection,
                DB_MODELS.CUSTOMER.MODEL,
                {
                    email: payload.email
                }
            );
            if (findEmail) {
                return res.badRequest({
                    message: responseMessages[1023]
                });
            }

            const findMobile = await dbService.findOne(
                dbConnection,
                DB_MODELS.CUSTOMER.MODEL,
                {
                    mobile: payload.mobile
                }
            );
            if (findMobile) {
                return res.badRequest({
                    message: responseMessages[1024]
                });
            }

            const bcryptSalt = await BCRYPT.genSalt(config.bcryptSaltRound);
            const encryptedPassword = await BCRYPT.hash(payload.password, bcryptSalt);

            const createResp = await dbService.create(
                dbConnection,
                DB_MODELS.CUSTOMER.MODEL,
                {
                    email: payload.email,
                    password: encryptedPassword,
                    mobile: payload.mobile,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                }
            );

            return res.ok({
                message: responseMessages[1025]
            });
        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1026]
            });
        }
    }

    login = async (req, res) => {
        try {
            const payload = req.body;
            const findCustomer = await dbService.findOne(
                dbConnection,
                DB_MODELS.CUSTOMER.MODEL,
                {
                    email: payload.email
                }
            );
            if (!findCustomer) {
                return res.badRequest({
                    message: responseMessages[1027]
                });
            }

            const comparePassword = await BCRYPT.compare(
                payload.password,
                findCustomer.password
            );
            if(!comparePassword) {
                return res.badRequest({
                    message: responseMessages[1028]
                });
            }

            const accessToken = JWT.sign({
                expiresIn: config.accessExpireTime,
                customerData: {
                    _id: findCustomer._id,
                    email: findCustomer.email,
                    // customerCode: findCustomer.customerCode,
                    firstName: findCustomer.firstName,
                    lastName: findCustomer.lastName,
                    mobile: findCustomer.mobile
                }
            }, config.jwtSecretKey);

            const refreshToken = JWT.sign({
                expiresIn: config.refreshExpireTime,
                customerData: {
                    _id: findCustomer._id,
                    email: findCustomer.email,
                    // customerCode: findCustomer.customerCode,
                    firstName: findCustomer.firstName,
                    lastName: findCustomer.lastName,
                    mobile: findCustomer.mobile
                }
            }, config.jwtSecretKey);

            return res.ok({
                data: {
                    _id: findCustomer._id,
                    email: findCustomer.email,
                    // customerCode: findCustomer.customerCode,
                    firstName: findCustomer.firstName,
                    lastName: findCustomer.lastName,
                    mobile: findCustomer.mobile,
                    accessToken,
                    refreshToken
                },
                message: responseMessages[1029]
            });
        } catch (error) {
            console.log(error)
            return res.internalServerError({
                error: error,
                message: responseMessages[1030]
            });
        }
    }

    getAccessToken = async (req, res) => {
        try {
            const findCustomer = await dbService.findById(
                dbConnection,
                DB_MODELS.CUSTOMER.MODEL,
                req.loginUser._id
            );

            const accessToken = JWT.sign({
                expiresIn: config.accessExpireTime,
                customerData: {
                    _id: findCustomer._id,
                    email: findCustomer.email,
                    // customerCode: findCustomer.customerCode,
                    firstName: findCustomer.firstName,
                    lastName: findCustomer.lastName,
                    mobile: findCustomer.mobile
                }
            }, config.jwtSecretKey);

            return res.ok({
                data: {
                    accessToken
                }
            });
        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1031]
            });
        }
    }

}

module.exports = new AuthController();

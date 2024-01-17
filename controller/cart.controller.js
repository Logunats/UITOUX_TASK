const responseMessages = require('./../utils/responseMessages');
const { DB_MODELS } = require('../utils/constant');
const dbService = require('../services/db.service');
const dbConnection = require('../models');

class CartController {

    updateCart = async (req, res) => {
        try {
            const payload = req.body;
            const updateResp = await dbService.findOneAndUpdate(
                dbConnection,
                DB_MODELS.CART.MODEL,
                {
                    customerId: req.loginUser._id
                },
                {
                    customerId: req.loginUser._id,
                    products: payload.products ? payload.products : []
                },
                true,
                true
            );

            return res.ok({
                message: responseMessages[1015]
            });
        } catch (error) {
            console.log(error)
            return res.internalServerError({
                error: error,
                message: responseMessages[1016]
            });
        }
    }

    getCart = async (req, res) => {
        try {
            const findResp = await dbService.findOne(
                dbConnection,
                DB_MODELS.CART.MODEL,
                {
                    customerId: req.loginUser._id
                }
            );

            return res.ok({
                data: findResp
            });
        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1017]
            });
        }
    }

}

module.exports = new CartController();

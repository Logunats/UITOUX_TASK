const responseMessages = require('../utils/responseMessages');
const { DB_MODELS, PRODUCT_FILTER_TYPE } = require('../utils/constant');
const dbService = require('../services/db.service');
const dbConnection = require('../models');

class ProductController {

    getBannerList = async (req, res) => {
        try {
            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.BANNER.MODEL,
                {
                    deleteFlag: false,
                    isActive: true
                },
                { createdAt: 0, updatedAt: 0 },
                [],
                {
                    order: 1
                }
            );

            return res.ok({
                data: findResp,
                message: responseMessages[1005]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1006]
            });
        }
    }

    getSliderList = async (req, res) => {
        try {
            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.SLIDER.MODEL,
                {
                    deleteFlag: false,
                    isActive: true
                },
                { createdAt: 0, updatedAt: 0 },
                [],
                {
                    order: 1
                }
            );

            return res.ok({
                data: findResp,
                message: responseMessages[1007]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1008]
            });
        }
    }

    getBrandList = async (req, res) => {
        try {
            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.BRAND.MODEL,
                {
                    deleteFlag: false
                },
                { createdAt: 0, updatedAt: 0 }
            );

            return res.ok({
                data: findResp,
                message: responseMessages[1009]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1010]
            });
        }
    }

    getCategoryList = async (req, res) => {
        try {
            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.PRODUCT_CATEGORY.MODEL,
                {
                    deleteFlag: false
                },
                { createdAt: 0, updatedAt: 0 }
            );

            return res.ok({
                data: findResp,
                message: responseMessages[1009]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1010]
            });
        }
    }

    updateSubscribe = async (req, res) => {
        try {
            const payload = req.body;
            const findResp = await dbService.findOne(
                dbConnection,
                DB_MODELS.NEWS_LETTER_SUBSCRIBE.MODEL,
                {
                    deleteFlag: false,
                    email: req.body.email
                },
                { createdAt: 0, updatedAt: 0 }
            );

            if (findResp) {
                return res.ok({
                    message: responseMessages[1018]
                })
            }

            await dbService.create(
                dbConnection,
                DB_MODELS.NEWS_LETTER_SUBSCRIBE.MODEL,
                {
                    isActive: true,
                    email: payload.email
                }
            );

            return res.ok({
                data: findResp,
                message: responseMessages[1019]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1010]
            });
        }
    }

    getProductList = async (req, res) => {
        try {
            const payload = req.body;
            const skip = payload.start;
            const limit = payload.length;
            const finalResp = [];

            const query = {
                deleteFlag: false
            };

            if (payload.categoryId) {
                query.categoryId = payload.categoryId
            };

            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.PRODUCTS.MODEL,
                query,
                {},
                [
                    {
                        path: 'discountId',
                        select: { _id: 1, code: 1, discountPercent: 1 }
                    }
                ],
                {
                    createdAt: -1
                },
                limit,
                skip
            );

            findResp.forEach(element => {
                let totalPrice = element.price;
                if (element.discountId) {
                    let discountAmount = parseFloat(totalPrice) * parseInt(element.discountId.discountPercent) / 100;
                    totalPrice = parseFloat(totalPrice) - parseFloat(discountAmount)
                }
                finalResp.push({
                    ...JSON.parse(JSON.stringify(element)),
                    finalPrice: parseFloat(totalPrice).toFixed(2)
                })
            });

            return res.ok({
                data: finalResp,
                message: responseMessages[1021]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1022]
            });
        }
    }

    getTopProductList = async (req, res) => {
        try {
            const payload = req.body;
            const limit = parseInt(3);
            const finalResp = [];

            const query = {
                deleteFlag: false
            };
            let sortObj = {};

            if (payload.filterType == PRODUCT_FILTER_TYPE.TOP_RATED) {
                sortObj = { rating: -1 };
            } else if (payload.filterType == PRODUCT_FILTER_TYPE.SPECIAL_OFFERS) {
                query.specialOffer = true;
            } else if (payload.filterType == PRODUCT_FILTER_TYPE.BEST_SELLERS) {
                sortObj = { soldQuantity: -1 }
            }

            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.PRODUCTS.MODEL,
                query,
                {},
                [
                    {
                        path: 'discountId',
                        select: { _id: 1, code: 1, discountPercent: 1 }
                    }
                ],
                sortObj,
                limit
            );

            findResp.forEach(element => {
                let totalPrice = element.price;
                if (element.discountId) {
                    let discountAmount = parseFloat(totalPrice) * parseInt(element.discountId.discountPercent) / 100;
                    totalPrice = parseFloat(totalPrice) - parseFloat(discountAmount)
                }
                finalResp.push({
                    ...JSON.parse(JSON.stringify(element)),
                    finalPrice: parseFloat(totalPrice).toFixed(2)
                })
            });

            return res.ok({
                data: findResp,
                message: responseMessages[1021]
            });

        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1022]
            });
        }
    }

    searchProduct = async (req, res) => {
        try {
            const payload = req.body;
            const query = {
                deleteFlag: false,
                $or: [
                    { skuCode: { '$regex': payload.searchValue, '$options': 'i' } },
                    { name: { '$regex': payload.searchValue, '$options': 'i' } }
                ]
            };
            const findResp = await dbService.find(
                dbConnection,
                DB_MODELS.PRODUCTS.MODEL,
                query,
                { _id: 1, name: 1, skuCode: 1 }
            );
            return res.ok({
                data: findResp
            });
        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[1032]
            });
        }
    }

}

module.exports = new ProductController();

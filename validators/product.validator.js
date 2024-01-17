const {
    JOI
} = require('../utils/packages');
const { PRODUCT_FILTER_TYPE } = require('../utils/constant');
const validatorService = require('../services/validator.service');

const updateSubscribeSchema = JOI.object({
    email: JOI.string().email({ tlds: { allow: false } }).required()
});

const productListSchema = JOI.object({
    start: JOI.number().required().error(validatorService.getValidationMessage),
    length: JOI.number().required().error(validatorService.getValidationMessage),
    categoryId: JOI.string().optional().error(validatorService.getValidationMessage)
});

const topProductListSchema = JOI.object({
    filterType: JOI.string().valid(PRODUCT_FILTER_TYPE.SPECIAL_OFFERS, PRODUCT_FILTER_TYPE.BEST_SELLERS, PRODUCT_FILTER_TYPE.TOP_RATED).required().error(validatorService.getValidationMessage)
});

const searchProductSchema = JOI.object({
    searchValue: JOI.string().required().error(validatorService.getValidationMessage)
});

async function validateMethod(schemaName, dataToValidate) {
    try {
        const {
            error,
            value
        } = schemaName.validate(dataToValidate);
        return {
            error: (error ? validatorService.convertJoiErrors(error.details) : ''),
            validatedData: value
        };
    } catch (error) {
        return {
            error
        };
    }
}

class DashboardValidator {

    updateSubscribe = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(updateSubscribeSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

    productList = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(productListSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

    topProductList = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(topProductListSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

    searchProduct = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(searchProductSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }
}

module.exports = new DashboardValidator();
const {
    JOI
} = require('../utils/packages');
const validatorService = require('../services/validator.service');


const updateCartSchema = JOI.object({
    totalPrice: JOI.number().optional().error(validatorService.getValidationMessage),
    products: JOI.array().items({
        productId: JOI.string().optional().error(validatorService.getValidationMessage),
        quantity: JOI.number().optional().error(validatorService.getValidationMessage),
        price: JOI.number().optional().error(validatorService.getValidationMessage)
    }).optional().error(validatorService.getValidationMessage)
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

class cartValidator {

    updateCart = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(updateCartSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

}

module.exports = new cartValidator();
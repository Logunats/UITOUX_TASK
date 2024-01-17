const {
    JOI
} = require('../utils/packages');
const validatorService = require('../services/validator.service');

const loginSchema = JOI.object({
    email: JOI.string().required().error(validatorService.getValidationMessage),
    password: JOI.string().required().error(validatorService.getValidationMessage)
});

const signupSchema = JOI.object({
    email: JOI.string().required().error(validatorService.getValidationMessage),
    firstName: JOI.string().required().error(validatorService.getValidationMessage),
    lastName: JOI.string().required().error(validatorService.getValidationMessage),
    mobile: JOI.string().required().error(validatorService.getValidationMessage),
    password: JOI.string().required().error(validatorService.getValidationMessage)
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

class AuthValidator {

    login = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(loginSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

    signup = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(signupSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

}

module.exports = new AuthValidator();
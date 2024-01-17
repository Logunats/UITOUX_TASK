const {
    STATUS_CODES,
    STATUS_MESSAGE
} = require('../utils/constant');

const responseHandler = () => {

    return async (req, res, next) => {

        /* 200 responses */
        res.success = ({ statusCode, message = null, data = {} }) => {
            const status = STATUS_MESSAGE.SUCCESS;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_MULTIPLE_CHOICE) && (statusCode >= STATUS_CODES.HTTP_OK))) ? (res.status(statusCode)) : (res.status(STATUS_CODES.HTTP_OK));
            res.json({
                status,
                message,
                data
            });
        };

        /* 300 responses */
        res.redirect = ({ statusCode, data = {}, error = null, message = null }) => {
            const status = STATUS_MESSAGE.REDIRECT;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_BAD_REQUEST) && (statusCode >= STATUS_CODES.HTTP_MULTIPLE_CHOICE))) ? (res.status(statusCode)) : (res.status(STATUS_CODES.HTTP_MULTIPLE_CHOICE));
            res.json({ status, data, message, error });
        };

        /* 400 responses */
        res.clientError = ({ statusCode, data = {}, error = null, message = null }) => {
            const status = STATUS_MESSAGE.CLIENT_ERROR;
            (statusCode && ((statusCode < STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR) && (statusCode >= STATUS_CODES.HTTP_BAD_REQUEST))) ? (res.status(statusCode)) : (res.status(STATUS_CODES.HTTP_BAD_REQUEST));
            res.json({ status, data, message, error });
        };

        /* 500 responses */
        res.serverError = ({ statusCode, data = {}, error = null, message = null }) => {
            const status = STATUS_MESSAGE.SERVER_ERROR;
            (statusCode && (statusCode < STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR)) ? (res.status(statusCode)) : (res.status(STATUS_CODES.HTTP_BAD_REQUEST));
            res.json({ status, data, message, error });
        };

        /* 200 */
        res.ok = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODES.HTTP_OK });
        };

        /* 201 */
        res.created = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODES.HTTP_CREATED });
        };

        /* 202 */
        res.accepted = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODES.HTTP_ACCEPTED });
        };

        /* 204 */
        res.noContent = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODES.HTTP_NO_CONTENT });
        };

        /* 400 */
        res.badRequest = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_BAD_REQUEST });
        };

        /* 401 */
        res.unAuthorized = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_UNAUTHORIZED });
        };

        /* 403 */
        res.forbidden = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_FORBIDDEN });
        };

        /* 404 */
        res.notFound = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_NOT_FOUND });
        };

        /* 406 */
        res.notAcceptable = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_NOT_ACCEPTABLE });
        };

        /* 408 */
        res.requestTimeout = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_REQUEST_TIMEOUT });
        };

        /* 409 */
        res.conflict = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_CONFLICT });
        };

        /* 422 */
        res.unprocessableEntity = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODES.HTTP_UNPROCESSABLE_ENTITY });
        };

        /* 500 */
        res.internalServerError = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODES.HTTP_INTERNAL_SERVER_ERROR });
        };

        /* 502 */
        res.badGateway = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODES.HTTP_BAD_GATEWAY });
        };

        /* 503 */
        res.serviceUnavailable = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODES.HTTP_SERVICE_UNAVAILABLE, });
        };

        /* 504 */
        res.gatewayTimeout = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODES.HTTP_GATEWAY_TIMEOUT, });
        };

        await next();
    }

}

module.exports = responseHandler;

module.exports = Object.freeze({
    STATUS_MESSAGE: {
        SUCCESS: 'SUCCESS',
        REDIRECT: 'REDIRECT',
        CLIENT_ERROR: 'CLIENT-ERROR',
        SERVER_ERROR: 'SERVER-ERROR'
    },
    STATUS_CODES: {
        HTTP_CONTINUE: 100,
        HTTP_SWITCHING_PROTOCOLS: 101,
        HTTP_PROCESSING: 102,
        HTTP_EARLY_HINTS: 103,
        HTTP_OK: 200,
        HTTP_CREATED: 201,
        HTTP_ACCEPTED: 202,
        HTTP_NON_AUTHORITATIVE_INFORMATION: 203,
        HTTP_NO_CONTENT: 204,
        HTTP_RESET_CONTENT: 205,
        HTTP_PARTIAL_CONTENT: 206,
        HTTP_MULTI_STATUS: 207,
        HTTP_ALREADY_REPORTED: 208,
        HTTP_IM_USED: 226,
        HTTP_MULTIPLE_CHOICE: 300,
        HTTP_MOVED_PERMANENTLY: 301,
        HTTP_FOUND: 302,
        HTTP_SEE_OTHER: 303,
        HTTP_NOT_MODIFIED: 304,
        HTTP_USE_PROXY: 305,
        HTTP_UNUSED: 306,
        HTTP_TEMPORARY_REDIRECT: 307,
        HTTP_PERMANENT_REDIRECT: 308,
        HTTP_BAD_REQUEST: 400,
        HTTP_UNAUTHORIZED: 401,
        HTTP_PAYMENT_REQUIRED: 402,
        HTTP_FORBIDDEN: 403,
        HTTP_NOT_FOUND: 404,
        HTTP_METHOD_NOT_ALLOWED: 405,
        HTTP_NOT_ACCEPTABLE: 406,
        HTTP_PROXY_AUTHENTICATION_REQUIRED: 407,
        HTTP_REQUEST_TIMEOUT: 408,
        HTTP_CONFLICT: 409,
        HTTP_GONE: 410,
        HTTP_LENGTH_REQUIRED: 411,
        HTTP_PRECONDITION_REQUIRED: 412,
        HTTP_PAYLOAD_TOO_LARGE: 413,
        HTTP_URI_TOO_LONG: 414,
        HTTP_UNSUPPORTED_MEDIA_TYPE: 415,
        HTTP_RANGE_NOT_SATISFIABLE: 416,
        HTTP_EXPECTATION_FAILED: 417,
        HTTP_UNPROCESSABLE_ENTITY: 422,
        HTTP_UPGRADE_REQUIRED: 426,
        HTTP_TOO_MANY_REQUESTS: 429,
        HTTP_INTERNAL_SERVER_ERROR: 500,
        HTTP_NOT_IMPLEMENTED: 501,
        HTTP_BAD_GATEWAY: 502,
        HTTP_SERVICE_UNAVAILABLE: 503,
        HTTP_GATEWAY_TIMEOUT: 504,
        HTTP_INSUFFICIENT_STORAGE: 507,
        HTTP_LOOP_DETECTED: 508,
        HTTP_NETWORK_AUTHENTICATION_REQUIRED: 511
    },
    DB_MODELS: {
        'CUSTOMER': { MODEL: 'CUSTOMER', COLLECTION: 'customers' },
        'CUSTOMER_ADDRESS': { MODEL: 'CUSTOMER_ADDRESS', COLLECTION: 'customerAddress' },
        'CUSTOMER_PAYMENT': { MODEL: 'CUSTOMER_PAYMENT', COLLECTION: 'customerPayment' },
        'DISCOUNT': { MODEL: 'DISCOUNT', COLLECTION: 'discount' },
        'PRODUCTS': { MODEL: 'PRODUCTS', COLLECTION: 'products' },
        'PRODUCT_CATEGORY': { MODEL: 'PRODUCT_CATEGORY', COLLECTION: 'productCategory' },
        'BRAND': { MODEL: 'BRAND', COLLECTION: 'brand' },
        'PRODUCT_INVENTORY': { MODEL: 'PRODUCT_INVENTORY', COLLECTION: 'productInventory' },
        'CART': { MODEL: 'CART', COLLECTION: 'cart' },
        'ORDER': { MODEL: 'order', COLLECTION: 'orders' },
        'SHIPMENT': { MODEL: 'SHIPMENT', COLLECTION: 'shipment' },
        'BANNER': { MODEL: 'BANNER', COLLECTION: 'banners' },
        'SLIDER': { MODEL: 'SLIDER', COLLECTION: 'sliders' },
        'NEWS_LETTER_SUBSCRIBE': { MODEL: 'NEWS_LETTER_SUBSCRIBE', COLLECTION: 'newsLetterSubscribe' }
    },
    PRODUCT_FILTER_TYPE: {
        TOP_RATED: 'top_rated',
        BEST_SELLERS: 'best_sellers',
        SPECIAL_OFFERS: 'special_offers'
    }
});

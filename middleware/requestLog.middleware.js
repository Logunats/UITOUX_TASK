const {
    MOMENT,
    UUID_V4
} = require('./../utils/packages');

function genetrateUuid() {
    return UUID_V4();
}

function showInfo(req, logJson) {
    console.log(JSON.stringify(logJson));
}

function get_log_json(req) {
    return {
        ip: req.ip,
        apiName: req.apiName,
        host: req.headers ? req.headers.host : '',
        userAgent: req.headers ? req.headers['user-agent'] : '',
        requestId: req.requestId,
        protocol: req.protocol,
        url: req.originalUrl,
        path: req.path,
        method: req.method,
        headers: req.headers,
    };
}

exports.requestLog = () => {
    return async (req, res, next) => {
        req.requestId = genetrateUuid();
        req.startTime = MOMENT().format('DD-MM-YYYY HH:mm:ss.SSS');
        showInfo(req, {
            ...get_log_json(req),
            ...{
                type: 'request',
                startTime: req.startTime,
                body: req.body ? req.body : {}
            }
        });
        next();
        res.on('finish', () => {
            req.endTime = MOMENT().format('DD-MM-YYYY HH:mm:ss.SSS');
            showInfo(req, {
                ...get_log_json(req),
                ...{
                    type: 'response',
                    endTime: req.endTime,
                    processed_time: MOMENT(req.startTime, 'DD-MM-YYYY HH:mm:ss.SSS').diff(MOMENT(req.endTime, 'DD-MM-YYYY HH:mm:ss.SSS'), 'seconds') + ' seconds',
                    response: res.body,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                }
            });
        });
    };
}

exports.responseBody = () => {
    return (req, res, next) => {
        const selfWrite = res.write;
        const selfEnd = res.end;
        const chunks = [];
        res.write = (...args) => {
            const chunk = args[0];
            chunks.push(chunk);
            return selfWrite.apply(res, args);
        }
        res.end = (...args) => {
            const chunk = args[0];
            if (chunk) chunks.push(chunk);
            res.body = Buffer.concat(chunks).toString('utf8');
            selfEnd.apply(res, args);
        }
        next();
    };
}

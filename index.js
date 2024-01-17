const { EXPRESS, BODY_PARSER, HTTP } = require('./utils/packages.js');
const config = require('./config/config');
const app = EXPRESS();
const server = HTTP.createServer(app);
const responseHandler = require('./middleware/response.middleware.js');
const requestLog = require('./middleware/requestLog.middleware.js');
const routers = require('./routes');
require('./config/db.config.js');

app.use(BODY_PARSER.urlencoded({ extended: false }));
app.use(BODY_PARSER.json());
app.use(requestLog.requestLog());
app.use(responseHandler());
routers(app);

app.get('/', (req, res) => {
    return res.ok({ message: responseMessages[1003] });
});

app.use((req, res, next) => {
    return res.notFound({ message: responseMessages[1004] });
});

server.listen(config.port, () => console.log(`Server is running on port ${config.port}.`));
const { MONGOOSE } = require('../utils/packages');
const config = require('./config');
const responseMessages = require('../utils/responseMessages');

MONGOOSE.connect(`${config.dbUrl}`, {
    useNewUrlParser: true,
    maxPoolSize: 5,
    wtimeoutMS: 2500
});

const db = MONGOOSE.connection;

db.on('error', err => {
    console.log(responseMessages[1001], err);
});

db.once('open', () => {
    console.log(responseMessages[1002]);
});
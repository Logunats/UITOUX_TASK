const {
    v4: UUID_V4,
} = require('uuid');

const exportsPackage = {
    BODY_PARSER: require('body-parser'),
    BCRYPT: require('bcryptjs'),
    DOTENV: require('dotenv'),
    EXPRESS: require('express'),
    HTTP: require('http'),
    MONGOOSE: require('mongoose'),
    MOMENT: require('moment'),
    JWT: require('jsonwebtoken'),
    JOI: require('joi').extend(require('@joi/date')),
};

module.exports = {
    ...exportsPackage,
    UUID_V4
};

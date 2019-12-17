'use strict';

const {API_KEY} = process.env;

module.exports = (req, res, next) => {
    if (API_KEY && req.get('x-api-key') === API_KEY) {
        next();
    } else {
        res.sendStatus(401);
    }
};
'use strict';

const {addArrival} = require('../lib/fake-upstream');

module.exports = (req, res, next) => {
    const {captain, port, vessel, datetime} = req.body;
     try {
         addArrival({captain: captain.replace(new RegExp(/\+/, 'g'), ' '), port, vessel, datetime});
     } catch(err) {
         if (err.message.toLowerCase().endsWith('not found')) return res.sendStatus(404);
         if (['Bad date format', 'Date too early', 'Missing Properties'].includes(err.message)) {
             return res.sendStatus(400);
         }
         return next(err)
     }

    return res.sendStatus(201);
};
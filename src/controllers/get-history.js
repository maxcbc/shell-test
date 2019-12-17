'use strict';

const {getCaptain} = require('../lib/fake-upstream');

module.exports = (req, res) => {
    const {captainName} = req.params;
    const formattedCaptainName = captainName.replace(new RegExp(/\+/, 'g'),' ');
    const history = getCaptain(formattedCaptainName);
    if (!history) {
        return res.sendStatus(404);
    }

    return res.send(history);
};
'use strict';

const express = require('express');

const app = module.exports = express();
const {PORT = 8080} = process.env;

app.get('/history/:captainName', require('./src/controllers/get-history'));

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
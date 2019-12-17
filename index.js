'use strict';

const express = require('express');

const app = module.exports = express();
const {PORT = 8080} = process.env;

app.use(require('body-parser').json());
app.get('/history/:captainName', require('./src/controllers/get-history'));
app.post('/arrival', require('./src/controllers/post-arrival'));
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
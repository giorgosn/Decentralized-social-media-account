/**
 * This is the main entry-point file for the app
 */
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use('/',routes);

module.exports = app;
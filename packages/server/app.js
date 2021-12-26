/**
 * This is the main entry-point file for the app
 */
const express = require('express');
const routes = require('./routes');
const router = express.Router();
const app = express();

// routes
app.use('/',routes);

module.exports = app;
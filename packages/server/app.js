/**
 * This is the main entry-point file for the app
 */
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const winston = require('winston');

// -----------------------------------
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
//---------------------------------------------------------

const logConfiguration = {
//--------------------------------------------------
    'format': combine(
       label({ label: 'right meow!' }),
       timestamp(),
       prettyPrint()
    ),
//-----------------------------------------------------
    'transports': [
        new winston.transports.Console({'timestamp':true}),
        new winston.transports.File({ filename: 'logs/webhook.log' })
    ]
};
const logger = winston.createLogger(logConfiguration);

// Log a message
logger.log({
    // Message to be logged
        message: 'Hello, Winston!',

    // Level of the message logging
        level: 'info'
    });
    // Log a message
    logger.info('Hello, Winston!');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use('/',routes);

module.exports = app;

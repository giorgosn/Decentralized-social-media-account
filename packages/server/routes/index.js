/**
 * This file is used for controlling all the routes at application level
 */

const express = require('express');
const router = express.Router();

require('./webhook')(router);
module.exports = router;

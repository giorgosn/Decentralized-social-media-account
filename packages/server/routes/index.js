/**
 * This file is used for controlling all the routes at application level
 */

const express = require('express');
const router = express.Router();

require('./webhook')(router);
require('./spaces')(router);
module.exports = router;

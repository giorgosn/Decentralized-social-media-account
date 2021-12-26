/**
 * This is the entry-point file for server side code.
 */
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);
console.log(`Listeing server on port ${port}`);
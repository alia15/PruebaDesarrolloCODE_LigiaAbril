const http = require('http');
const app = require('./src/app');

http.createServer(app.handleRequest).listen(3000);
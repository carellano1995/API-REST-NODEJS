'use strict';

const app = require('./index');
const http = require('http');
const mongodb = require('./lib/mongo-db');

/*
 * Create and start HTTP server.
 */
mongodb.config({
  mongoDbUrl: 'mongodb://',
  dbPortAndHost: 'localhost:27017',
  dbName: 'test',
  mongooseDebug: false
});
const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function() {
  console.log('Server listening on http://localhost:%d', this.address().port);
});

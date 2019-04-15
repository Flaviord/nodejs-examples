'use strict'

const hapi = require('hapi');
const server = new hapi.Server();
var routes = require('./routes.js');
server.connection({host: 'localhost', port: 3000});

server.route(routes);

server.start((err) => {
  if(err){
    throw err;
  }
  console.log('Server running');
});

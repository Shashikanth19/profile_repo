const express = require('express');
const routes = require('./routes');

const { SERVER: { port } } = require('./config');

const server = express();

const app = server.listen(port);

server.use("/", routes);

module.exports = server;


const express = require('express');

const UserRouter = require('../routers/user-router')

const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use(express.json());
server.use('/api', UserRouter)

module.exports = server;
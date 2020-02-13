const express = require('express');
const UserRouter = require('../routers/user-router')
const configureMiddleware = require('./configure-middleware.js');
const restricted = require('../auth/restricted')

const server = express();

configureMiddleware(server);

server.use(express.json());
server.use('/api', UserRouter)
server.use('/api/restricted', restricted)

module.exports = server;
const express = require('express');

const UserRouter = require('./routers/user-router')

const server = express();

server.use(express.json());
server.use('/api/users', UserRouter)

module.exports = server;
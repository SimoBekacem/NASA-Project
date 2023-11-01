const express = require('express');
const planetsRouter = require('./routers/planets/planets.router');
const launchRouter = require('./routers/launch/launch.router');
const api = express();

api.use('/planets', planetsRouter);
api.use('/launch', launchRouter);

module.exports = api;

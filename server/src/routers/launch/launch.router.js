const express = require('express');
const { getLaunch } = require('./launch.controler');
const launchRouter = express.Router();

launchRouter.get('/', getLaunch);

module.exports = launchRouter;

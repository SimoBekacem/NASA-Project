const express = require('express');
const { getLaunch, postLaunch } = require('./launch.controler');
const launchRouter = express.Router();

launchRouter.get('/', getLaunch);
launchRouter.post('/', postLaunch);

module.exports = launchRouter;

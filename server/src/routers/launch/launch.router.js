const express = require('express');
const { getLaunch, postLaunch, deleteLaunch } = require('./launch.controler');
const launchRouter = express.Router();

launchRouter.get('/', getLaunch);
launchRouter.post('/', postLaunch);
launchRouter.delete('/:id', deleteLaunch);

module.exports = launchRouter;

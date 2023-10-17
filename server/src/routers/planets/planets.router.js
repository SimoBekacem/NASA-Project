/*
 * first we call the express in order to create a router then we get the requests from the controler.
 */

const express = require('express');
const { getPlanets } = require('./planets.controler');
const planetsRouter = express.Router();

planetsRouter.get('/', getPlanets);

module.exports = planetsRouter;

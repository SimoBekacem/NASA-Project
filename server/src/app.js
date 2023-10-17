/*
 * first we call the express in order to make the API then we call the routers from the router folder .
 * we make the request by doing this app.use('/list', controler).
 * morgan and cors should put here because we are done withe server file .
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const planetsRouter = require('./routers/planets/planets.router');

app.use(
	cors({
		origin: 'http://localhost:3001',
	})
);
app.use(morgan('combined'));
app.use('/planets', planetsRouter);

module.exports = app;

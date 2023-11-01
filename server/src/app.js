/*
 * first we call the express in order to make the API then we call the routers from the router folder .
 * we make the request by doing this app.use('/list', controler).
 * morgan and cors should put here because we are done withe server file .
 */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const api = require('./api');

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));
app.use(express.json());
app.use('/v1', api);

module.exports = app;

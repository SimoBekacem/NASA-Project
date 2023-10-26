/*
 * first we call the http in order to create a server .
 * then we call the process in order to create a variable PORT that will equale 8080 or other unuse port.
 * then we call the app from the file app.js (look to this file to understand the app).
 * we should wait the loadPlanetData() to filter the data from the kepler_data.csv then we run the server .
 */

const http = require('http');
const process = require('process');
const app = require('./app');
const { loadPlanetData } = require('./modules/planets.module');
const { mongoConnect } = require('./services/mongo');
const PORT = 8080 | process.env.PORT;
const server = http.createServer(app);

async function startSever() {
	await mongoConnect();
	await loadPlanetData();
	server.listen(PORT, () => {
		console.log('we are listing to the PORT: ', PORT);
	});
}
startSever();

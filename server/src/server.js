/*
 * first we call the http in order to create a server .
 * then we call the process in order to create a variable PORT that will equale 8080 or other unuse port.
 * then we call the app from the file app.js (look to this file to understand the app).
 * we should wait the loadPlanetData() to filter the data from the kepler_data.csv then we run the server .
 */

const http = require('http');
const process = require('process');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetData } = require('./modules/planets.module');
const PORT = 8080 | process.env.PORT;
const server = http.createServer(app);
const MONGO_URL =
	'mongodb://simohassane2002:APkRPVqHYjTj2DyX@ac-rg7cej9-shard-00-00.0hhcpvj.mongodb.net:27017,ac-rg7cej9-shard-00-01.0hhcpvj.mongodb.net:27017,ac-rg7cej9-shard-00-02.0hhcpvj.mongodb.net:27017/?ssl=true&replicaSet=atlas-1e5swj-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
	console.log('Connected to the MongoDB');
});
mongoose.connection.on('error', (error) => {
	console.error('We have a problem to connecting to the MongoDB.');
});

async function startSever() {
	await mongoose.connect(MONGO_URL);
	await loadPlanetData();
	server.listen(PORT, () => {
		console.log('we are listing to the PORT: ', PORT);
	});
}
startSever();

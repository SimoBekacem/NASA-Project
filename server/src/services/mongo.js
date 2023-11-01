const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017';

mongoose.connection.once('open', () => {
	console.log('Connected to the MongoDB');
});
mongoose.connection.on('error', (error) => {
	console.error('We have a problem to connecting to the MongoDB.');
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
	await mongoose.disconnect(MONGO_URL);
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};

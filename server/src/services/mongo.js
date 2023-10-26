const mongoose = require('mongoose');
const MONGO_URL =
	'mongodb://simohassane2002:APkRPVqHYjTj2DyX@ac-rg7cej9-shard-00-00.0hhcpvj.mongodb.net:27017,ac-rg7cej9-shard-00-01.0hhcpvj.mongodb.net:27017,ac-rg7cej9-shard-00-02.0hhcpvj.mongodb.net:27017/?ssl=true&replicaSet=atlas-1e5swj-shard-0&authSource=admin&retryWrites=true&w=majority';

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

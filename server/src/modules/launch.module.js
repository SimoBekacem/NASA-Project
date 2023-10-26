const launches = new Map();
const launchesDB = require('./launch.mongo');
async function getLaunches(launches) {
	try {
		return await launchesDB.find(
			{},
			{
				_id: 0,
				__v: 0,
			}
		);
	} catch (error) {
		console.log(
			`There is a porble in getting the launches wich is: ${error}`
		);
	}
}

async function getLastFilghtNumber() {
	const lastLuanch = await launchesDB.findOne().sort('-flightNumber');
	return lastLuanch ? lastLuanch.flightNumber : 99;
}

async function addLaunch(launch) {
	const lastFilghtNumber = await getLastFilghtNumber();
	const newLaunch = Object.assign(launch, {
		flightNumber: lastFilghtNumber + 1,
		customer: ['ZTM', 'NASA'],
		upcoming: true,
		success: true,
	});
	try {
		await launchesDB.findOneAndUpdate(
			{
				flightNumber: lastFilghtNumber + 1,
			},
			newLaunch,
			{
				upsert: true,
			}
		);
	} catch (error) {
		console.log(
			`There is a problem in inserting the new launch wich is error: ${error}`
		);
	}
}

async function launchIsExist(launchId) {
	return await launchesDB.findOne({ flightNumber: launchId });
}
async function deleteLaunchFromMap(launchId) {
	try {
		await launchesDB.findOneAndUpdate(
			{
				flightNumber: launchId,
			},
			{
				upcoming: false,
				success: false,
			}
		);
		return {
			ok: true,
		};
	} catch (error) {
		console.log(
			`There is a problem in deleting the launch from the database wich is error: ${error}`
		);
	}
}
module.exports = {
	launches,
	getLaunches,
	addLaunch,
	launchIsExist,
	deleteLaunchFromMap,
};

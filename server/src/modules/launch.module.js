const launchesDB = require('./launch.mongo');
const axios = require('axios');

async function getLaunches() {
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

async function getLuanchesFromSpaceX() {
	const response = await axios.post(
		'https://api.spacexdata.com/v4/launches/query',
		{
			query: {},
			options: {
				pagination: false,
				populate: [
					{
						path: 'rocket',
						select: {
							name: 1,
						},
					},
					{
						path: 'payloads',
						select: {
							customers: 1,
						},
					},
				],
			},
		}
	);
	response.data.docs.map(async (launch) => {
		await saveLaunch(launch);
	});
}
async function saveLaunch(launch) {
	const customers = await launch.payloads.flatMap((payload) => {
		return payload.customers;
	});
	const newLaunch = {
		flightNumber: launch.flight_number,
		customers: customers,
		launchDate: launch.date_local,
		mission: launch.name,
		rocket: launch.rocket.name,
		success: launch.success,
		upcoming: launch.upcoming,
	};

	await launchesDB.findOneAndUpdate(
		{
			flightNumber: launch.flight_number,
		},
		newLaunch,
		{
			upsert: true,
		}
	);
}
getLuanchesFromSpaceX();
module.exports = {
	getLaunches,
	addLaunch,
	launchIsExist,
	deleteLaunchFromMap,
};

const launches = new Map();
let firstLaunchNumber = 100;
const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customer: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function transformMapToObject(launches) {
	return Array.from(launches.values());
}
function addLaunchToMap(launch) {
	firstLaunchNumber++;
	const newLaunch = Object.assign(launch, {
		flightNumber: firstLaunchNumber,
		customer: ['ZTM', 'NASA'],
		upcoming: true,
		success: true,
	});
	launches.set(firstLaunchNumber, newLaunch);
}
function launchIsExist(launchId) {
	return launches.has(launchId);
}
function deleteLaunchFromMap(launchId) {
	const deletedLaunch = launches.get(launchId);
	deletedLaunch.upcoming = false;
	deletedLaunch.success = false;
	return deletedLaunch;
}
module.exports = {
	launches,
	transformMapToObject,
	addLaunchToMap,
	launchIsExist,
	deleteLaunchFromMap,
};

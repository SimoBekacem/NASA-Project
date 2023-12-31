const {
	launches,
	getLaunches,
	addLaunch,
	deleteLaunchFromMap,
	launchIsExistWithId,
} = require('../../modules/launch.module');

async function getLaunch(req, res) {
	return res.status(200).json(await getLaunches(launches));
}

async function postLaunch(req, res) {
	let launch = req.body;
	if (
		!launch.launchDate ||
		!launch.mission ||
		!launch.rocket ||
		!launch.target
	) {
		return res.status(400).json({
			error: 'your missing an attribute so make sure the you fill all the fealds',
		});
	} else if (isNaN(new Date(launch.launchDate))) {
		return res.status(400).json({
			error: 'your date format is not acceptebal',
		});
	} else {
		await addLaunch(launch);
		return res.status(201).json(launch);
	}
}

async function deleteLaunch(req, res) {
	const launchId = Number(req.params.id);
	if (!(await launchIsExistWithId(launchId))) {
		res.status(400).json({
			error: 'this launch does not exist .',
		});
	} else {
		res.status(200).json(await deleteLaunchFromMap(launchId));
	}
}

module.exports = {
	getLaunch,
	postLaunch,
	deleteLaunch,
};

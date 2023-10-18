const {
	launches,
	transformMapToObject,
} = require('../../modules/launch.module');

function getLaunch(req, res) {
	return res.status(200).json(transformMapToObject(launches));
}

module.exports = {
	getLaunch,
};

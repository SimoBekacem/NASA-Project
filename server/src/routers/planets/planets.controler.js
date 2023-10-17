//! you made a bad mistack here you call the planets and not { planets } and because you get a object and not list
const { planets } = require('../../modules/planets.module');

function getPlanets(req, res) {
	return res.status(200).json(planets);
}

module.exports = {
	getPlanets,
};

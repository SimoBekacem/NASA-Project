//! you made a bad mistack here you call the planets and not { planets } and because you get a object and not list
const { getAllPlanets } = require('../../modules/planets.module');

async function getPlanets(req, res) {
	return res.status(200).json(await getAllPlanets());
}

module.exports = {
	getPlanets,
};

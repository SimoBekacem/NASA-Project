/*
 * we call the fs in order to createReadStrem .
 * we call the path in order to get the path of the file kepler_data.csv.
 * we use the pipe to getting the data through the fs the from the parse.
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo');

const habitablePlanets = (planet) => {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
};

function loadPlanetData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
		)
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (data) => {
				if (habitablePlanets(data)) {
					await upsertPlanet(data);
				}
			})
			.on('error', (error) => {
				console.log(`there is an error witch is :${error}`);
				reject();
			})
			.on('end', async () => {
				const planetsLenght = (await getAllPlanets()).length;
				console.log(
					`now we have ${planetsLenght} planet in the data base.`
				);
				resolve();
			});
	});
}

async function upsertPlanet(planet) {
	try {
		await planets.updateOne(
			{
				kepler_name: planet.kepler_name,
			},
			{
				kepler_name: planet.kepler_name,
			},
			{
				upsert: true,
			}
		);
	} catch (error) {
		console.log(`there is a problem inserting ${planet} in the database.`);
		console.log(`error: ${error}`);
	}
}

async function getAllPlanets() {
	return await planets.find({}, { _id: 0, __v: 0 });
}

module.exports = {
	loadPlanetData,
	getAllPlanets,
};

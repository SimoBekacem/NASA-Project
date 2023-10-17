/*
 * we call the fs in order to createReadStrem .
 * we call the path in order to get the path of the file kepler_data.csv.
 * we use the pipe to getting the data through the fs the from the parse.
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const habitablePlanetsList = [];
const planets = [];

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
			.on('data', (data) => {
				habitablePlanets(data) ? habitablePlanetsList.push(data) : null;
			})
			.on('error', (error) => {
				console.log(`there is an error witch is :${error}`);
				reject();
			})
			.on('end', () => {
				habitablePlanetsList.forEach((planet) => {
					planets.push(planet);
				});
				resolve();
			});
	});
}

module.exports = {
	loadPlanetData,
	planets,
};

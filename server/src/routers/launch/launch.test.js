const request = require('supertest');
const app = require('../../app');

describe('GET /launch', () => {
	// test: should get the responce with the status 200 and content-type json.
	test('should get the responce with the status 200 and content-type json', async () => {
		const response = request(app)
			.get('/launch')
			.expect(200)
			.expect('Content-Type', /json/);
	});
});
describe('POST /launch', () => {
	// test: should post all the attributs wich are launch number , launch data, mission name and the destination .
	// test: should veriffy the format of the date .
});
describe('DELETE /launch', () => {
	// test: we should return the launch deleted withe upcoming: false, success: false,
});

/*launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customer: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};*/

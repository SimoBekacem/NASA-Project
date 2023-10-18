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
	const launch = {
		mission: 'test mission X',
		rocket: 'test rocket',
		launchDate: 'December 27, 2030',
		target: 'Kepler-442 b',
	};
	const launchWithMissingData = {
		mission: 'test mission X',
		launchDate: 'December 27, 2030',
		target: 'Kepler-442 b',
	};
	const launchWithWrongDate = {
		mission: 'test mission X',
		rocket: 'test rocket',
		launchDate: 'hello world',
		target: 'Kepler-442 b',
	};
	// test: should post all the attributs wich are  launchDate, mission, rocket and the target .
	test('should post all the attributs wich are  launchDate, mission, rocket and the target', async () => {
		const response = await request(app)
			.post('/launch')
			.send(launchWithMissingData)
			.expect(400);
		expect(response.body).toEqual({
			error: 'your missing an attribute so make sure the you fill all the fealds',
		});
	});
	// test: should veriffy the format of the date .
	test('should veriffy the format of the date', async () => {
		const response = await request(app)
			.post('/launch')
			.send(launchWithWrongDate)
			.expect(400);
		expect(response.body).toEqual({
			error: 'your date format is not acceptebal',
		});
	});
	// test: should return the object if it posted successfully .
	test('should return the object if it posted successfully', async () => {
		const response = await request(app)
			.post('/launch')
			.send(launch)
			.expect(201)
			.expect('Content-Type', /json/);
		expect(response.body).toMatchObject(launch);
	});
});
describe('DELETE /launch', () => {
	// test: we should return the launch deleted withe upcoming: false, success: false,
});

/**/

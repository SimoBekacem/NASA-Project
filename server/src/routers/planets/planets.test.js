const request = require('supertest');
const app = require('../../app');

describe('GET /planets', () => {
	test('should responce with 200 ok', async () => {
		const responce = await request(app)
			.get('/planets')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

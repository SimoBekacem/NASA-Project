const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('GET /planets', () => {
	beforeAll(() => {
		mongoConnect();
	});
	afterAll(() => {
		mongoDisconnect();
	});
	test('should responce with 200 ok', async () => {
		const responce = await request(app)
			.get('/v1/planets')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

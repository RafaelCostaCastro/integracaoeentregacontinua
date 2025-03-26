// tests/index.test.js
const request = require('supertest');
const app = require('../src/index');

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on http://localhost:3000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

describe('GET /api', () => {
  it('should return Hello world!', async () => {
    const res = await request(server).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello world!');
  });
});

describe('GET /api/test', () => {
  it('should return a test message', async () => {
    const res = await request(server).get('/api/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Endpoint de teste'); // Ajuste conforme necessário
  });
});

/*
describe('GET /api/test', () => {
  it('should return a test message', async () => {
    const res = await request(app).get('/api/test-2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Endpoint de teste 2');
  });
});
*/

jest.setTimeout(30000); 

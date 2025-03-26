// tests/index.test.js
const request = require('supertest');
const app = require('../src/index');

let server;
const port = process.env.TEST_PORT || 3000; // Usar uma variável de ambiente para a porta

beforeAll((done) => {
  server = app.listen(port, () => {
    console.log(`Test server running on http://localhost:${port}`);
    done();
  });
}, 60000); // Aumenta o timeout para 60 segundos

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  console.log('Test server closed');
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
    expect(res.body).toHaveProperty('message', 'Endpoint de teste'); 
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

jest.setTimeout(60000); // Aumenta o timeout global para 60 segundos

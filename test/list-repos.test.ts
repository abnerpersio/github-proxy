import request from 'supertest';

import { server } from '../src/server';
import { handlers } from './handlers/handlers';

describe('List repos', () => {
  beforeAll(() => {
    handlers.listen({ onUnhandledRequest: 'bypass' });
  });

  afterEach(() => {
    handlers.resetHandlers();
  });

  afterAll(() => {
    handlers.close();
  });

  it('should list all user repos', async () => {
    const res = await request(server).get('/api/users/abnerpersio/repos');
    const { body } = res;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toHaveLength(7);

    for (const repo of body.data) {
      expect(repo).toMatchObject({
        id: expect.any(Number),
        node_id: expect.any(String),
        name: expect.any(String),
        full_name: expect.any(String),
        owner: {
          login: 'abnerpersio',
          id: 62842767,
          avatar_url: 'https://avatars.githubusercontent.com/u/62842767?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/abnerpersio',
        },
      });
    }
  });

  it('should list all user repos (empty array)', async () => {
    const res = await request(server).get('/api/users/anotheruser/repos');
    const { body } = res;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toStrictEqual([]);
  });

  it('should return not found for non existing user', async () => {
    const res = await request(server).get('/api/users/invalid-username/repos');
    const { body } = res;

    expect(res.status).toBe(404);
    expect(body).toStrictEqual({
      succes: false,
      message: 'Not Found',
    });
  });
});

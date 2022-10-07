import request from 'supertest';

import { server } from '../src/server';
import { handlers } from './handlers/handlers';

describe('Get user', () => {
  beforeAll(() => {
    handlers.listen({ onUnhandledRequest: 'bypass' });
  });

  afterEach(() => {
    handlers.resetHandlers();
  });

  afterAll(() => {
    handlers.close();
  });

  it('should return user details', async () => {
    const res = await request(server).get('/api/users/abnerpersio/details');
    const { body } = res;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toMatchObject({
      login: 'abnerpersio',
      url: 'https://api.github.com/users/abnerpersio',
      id: 62842767,
      type: 'User',
      site_admin: false,
      name: 'Abner Persio',
      public_repos: 29,
      public_gists: 3,
      followers: 11,
      following: 23,
      created_at: '2020-03-29T14:28:54Z',
      updated_at: '2022-09-09T14:59:50Z',
    });
  });

  it('should return not found for non existing user', async () => {
    const res = await request(server).get('/api/users/invalid-username/details');
    const { body } = res;

    expect(res.status).toBe(404);
    expect(body).toStrictEqual({
      succes: false,
      message: 'Not Found',
    });
  });
});

import request from 'supertest';

import { server } from '../src/server';
import { usersDB } from './fixtures/users';
import { handlers } from './handlers/handlers';

describe('List users', () => {
  beforeAll(() => {
    handlers.listen({ onUnhandledRequest: 'bypass' });
  });

  afterEach(() => {
    handlers.resetHandlers();
  });

  afterAll(() => {
    handlers.close();
  });

  it('should list users with pagination', async () => {
    const res = await request(server).get('/api/users');
    const { body } = res;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);

    const lastUser = body.data[body.data.length - 1];

    expect(body.data).toHaveLength(30);
    expect(body.data[0].id).toBe(usersDB[0].id);
    expect(lastUser.id).toBe(usersDB[29].id);

    expect(body.metadata.results).toBe(30);
    expect(body.metadata.nextPage).toBe(lastUser.id);
    expect(body.metadata.nextPageLink).toMatch(`?since=${String(lastUser.id)}`);
  });

  it('should load users from next page correctly', async () => {
    const firstResponse = await request(server).get('/api/users');

    const nextPage = firstResponse.body.metadata.nextPageLink as string;

    expect(nextPage).toBe('/api/users?since=46');

    const res = await request(server).get(nextPage);
    const { body } = res;

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);

    const lastUser = body.data[body.data.length - 1];

    expect(body.data).toHaveLength(30);
    expect(body.data[0].id).toBe(usersDB[30].id);
    expect(lastUser.id).toBe(usersDB[59].id);

    expect(body.metadata.results).toBe(30);
    expect(body.metadata.nextPage).toBe(lastUser.id);
    expect(body.metadata.nextPageLink).toMatch(`?since=${String(lastUser.id)}`);
  });
});

import request from 'supertest';

import { server } from '../src/server';

describe('Health', () => {
  it.each([['/health'], ['/ping'], ['/']])('should return that everything is ok', async (route) => {
    const res = await request(server).get(route);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      success: true,
      message: 'Everything is OK here!',
    });
  });
});

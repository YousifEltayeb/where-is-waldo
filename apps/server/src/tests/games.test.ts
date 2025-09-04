import { describe, expect, it } from 'vitest';
import gamesRouter from '../routes/gamesRouter';
import request from 'supertest';
import { Game } from '../config/prismaClient';
import { createTestApp, API_VERSION } from './setup';

const app = createTestApp(gamesRouter);

describe('/games', function () {
  it('GET /games should return 200 and an array of Game objects', async () => {
    const response = await request(app)
      .get(API_VERSION + '/games')
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((game: Game) => {
      expect(game).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        link: expect.any(String),
        difficulty: expect.any(String),
        Characters: expect.any(Array),
      });
    });
  });
});

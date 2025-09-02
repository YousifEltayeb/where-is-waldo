import { describe, expect, it } from 'vitest';
import express from 'express';
import gamesRouter from '../routes/gamesRouter';
import request from 'supertest';
const app = express();
const API_VERSION = '/api/v1';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(API_VERSION + '/', gamesRouter);
describe('/games', function () {
  interface Game {
    id: number;
    name: string;
    link: string;
    difficulty: string;
    Characters: Array<object>;
  }
  it('test games router', async () => {
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

import { beforeEach, describe, expect, it } from 'vitest';
import express from 'express';
import roundsRouter from '../routes/roundsRouter';
import request from 'supertest';
const app = express();
const API_VERSION = '/api/v1';
import { prisma } from '../config/prismaClient';
import {
  seedCharacters,
  seedGames,
  seedRoundsAndLeaderboard,
} from '../config/seed';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(API_VERSION + '/', roundsRouter);
describe('/rounds', function () {
  let gameId: number;
  let token: string;
  beforeEach(async () => {
    await seedGames();
    await seedCharacters();
    await seedRoundsAndLeaderboard();
    const game = await prisma.game.findFirstOrThrow();
    gameId = game.id;
  });

  it('POST /rounds should return 200 jwt', async () => {
    const response = await request(app)
      .post(API_VERSION + '/rounds')
      .send(`gameId=${gameId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(String));
    token = response.body;
  });
});

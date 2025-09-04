import { beforeEach, describe, expect, it } from 'vitest';
import '../config/passport.ts';
import leaderboardRouter from '../routes/leaderboardRouter';
import request from 'supertest';
import { prisma, Leaderboard } from '../config/prismaClient';
import jwt from 'jsonwebtoken';
import { createTestApp, API_VERSION } from './setup';
import {
  seedGames,
  seedCharacters,
  seedRoundsAndLeaderboard,
} from '../config/seed';

const app = createTestApp(leaderboardRouter);

describe('/leaderboard', function () {
  let roundId = '';
  let token = '';
  const SECRET = process.env.SECRET;
  interface ExtendedLeaderboard extends Leaderboard {
    Round: object;
  }

  beforeEach(async () => {
    await seedGames();
    await seedCharacters();
    await seedRoundsAndLeaderboard();
    const game = await prisma.game.create({
      data: { name: 'Test Game', link: 'test-game-link' },
    });
    const round = await prisma.round.create({
      data: { gameId: game.id, end: new Date(), hits: [1, 2, 3] },
    });
    roundId = round.id;
    await prisma.leaderboard.create({
      data: { roundId: round.id, seconds: 22 },
    });
    if (!SECRET) throw new Error('Test setup failed: SECRET not set');
    token = jwt.sign({ user: { id: roundId } }, SECRET);
  });

  it('GET /leaderboard should return 200 and an array of objects', async () => {
    const response = await request(app)
      .get(API_VERSION + '/leaderboard')
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((record: ExtendedLeaderboard) => {
      expect(record).toEqual({
        id: expect.any(Number),
        playerName: expect.toBeOneOf([expect.any(String), null]),
        seconds: expect.any(Number),
        Round: expect.any(Object),
      });
      expect(record.Round).toEqual({ Game: { name: expect.any(String) } });
    });
  });
  it('POST /leaderboard should add playerName to the DB', async () => {
    const response = await request(app)
      .post(API_VERSION + '/leaderboard')
      .set('Authorization', `Bearer ${token}`)
      .send('playerName=Flan');

    expect(response.status).toEqual(201);
    const updatedLeaderboard = await prisma.leaderboard.findUnique({
      where: { roundId },
    });
    expect(updatedLeaderboard?.playerName).toBe('Flan');
  });
  it('POST /leaderboard expect error when playerName is not provided', async () => {
    const response = await request(app)
      .post(API_VERSION + '/leaderboard')
      .set('Authorization', `Bearer ${token}`)
      .send('notPlayerName=Flan');

    expect(response.status).toEqual(400);
    const updatedLeaderboard = await prisma.leaderboard.findUnique({
      where: { roundId },
    });
    expect(updatedLeaderboard?.playerName).toBe(null);
  });
  it('POST /leaderboard expect error when no jwt token provided', async () => {
    const response = await request(app)
      .post(API_VERSION + '/leaderboard')
      .send('playerName=Flan');

    expect(response.status).toEqual(401);
    const updatedLeaderboard = await prisma.leaderboard.findUnique({
      where: { roundId },
    });
    expect(updatedLeaderboard?.playerName).toBe(null);
  });
});

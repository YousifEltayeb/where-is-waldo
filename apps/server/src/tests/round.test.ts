import { beforeEach, describe, expect, it } from 'vitest';
import '../config/passport.ts';
import roundsRouter from '../routes/roundsRouter';
import request from 'supertest';
import { prisma, Character } from '../config/prismaClient';
import { createTestApp, API_VERSION } from './setup';

const app = createTestApp(roundsRouter);

describe('/rounds', function () {
  let gameId: number;
  let characters: Array<Character>;
  let token: string;
  beforeEach(async () => {
    const game = await prisma.game.findFirstOrThrow();
    gameId = game.id;
    characters = await prisma.character.findMany({ where: { gameId } });

    const { body } = await request(app)
      .post(API_VERSION + '/rounds')
      .send(`gameId=${gameId}`);
    token = body;
  });

  it('POST /rounds should return 200 jwt', async () => {
    const response = await request(app)
      .post(API_VERSION + '/rounds')
      .send(`gameId=${gameId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(String));
  });
  it('PATCH /rounds with correct chararcter id and coordinates should return 201 and hit cooridnates', async () => {
    const response = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      xStart: expect.any(Number),
      xEnd: expect.any(Number),
      yStart: expect.any(Number),
      yEnd: expect.any(Number),
      roundOver: false,
    });
  });
  it('PATCH /rounds 3 successful hit should return roundOver = true', async () => {
    const firstHit = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    const secondHit = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[1].id}`)
      .send(`xCoordinate=${characters[1].xStart + 1}`)
      .send(`yCoordinate=${characters[1].yStart + 1}`);

    const thirdHit = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[2].id}`)
      .send(`xCoordinate=${characters[2].xStart + 1}`)
      .send(`yCoordinate=${characters[2].yStart + 1}`);

    expect(firstHit.status).toEqual(201);
    expect(firstHit.body.roundOver).toBe(false);
    expect(secondHit.status).toEqual(201);
    expect(secondHit.body.roundOver).toBe(false);
    expect(thirdHit.status).toEqual(201);
    expect(thirdHit.body.roundOver).toBe(true);
  });
  it('PATCH /rounds providing wrong input returns error', async () => {
    const noCharId = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`notCharacterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    const noXCoordinate = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`notXCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    const noYCoordinate = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`notYCoordinate=${characters[0].yStart + 1}`);

    const wrongCoordinates = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${123}`)
      .send(`yCoordinate=${123}`);

    const wrongCharId = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${0}`)
      .send(`xCoordinate=${123}`)
      .send(`yCoordinate=${123}`);

    expect(noCharId.status).toEqual(400);
    expect(noXCoordinate.status).toEqual(400);
    expect(noYCoordinate.status).toEqual(400);
    expect(wrongCharId.status).toEqual(400);
    expect(wrongCoordinates.status).toEqual(422);
  });
  it('PATCH /rounds hitting the same character twice should return error', async () => {
    const firstHit = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    const secondHit = await request(app)
      .patch(API_VERSION + '/rounds')
      .set('Authorization', `Bearer ${token}`)
      .send(`characterId=${characters[0].id}`)
      .send(`xCoordinate=${characters[0].xStart + 1}`)
      .send(`yCoordinate=${characters[0].yStart + 1}`);

    expect(firstHit.status).toEqual(201);
    expect(firstHit.body.roundOver).toBe(false);
    expect(secondHit.status).toEqual(409);
  });
});

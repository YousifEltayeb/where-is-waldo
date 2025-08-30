import { prisma } from '../config/prismaClient';
import { RequestHandler, Response } from 'express';
import passport from 'passport';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const getGames: RequestHandler = async (req, res) => {
  try {
    const gamesData = await prisma.game.findMany({
      include: {
        Characters: {
          select: {
            id: true,
            name: true,
            link: true,
          },
        },
      },
    });
    res.status(200).json(gamesData);
  } catch (error) {
    console.log(error);
  }
};
export const getLeaderboard: RequestHandler = async (req, res) => {
  try {
    // TODO: Write quary for leaderboard
    const leaderboardData = await prisma.round.findMany();
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
  }
};
export const startGame: RequestHandler = async (req, res) => {
  const newRound = await prisma.round.create({
    data: {
      gameId: Number(req.params.gameId),
    },
  });
  console.log(newRound);

  const SECRET = process.env.SECRET;
  if (!SECRET) {
    res.status(50).json({ err: 'SECRET environment variable not set.' });
  } else {
    jwt.sign(
      { user: { id: newRound.id } },
      SECRET,
      { expiresIn: '1d' },
      function (err, token) {
        if (err) {
          res.status(500).json({ err: 'unable to create token' });
        } else {
          res.json(token);
        }
      }
    );
  }
};
const check = async (
  req: {
    user: { id: string };
    body: { characterId: string; xCoordinate: string; yCoordinate: string };
  },
  res: Response
) => {
  const roundId = req.user.id;
  const characterId = Number(req.body.characterId);
  const xCoordinate = Number(req.body.xCoordinate);
  const yCoordinate = Number(req.body.yCoordinate);
  const round = await prisma.round.findUnique({ where: { id: roundId } });
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  if (character && round) {
    if (character?.xStart < xCoordinate && xCoordinate < character?.xEnd) {
      if (character?.yStart < yCoordinate && yCoordinate < character?.yEnd) {
        if (!round.hits.includes(characterId)) {
          await prisma.round.update({
            where: { id: roundId },
            data: {
              hits: {
                push: characterId,
              },
            },
          });
          res.json({
            xStart: character.xStart,
            xEnd: character.xEnd,
            yStart: character.yStart,
            yEnd: character.yEnd,
          });
        }
      }
    }
  }
  res.status(404).json({ error: 'error' });
};
export const checkHit = [
  passport.authenticate('jwt', { session: false }),
  check,
];
export const endGame: RequestHandler = async (req, res) => {
  try {
    // TODO: Write quary for leaderboard
    const leaderboardData = await prisma.round.findMany();
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
  }
};

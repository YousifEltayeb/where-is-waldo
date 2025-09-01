import { prisma } from '../config/prismaClient';
import { NextFunction, RequestHandler, Response } from 'express';
import passport from 'passport';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { CheckHitRequestType, EngGameRequestType } from '../types';
import { createRoundSchema } from '../validation/rounds.schema';
import { z } from 'zod';
const validateCreateRound: RequestHandler = async (req, res, next) => {
  try {
    await createRoundSchema.parseAsync(req);
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    } else res.status(400).json('unxpected error');
  }
};
const createRound: RequestHandler = async (req, res) => {
  try {
    const gameId = Number(req.body.gameId);
    const newRound = await prisma.round.create({
      data: {
        gameId,
      },
    });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unexpected server error' });
  }
};
export const createRoundMiddleware = [validateCreateRound, createRound];
const validateCheckHit = async (
  req: CheckHitRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const roundId = req.user.id;
    const characterId = Number(req.body.characterId);
    const round = await prisma.round.findUnique({ where: { id: roundId } });
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });
    const gameCharacters = await prisma.character.findMany({
      where: { gameId: round?.gameId },
      select: { id: true },
    });
    // check if character is in this game
    const charFound = gameCharacters.find((char) => char.id === characterId);

    if (character && charFound && round) {
      if (!round.hits.includes(characterId)) {
        req.round = round;
        req.character = character;
        next();
      } else throw new Error('character already been hit');
    } else
      throw new Error(
        'character or round not found or character doesnt belong to this game'
      );
  } catch (error) {
    next(error);
  }
};
const checkHit = async (
  req: CheckHitRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const xCoordinate = Number(req.body.xCoordinate);
    const yCoordinate = Number(req.body.yCoordinate);
    const round = req.round;
    const character = req.character;

    if (!round || !character) throw new Error('round or character undefined');

    if (character?.xStart < xCoordinate && xCoordinate < character?.xEnd) {
      if (character?.yStart < yCoordinate && yCoordinate < character?.yEnd) {
        await prisma.round.update({
          where: { id: round.id },
          data: {
            hits: {
              push: character.id,
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
    res.status(404).json({
      error: 'Wrong coordinates',
    });
  } catch (error) {
    next(error);
  }
};
const validateEngGame = async (
  req: EngGameRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const round = await prisma.round.findUnique({ where: { id: req.user.id } });
    if (round) {
      if (round.hits.length === 3) {
        const username = req.body.username;
        const updatedRound = await prisma.round.update({
          where: { id: round.id },
          data: {
            playerName: username,
            end: new Date(),
          },
        });
        if (updatedRound.end) {
          const score =
            (+new Date(updatedRound.end) - +new Date(updatedRound.start)) /
            1000;
          await prisma.leaderboard.create({
            data: {
              seconds: score,
              playerName: username,
              gameId: round.gameId,
              roundId: round.id,
            },
          });
        }
        res.status(201).json({ message: 'game is over' });
      } else throw new Error('game is not over');
    }
  } catch (error) {
    next(error);
  }
};

export const updateRound = [
  passport.authenticate('jwt', { session: false }),
  validateCheckHit,
  checkHit,
  validateEngGame,
];
// export const addPlayerName = (req: AddPlayerNameRequestType,res) => {
//
// }

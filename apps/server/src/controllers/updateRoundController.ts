import { prisma, Round } from '../config/prismaClient';
import { NextFunction, Response } from 'express';
import passport from 'passport';
import { CheckHitRequestType } from '../types';
import { z } from 'zod';
import { CheckHitValidationSchema } from '../validation/zod.schema';

const validateRequestBody = async (
  req: CheckHitRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    await CheckHitValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.issues);
    } else return next(error);
  }
};
const loadGameState = async (
  req: CheckHitRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    // load game state
    const roundId = req.user.id;
    const round = await prisma.round.findUnique({ where: { id: roundId } });
    const characterId = Number(req.body.characterId);
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });
    const gameCharacters = await prisma.character.findMany({
      where: { gameId: round?.gameId },
      select: { id: true },
    });
    // find out if character is in this game
    const charMatchesGameId = gameCharacters.find(
      (char) => char.id === characterId
    );
    // any of them return null return error
    if (!round || !character || !charMatchesGameId) {
      return res.status(400).json({
        message:
          'character or round not found or character doesnt belong to this game',
      });
      // check if character already has been hit
    } else if (round.hits.includes(characterId)) {
      // if it wasn't attach round and character to req
      return res.status(400).json({
        message: 'Character already hit',
      });
    } else {
      req.round = round;
      req.character = character;
      return next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected server error' });
  }
};
const checkHit = async (req: CheckHitRequestType, res: Response) => {
  try {
    const xCoordinate = Number(req.body.xCoordinate);
    const yCoordinate = Number(req.body.yCoordinate);
    const round = req.round;
    const character = req.character;

    if (!round || !character)
      return res.status(400).json({
        message: 'character or round not found',
      });

    if (character?.xStart < xCoordinate && xCoordinate < character?.xEnd) {
      if (character?.yStart < yCoordinate && yCoordinate < character?.yEnd) {
        // if hit is successfull
        // update the round with the data
        const updatedRound = await prisma.round.update({
          where: { id: round.id },
          data: {
            hits: {
              push: character.id,
            },
          },
        });
        // check if this hit ended the game
        if (updatedRound.hits.length === 3) {
          await handleEndGame(updatedRound);
        }
        return res.json({
          xStart: character.xStart,
          xEnd: character.xEnd,
          yStart: character.yStart,
          yEnd: character.yEnd,
          roundOver: updatedRound.hits.length === 3 ? true : false,
        });
      }
    }
    return res.status(404).json({
      error: 'Wrong coordinates',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
};
async function handleEndGame(round: Round) {
  return prisma.$transaction(async (tx) => {
    // add timestamp
    const updatedRound = await tx.round.update({
      where: { id: round.id },
      data: {
        end: new Date(),
      },
    });
    // update leaderboard
    if (updatedRound.end) {
      const score =
        (+new Date(updatedRound.end) - +new Date(updatedRound.start)) / 1000;
      await tx.leaderboard.create({
        data: {
          seconds: score,
          roundId: round.id,
        },
      });
    }
  });
}
export const updateRoundMiddleware = [
  passport.authenticate('jwt', { session: false }),
  validateRequestBody,
  loadGameState,
  checkHit,
];

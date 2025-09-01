import { prisma } from '../config/prismaClient';
import passport from 'passport';
import { Response, RequestHandler } from 'express';
import z from 'zod';
import { UpdatePlayerNameValidationSchema } from '../validation/rounds.schema';
import { UpdatePlayerNameRequestType } from '../types';
export const getLeaderboard: RequestHandler = async (req, res) => {
  try {
    const leaderboardData = await prisma.leaderboard.findMany({
      include: {
        Round: {
          select: { Game: { select: { name: true } } },
        },
      },
    });
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'unxpected server error' });
  }
};

export const validateUpdatePlayerName = async (
  req: UpdatePlayerNameRequestType,
  res: Response
) => {
  try {
    UpdatePlayerNameValidationSchema.parse(req.body);
    const roundId = req.user.id;
    await prisma.leaderboard.update({
      where: { roundId },
      data: {
        playerName: req.body.playerName,
      },
    });
    return res
      .status(201)
      .json({ message: 'player name updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.issues);
    } else return res.status(500).json({ message: 'unxpected server error' });
  }
};
export const updatePlayerName = [
  passport.authenticate('jwt', { session: false }),
  validateUpdatePlayerName,
];

import { prisma } from '../config/prismaClient';
import { RequestHandler } from 'express';
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

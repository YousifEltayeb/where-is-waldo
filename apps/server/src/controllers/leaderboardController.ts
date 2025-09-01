import { prisma } from '../config/prismaClient';
import { RequestHandler } from 'express';
export const getLeaderboard: RequestHandler = async (req, res) => {
  try {
    // TODO: Write quary for leaderboard
    const leaderboardData = await prisma.leaderboard.findMany();
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
  }
};

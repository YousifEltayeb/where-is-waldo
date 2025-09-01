import { prisma } from '../config/prismaClient';
import { RequestHandler } from 'express';

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

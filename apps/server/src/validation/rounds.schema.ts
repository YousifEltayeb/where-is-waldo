import { z } from 'zod';
import { prisma } from '../config/prismaClient';

export const createRoundSchema = z.object({
  body: z.object({
    gameId: z.coerce
      .number()
      .int()
      .positive()
      .refine(
        async (id) => {
          const game = await prisma.game.findUnique({
            where: { id },
          });
          console.log(game);

          return game;
        },
        {
          message: 'Game with the provided ID does not exist.',
        }
      ),
  }),
});

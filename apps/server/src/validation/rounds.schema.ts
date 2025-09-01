import { z } from 'zod';
import { prisma } from '../config/prismaClient';

export const CreateRoundValidationSchema = z.object({
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
});
export const CheckHitValidationSchema = z.object({
  characterId: z.coerce
    .number()
    .int()
    .positive()
    .refine(
      async (id) => {
        const game = await prisma.character.findUnique({
          where: { id },
        });

        return game;
      },
      {
        message: 'Character with the provided ID does not exist.',
      }
    ),
  xCoordinate: z.coerce.number().int().positive(),
  yCoordinate: z.coerce.number().int().positive(),
});

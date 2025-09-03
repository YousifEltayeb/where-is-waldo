import { prisma } from '../config/prismaClient';
import { RequestHandler } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { CreateRoundValidationSchema } from '../validation/rounds.schema';
import { z } from 'zod';

const validateCreateRound: RequestHandler = async (req, res, next) => {
  try {
    await CreateRoundValidationSchema.parseAsync(req.body);
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    } else res.status(400).json('unxpected server error');
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

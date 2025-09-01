import { Request } from 'express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Round, Character } from './generated/prisma';
import { z } from 'zod';
import { CheckHitValidationSchema } from './validation/rounds.schema';
export interface Error {
  statusCode?: number;
  message?: string;
}

export interface CheckHitRequestType extends Request {
  user: { id: string };
  body: z.infer<typeof CheckHitValidationSchema>;
  round?: Round;
  character?: Character;
}

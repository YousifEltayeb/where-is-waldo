import { Request } from 'express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Round, Character } from './generated/prisma';

export interface Error {
  statusCode?: number;
  message?: string;
}
export interface CheckHitRequestType extends Request {
  user: { id: string };
  body: {
    characterId: string;
    xCoordinate: string;
    yCoordinate: string;
  };
  round?: Round;
  character?: Character;
}

export interface EngGameRequestType extends Request {
  user: { id: string };
}
export interface AddPlayerNameRequestType extends Request {
  user: { id: string };
  body: {
    username: string;
  };
}

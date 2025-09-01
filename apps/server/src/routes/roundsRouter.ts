import { Router } from 'express';
import {
  createRoundMiddleware,
  updateRound,
} from '../controllers/roundsController';
const rounds = Router();
rounds.post('/rounds', createRoundMiddleware);
rounds.patch('/rounds', updateRound);

export default rounds;

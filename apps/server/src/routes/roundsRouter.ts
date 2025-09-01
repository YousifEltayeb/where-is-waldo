import { Router } from 'express';
import { updateRoundMiddleware } from '../controllers/updateRoundController';
import { createRoundMiddleware } from '../controllers/createRoundController';
const rounds = Router();
rounds.post('/rounds', createRoundMiddleware);
rounds.patch('/rounds', updateRoundMiddleware);

export default rounds;

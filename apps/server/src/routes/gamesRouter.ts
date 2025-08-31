import { Router } from 'express';
import {
  getGames,
  createRound,
  getLeaderboard,
} from '../controllers/gamesControllers';
const games = Router();
games.get('/', getGames);
games.get('/leaderboard', getLeaderboard);
games.post('/:gameId/rounds', createRound);
games.patch('/rounds', updateRound);

export default games;

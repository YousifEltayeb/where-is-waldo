import { Router } from 'express';
import {
  getGames,
  startGame,
  endGame,
  checkHit,
  getLeaderboard,
} from '../controllers/gamesControllers';
const games = Router();
games.get('/', getGames);
games.get('/leaderboard', getLeaderboard);
games.post('/:gameId/start', startGame);
games.post('/check', checkHit);
games.post('/end', endGame);

export default games;

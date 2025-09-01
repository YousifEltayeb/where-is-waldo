import { Router } from 'express';
import {
  getLeaderboard,
  updatePlayerName,
} from '../controllers/leaderboardController';
const leaderboard = Router();
leaderboard.get('/leaderboard', getLeaderboard);
leaderboard.post('/leaderboard', updatePlayerName);

export default leaderboard;

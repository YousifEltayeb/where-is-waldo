import { Router } from 'express';
import { getGames } from '../controllers/gamesControllers';
const games = Router();
games.get('/games', getGames);

export default games;

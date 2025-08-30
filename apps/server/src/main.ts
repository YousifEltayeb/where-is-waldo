import express from 'express';
import { NextFunction, Request, Response } from 'express';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const API_VERSION = '/api/v1';
import gamesRouter from './routes/gamesRouter.js';
import { Error } from './types.js';
import cors from 'cors';
import 'dotenv/config';
import './config/passport.ts';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(API_VERSION + '/games', gamesRouter);

app.all('/{*splat}', (req, res) => {
  res.status(404).json({ error: "this route doesn't exist" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});

import express from 'express';
import type { Router } from 'express';
import { beforeEach } from 'vitest';
import {
  seedGames,
  seedCharacters,
  seedRoundsAndLeaderboard,
} from '../config/seed';
export const API_VERSION = '/api/v1';

export const createTestApp = (router: Router) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(API_VERSION + '/', router);
  return app;
};

beforeEach(async () => {
  await seedGames();
  await seedCharacters();
  await seedRoundsAndLeaderboard();
});

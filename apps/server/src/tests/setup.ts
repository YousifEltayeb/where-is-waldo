import express from 'express';
import type { Router } from 'express';

export const API_VERSION = '/api/v1';

export const createTestApp = (router: Router) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(API_VERSION + '/', router);
  return app;
};


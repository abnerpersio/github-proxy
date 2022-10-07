import express from 'express';

import { routes } from './routes';

export const server = express();

server.use(routes);

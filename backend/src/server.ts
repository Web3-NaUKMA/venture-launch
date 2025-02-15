import './typeorm/index.typeorm';
import './utils/core/app.config';

import routes from './modules/app/app.routes';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const port = process.env.BACKEND_PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || '',
    cookie: {
      httpOnly: true,
      maxAge: Number(process.env.SESSION_MAX_AGE || 24 * 60 * 60 * 1000),
    },
  }),
);

app.use(
  cors({
    origin: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    credentials: true,
  }),
);

app.use(routes);

app.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});

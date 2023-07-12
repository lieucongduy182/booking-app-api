import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRouter from './routes/auth/router';
import hotelRouter from './routes/hotel/router';
import userRouter from './routes/user/router';
import roomRouter from './routes/room/router';

import { globalErrorHandler } from './controllers/errorController';
import AppError from './utils/appError';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('Connected Database Successfully !'));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

// Error handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`), 404);
});
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

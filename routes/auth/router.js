import express from 'express';
import register from './register/post';
import login from './login/post';
import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router
  .post('/register', catchAsync(register))
  .post('/login', catchAsync(login));

export default router;

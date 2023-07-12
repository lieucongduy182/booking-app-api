import express from 'express';

import getUser from './getUser/get';
import getAllUsers from './getAllUsers/get';
import updateUser from './updateUser/put';
import deleteUser from './deleteUser/delete';
import { verifyAdmin, verifyToken } from '../../middleware/authentication';

import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router.use(verifyToken);

router
  .get('/:id', catchAsync(getUser))
  .put('/:id', catchAsync(updateUser))
  .delete('/:id', catchAsync(deleteUser));

router.get('/', verifyAdmin, catchAsync(getAllUsers));

export default router;

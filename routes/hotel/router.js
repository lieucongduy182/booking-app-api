import express from 'express';

import getAllHotels from './getAllHotels/get';
import getHotel from './getHotel/get';
import createHotel from './createHotel/post';
import updateHotel from './updateHotel/put';
import deleteHotel from './deleteHotel/delete';
import { verifyAdmin } from '../../middleware/authentication';

import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router.get('/', catchAsync(getAllHotels)).get('/:id', catchAsync(getHotel));

router.use(verifyAdmin);
router
  .post('/', catchAsync(createHotel))
  .put('/:id', catchAsync(updateHotel))
  .delete('/:id', catchAsync(deleteHotel));

export default router;

import express from 'express';
import { verifyAdmin } from '../../middleware/authentication';
import getRoom from './getRoom/get.js';
import getRooms from './getRooms/get.js';
import createRoom from './createRoom/post.js';
import updateRoom from './updateRoom/put.js';
import deleteRoom from './deleteRoom/delete.js';

const router = express.Router();

router.get('/', getRooms).get('/:id', getRoom);

router.use(verifyAdmin);
router
  .post('/:id', createRoom)
  .put('/:id', updateRoom)
  .delete('/:id/:hotelId', deleteRoom);

export default router;

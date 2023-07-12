import roomController from '../../../controllers/roomController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { id: roomId, hotelId } = req.params;

  const result = await roomController.deleteRoom({ roomId, hotelId });

  if (!result) {
    return next(new AppError('No room found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Room deleted successfully',
  });
}

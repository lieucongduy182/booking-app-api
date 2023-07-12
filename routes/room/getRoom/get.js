import roomController from '../../../controllers/roomController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { id } = req.params;

  const result = await roomController.getRoom({ roomId: id });

  if (!result) {
    return next(new AppError('No room found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { result },
  });
}

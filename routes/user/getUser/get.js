import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { id } = req.params;

  const result = await userController.getUser({ hotelId: id });

  if (!result) {
    return next(new AppError('No User found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { result },
  });
}

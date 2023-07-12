import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { id } = req.params;
  const data = req.body;

  if (!data) {
    return next(new AppError('No data to update', 400));
  }

  const result = await userController.updateUser({ userId: id, data });

  if (!result) {
    return next(new AppError('No User found with that ID', 404));
  }

  res.status(202).json({
    status: 'success',
    data: { result },
  });
}

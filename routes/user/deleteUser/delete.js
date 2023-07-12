import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { id } = req.params;

  const result = await userController.deleteUser({ userId: id });

  if (!result) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
}

import authController from '../../../controllers/authController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const data = req.body;
  if (!data) {
    return next(new AppError('Please provide data', 400));
  }

  const user = await authController.register({ data });

  if (!user) return null;

  authController.createToken({ user, statusCode: 201, res });
}

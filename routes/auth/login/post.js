import authController from '../../../controllers/authController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide data', 400));
  }

  const user = await authController.login({ data: req.body });

  if (!user) {
    return next(new AppError('Incorrect email or password', 400));
  }

  authController.createToken({ user, statusCode: 200, res });
}

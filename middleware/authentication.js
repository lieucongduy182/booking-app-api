import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';
import AppError from '../utils/appError';

export const verifyToken = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  try {
    const { id: userId } = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET,
    );

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token does not exist.', 404),
      );
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Invalid token.', 401));
  }
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return next(
        new AppError('You are not authorized to perform this action.', 403),
      );
    }
  });
};

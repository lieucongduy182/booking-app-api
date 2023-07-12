import hotelController from '../../../controllers/hotelController';
import AppError from '../../../utils/appError';

export default async function createHotel(req, res, next) {
  const data = req.body;

  if (!data) {
    return next(new AppError('Please provide data', 400));
  }

  const result = await hotelController.createHotel({ data });

  res.status(201).json({
    status: 'success',
    data: { result },
  });
}

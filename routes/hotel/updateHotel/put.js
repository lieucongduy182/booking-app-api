import hotelController from '../../../controllers/hotelController';
import AppError from '../../../utils/appError';

export default async function updateHotel(req, res, next) {
  const { id } = req.params;
  const data = req.body;

  if (!data) {
    return next(new AppError('No data to update', 400));
  }

  const result = await hotelController.updateHotel({ hotelId: id, data });

  if (!result) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(202).json({
    status: 'success',
    data: { result },
  });
}

import hotelController from '../../../controllers/hotelController';
import AppError from '../../../utils/appError';

export default async function deleteHotel(req, res, next) {
  const { id } = req.params;

  const result = await hotelController.deleteHotel({ hotelId: id });

  if (!result) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Hotel deleted successfully',
  });
}

import roomController from '../../../controllers/roomController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const data = req.body;
  const { id: hotelId } = req.params;

  if (!data || !hotelId) {
    return next(new AppError('Please provide data', 400));
  }

  const result = await roomController.createRoom({ data, hotelId });

  res.status(201).json({
    status: 'success',
    data: { result },
  });
}

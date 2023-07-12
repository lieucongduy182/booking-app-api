import hotelController from '../../../controllers/hotelController';

export default async function getAllHotels(req, res, next) {
  const result = await hotelController.getAllHotels();

  res.status(200).json({
    status: 'success',
    data: { result },
  });
}

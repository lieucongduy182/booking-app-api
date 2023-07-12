import roomController from '../../../controllers/roomController';

export default async function (req, res, next) {
  const result = await roomController.getRooms();

  res.status(200).json({
    status: 'success',
    data: { result },
  });
}

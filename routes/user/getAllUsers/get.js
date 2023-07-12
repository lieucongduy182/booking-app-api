import userController from '../../../controllers/userController';

export default async function (req, res, next) {
  const result = await userController.getAllUsers();

  res.status(200).json({
    status: 'success',
    data: { result },
  });
}

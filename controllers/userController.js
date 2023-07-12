import User from '../models/User';

class UserController {
  getAllUsers() {
    return User.find({});
  }

  getUser({ userId }) {
    return User.findById(userId);
  }

  updateUser({ userId, data }) {
    return User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
  }

  deleteUser({ userId }) {
    return User.findByIdAndDelete(userId, {
      strict: true,
    });
  }
}

export default new UserController();

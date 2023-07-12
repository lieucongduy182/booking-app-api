import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  signToken({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  createToken({ user, statusCode, res }) {
    const token = this.signToken({ id: user._id, isAdmin: user.isAdmin });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60,
      ),
      httpOnly: true,
    };

    res.cookie('access_token', token, cookieOptions);

    user.password = undefined;
    user.passwordConfirm = undefined;

    return res.status(statusCode).json({
      status: 'success',
      token,
      data: { user },
    });
  }

  register({ data }) {
    return User.create({
      username: data.username,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      isAdmin: data.isAdmin,
    });
  }

  async login({ data }) {
    const { email, password } = data;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return null;
    }
    const isCorrectPassword = await user.correctPassword({
      candidatePassword: password,
      userPassword: user.password,
    });

    if (!isCorrectPassword) {
      return null;
    }

    return user;
  }
}

export default new AuthController();

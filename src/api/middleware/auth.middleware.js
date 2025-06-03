import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../../utils/apiError.js';
import { JWT_SECRET } from '../../config/jwt.config.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, 'Unauthorized', err));
  }
};

export default authMiddleware;

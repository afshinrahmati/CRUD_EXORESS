import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiError from '../../utils/apiError.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/jwt.config.js';

class AuthService {
    async signup({ username, password, email }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new ApiError(400, 'Username already exists');

        const user = await User.create({ username, password, email });
        return this.generateToken(user);
    }

    async login({ email, password }) {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new ApiError(401, 'Invalid username or password');
        }

        return this.generateToken(user);
    }

    generateToken(user) {
        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { token };
    }
}

export default new AuthService();

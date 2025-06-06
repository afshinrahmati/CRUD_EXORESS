import AuthService from '../services/auth.service.js';
import { validationResult } from 'express-validator';
import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';


class AuthController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }
    console.log(req.body);
    
      const user = await AuthService.signup(req.body);
      res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const token = await AuthService.login(req.body);
      res.status(200).json(new ApiResponse(200, { token }, 'Login successful'));
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();

import jwt from 'jsonwebtoken';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return sendError(res, 401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { role: 'admin', email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    sendSuccess(res, 200, 'Login successful', { token });
  } catch (error) {
    next(error);
  }
};

export const verifySession = async (req, res, next) => {
  try {
    sendSuccess(res, 200, 'Session valid', { email: req.admin.email });
  } catch (error) {
    next(error);
  }
};
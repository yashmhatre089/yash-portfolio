import { sendError } from '../utils/responseHandler.js';

export const globalErrorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';
  
  sendError(res, statusCode, message, process.env.NODE_ENV === 'development' ? err.stack : null);
};
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';
import { globalErrorHandler } from './src/middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://yash-portfolio-e19wwb8zw-yashmhtre089.vercel.app',
        'https://yash-portfolio-psi-lac.vercel.app',
        'https://yash-portfolio-git-main-yashmhtre089.vercel.app',
        'https://yash-portfolio-yashmhtre089.vercel.app'
    ],
    credentials: true
}));
// Rate Limiting to prevent brute force attacks on CMS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Elite Portfolio Backend Active' });
});

// API Routes
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
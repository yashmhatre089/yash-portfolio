import express from 'express';
import authRoutes from './auth.routes.js';
import contentRoutes from './content.routes.js';
import uploadRoutes from './upload.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/upload', uploadRoutes);

export default router;
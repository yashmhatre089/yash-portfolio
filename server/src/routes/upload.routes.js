import express from 'express';
import { uploadMedia, deleteMedia } from '../controllers/upload.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/', requireAuth, upload.single('file'), uploadMedia);
router.delete('/', requireAuth, deleteMedia);

export default router;
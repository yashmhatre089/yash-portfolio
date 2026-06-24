import express from 'express';
import { getSection, getAllSections, updateSection } from '../controllers/content.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllSections);
router.get('/:name', getSection);

// Protected CMS routes
router.put('/:name', requireAuth, updateSection);

export default router;
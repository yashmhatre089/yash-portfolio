import express from 'express';
import { login, verifySession } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', requireAuth, verifySession);

export default router;
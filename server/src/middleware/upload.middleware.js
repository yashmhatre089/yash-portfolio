import multer from 'multer';

// Use memory storage to buffer files before pushing to Supabase Storage
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});
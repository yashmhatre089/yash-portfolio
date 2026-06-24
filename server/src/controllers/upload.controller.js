import { supabase } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

const BUCKET_NAME = 'portfolio-media';

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 400, 'No file uploaded');

    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    sendSuccess(res, 200, 'File uploaded successfully', {
      url: publicUrlData.publicUrl,
      path: filePath,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { path } = req.body;
    
    if (!path) return sendError(res, 400, 'File path is required');

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
    
    if (error) throw error;

    sendSuccess(res, 200, 'File deleted successfully');
  } catch (error) {
    next(error);
  }
};
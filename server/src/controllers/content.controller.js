import { supabase } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// Table name in Supabase
const TABLE_NAME = 'sections';

export const getSection = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('content')
      .eq('name', name)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'not found'
    
    sendSuccess(res, 200, `Fetched ${name} successfully`, data ? data.content : null);
  } catch (error) {
    next(error);
  }
};

export const getAllSections = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('name, content');
    if (error) throw error;

    // Transform array into a keyed object for the frontend
    const sectionsObj = data.reduce((acc, curr) => {
      acc[curr.name] = curr.content;
      return acc;
    }, {});

    sendSuccess(res, 200, 'Fetched all sections', sectionsObj);
  } catch (error) {
    next(error);
  }
};

export const updateSection = async (req, res, next) => {
  try {
    const { name } = req.params;
    const content = req.body;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert({ name, content, updated_at: new Date().toISOString() }, { onConflict: 'name' })
      .select();

    if (error) throw error;

    sendSuccess(res, 200, `Section ${name} updated successfully`, data[0].content);
  } catch (error) {
    next(error);
  }
};
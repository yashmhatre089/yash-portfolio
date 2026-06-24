const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Helper to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred with the API request');
  }
  return data;
};

// Helper to get auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Public Routes
  getAllContent: async () => {
    const response = await fetch(`${API_URL}/content`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  getSection: async (sectionName) => {
    const response = await fetch(`${API_URL}/content/${sectionName}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  // Secure Admin Routes
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  verifySession: async () => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });
    return handleResponse(response);
  },

  updateSection: async (sectionName, content) => {
    const response = await fetch(`${API_URL}/content/${sectionName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(content),
    });
    return handleResponse(response);
  },

  uploadMedia: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });
    return handleResponse(response);
  },

  deleteMedia: async (path) => {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ path }),
    });
    return handleResponse(response);
  }
};
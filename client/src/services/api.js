import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const experienceAPI = {
  getAll: () => api.get('/experience'),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

export const educationAPI = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`),
};

export const achievementsAPI = {
  getAll: () => api.get('/achievements'),
  create: (data) => api.post('/achievements', data),
  update: (id, data) => api.put(`/achievements/${id}`, data),
  delete: (id) => api.delete(`/achievements/${id}`),
};

export const socialLinksAPI = {
  getPublic: () => api.get('/social-links'),
  getAllAdmin: () => api.get('/social-links/all'),
  create: (data) => api.post('/social-links', data),
  update: (id, data) => api.put(`/social-links/${id}`, data),
  delete: (id) => api.delete(`/social-links/${id}`),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}`, status),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
};

export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
};

export const uploadAPI = {
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;

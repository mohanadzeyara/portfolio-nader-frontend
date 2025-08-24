import React from "react";
const API = import.meta.env.VITE_API_URL;

async function request(path, { method = 'GET', token, body, isForm } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}

export const api = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  getProfile: () => request('/profile'),
  updateProfile: (token, data) => request('/profile', { method: 'PUT', token, body: data }),

  getFields: () => request('/fields'),
  updateFields: (token, data) => request('/fields', { method: 'PUT', token, body: data }),

  getPosts: () => request('/posts'),
  createPost: (token, data) => request('/posts', { method: 'POST', token, body: data }),
  updatePost: (token, id, data) => request(`/posts/${id}`, { method: 'PUT', token, body: data }),
  deletePost: (token, id) => request(`/posts/${id}`, { method: 'DELETE', token }),

  getSections: () => request('/sections'),
  createSection: (token, data) => request('/sections', { method: 'POST', token, body: data }),
  updateSection: (token, id, data) => request(`/sections/${id}`, { method: 'PUT', token, body: data }),
  deleteSection: (token, id) => request(`/sections/${id}`, { method: 'DELETE', token }),

  uploadPDF: (token, file) => {
    const fd = new FormData();
    fd.append('pdf', file);
    return request('/upload/pdf', { method: 'POST', token, body: fd, isForm: true });
  },
  uploadPhoto: (token, file) => {
    const fd = new FormData();
    fd.append('photo', file);
    return request('/upload/photo', { method: 'POST', token, body: fd, isForm: true });
  }
};

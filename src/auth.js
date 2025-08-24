export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase();
export const storage = {
  setToken: (t) => localStorage.setItem('token', t),
  getToken: () => localStorage.getItem('token'),
  clear: () => localStorage.removeItem('token')
};

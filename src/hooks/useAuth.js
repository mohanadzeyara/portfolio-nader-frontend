import { useEffect, useState } from 'react';
import { storage } from '../auth';

export function useAuth() {
  const [token, setToken] = useState(storage.getToken());
  useEffect(() => {
    const onStorage = () => setToken(storage.getToken());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return { token, setToken: (t) => { storage.setToken(t); setToken(t); }, logout: () => { storage.clear(); setToken(null); } };
}

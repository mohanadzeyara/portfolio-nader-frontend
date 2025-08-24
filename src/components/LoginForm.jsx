import React from "react";
import { useState } from 'react';
import { api } from '../api';
import { ADMIN_EMAIL } from '../auth';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setError('Only the designated admin email can sign in.');
      return;
    }
    try {
      const res = await api.login(email, password);
      onLogin(res.token);
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={submit} className="card" style={{ maxWidth: 420 }}>
      <h3>Admin Sign In</h3>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ADMIN_EMAIL} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      <div className="row">
        <button className="btn primary" type="submit">Sign In</button>
        {error && <span className="small" style={{ color: 'crimson' }}>{error}</span>}
      </div>
    </form>
  );
}

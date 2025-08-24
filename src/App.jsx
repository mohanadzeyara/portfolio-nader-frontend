import React from "react";
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm.jsx';
import AdminToolbar from './components/AdminToolbar.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import PostsSection from './components/PostsSection.jsx';
import FieldsSection from './components/FieldsSection.jsx';
import CustomSections from './components/CustomSections.jsx';
import FileUploads from './components/FileUploads.jsx';

export default function App() {
  const { token, setToken, logout } = useAuth();
  const [ready, setReady] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    setReady(true);
    // Show admin login if URL hash is #admin
    if (window.location.hash === "#admin") setShowAdmin(true);
  }, []);

  return (
    <div>
      <header>
        <div className="container row" style={{ justifyContent: 'space-between' }}>
          <h1 style={{ margin: 0 }}>Nader Zeyara</h1>
          <nav className="row">
            {token && <a href="#edit">Edit</a>}
          </nav>
        </div>
      </header>

      <main className="container grid">
        {token && <AdminToolbar onLogout={logout} />}

        <ProfileSection token={token} />
        <FieldsSection token={token} />
        <PostsSection token={token} />
        <CustomSections token={token} />
        {token && <FileUploads token={token} />}

        {!token && showAdmin && (
          <section id="admin">
            <LoginForm onLogin={setToken} />
          </section>
        )}
      </main>

      <footer>
        <div className="container row" style={{ justifyContent: 'space-between' }}>
          <span>© {new Date().getFullYear()} Nader Zeyara</span>
          <span className="small">Built with React + Vite</span>
        </div>
      </footer>
    </div>
  );
}

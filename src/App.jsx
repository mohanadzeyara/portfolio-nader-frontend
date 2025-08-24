import React, { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm.jsx";
import AdminToolbar from "./components/AdminToolbar.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import PostsSection from "./components/PostsSection.jsx";
import FieldsSection from "./components/FieldsSection.jsx";
import CustomSections from "./components/CustomSections.jsx";
import FileUploads from "./components/FileUploads.jsx";
import ContactSection from "./components/ContactSection.jsx";
import './styles.css';

export default function App() {
  const { token, setToken, logout } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#admin") setShowAdmin(true);
  }, []);

  return (
    <div>
      <header>
        <div className="container row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Nader Zeyara</h1>
          <nav className="row">
            <a href="#about">About</a>
            <a href="#posts">Posts</a>
            <a href="#fields">Skills & Awards</a>
            <a href="#sections">Custom Sections</a>
            <a href="#contact">Contact</a>
            {token && <a href="#edit">Edit</a>}
          </nav>
        </div>
      </header>

      <main className="container grid">
        {token && <AdminToolbar onLogout={logout} />}

        <section id="about">
          <ProfileSection token={token} />
        </section>

        <section id="posts">
          <PostsSection token={token} />
        </section>

        <section id="fields">
          <FieldsSection token={token} />
        </section>

        <section id="sections">
          <CustomSections token={token} />
        </section>

        <section id="contact">
          <ContactSection token={token} />
        </section>

        {token && <FileUploads token={token} />}

        {!token && showAdmin && (
          <section id="admin">
            <LoginForm onLogin={setToken} />
          </section>
        )}
      </main>

      <footer>
        <div className="container row" style={{ justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} Nader Zeyara</span>
        </div>
      </footer>
    </div>
  );
}

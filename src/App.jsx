import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function Navbar({ token }) {
  return (
    <header>
      <div className="container row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Nader Zeyara</h1>
        <nav className="row">
          <Link to="/">About</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/fields">Skills & Awards</Link>
          <Link to="/sections">Custom Sections</Link>
          <Link to="/contact">Contact</Link>
          {token && <Link to="/edit">Edit</Link>}
          {!token && <Link to="/admin">Admin</Link>}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const { token, logout } = useAuth();

  return (
    <Router>
      <Navbar token={token} />

      {token && <AdminToolbar onLogout={logout} />}

      <main className="container grid">
        <Routes>
          <Route path="/" element={<ProfileSection token={token} />} />
          <Route path="/posts" element={<PostsSection token={token} />} />
          <Route path="/fields" element={<FieldsSection token={token} />} />
          <Route path="/sections" element={<CustomSections token={token} />} />
          <Route path="/contact" element={<ContactSection token={token} />} />
          <Route path="/edit" element={token ? <FileUploads token={token} /> : <LoginForm />} />
          <Route path="/admin" element={!token ? <LoginForm onLogin={() => window.location.reload()} /> : <FileUploads token={token} />} />
        </Routes>
      </main>

      <footer>
        <div className="container row" style={{ justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} Nader Zeyara</span>
        </div>
      </footer>
    </Router>
  );
}

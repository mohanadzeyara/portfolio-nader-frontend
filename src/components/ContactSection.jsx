import React from "react";
import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function ContactSection({ token }) {
  const [contact, setContact] = useState({ email: "", phone: "", linkedin: "", github: "", website: "", location: "", whatsapp: "", telegram: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isAdmin = Boolean(token);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getContacts();
        setContact({ ...contact, ...(data || {}) });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    try {
      const updated = await api.updateContacts(token, contact);
      setContact(updated);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <section id="contact"><div className="card"><p>Loading contact info…</p></div></section>;

  const items = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    contact.linkedin && { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
    contact.github && { label: "GitHub", value: contact.github, href: contact.github },
    contact.website && { label: "Website", value: contact.website, href: contact.website },
    contact.location && { label: "Location", value: contact.location },
    contact.whatsapp && { label: "WhatsApp", value: contact.whatsapp, href: contact.whatsapp },
    contact.telegram && { label: "Telegram", value: contact.telegram, href: contact.telegram },
  ].filter(Boolean);

  return (
    <section id="contact">
      <h2>Contact</h2>
      <div className="grid two">
        <div className="card">
          {items.length ? (
            <ul className="list">
              {items.map((it, i) => (
                <li key={i}>
                  <strong>{it.label}:</strong>{" "}
                  {it.href ? <a href={it.href} target="_blank" rel="noreferrer">{it.value}</a> : <span>{it.value}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No contact details published yet.</p>
          )}
        </div>
        <div className="card">
          {isAdmin ? (
            <form onSubmit={save} className="form">
              <div className="grid two">
                <label>Email<input type="email" value={contact.email || ''} onChange={e => setContact({ ...contact, email: e.target.value })} /></label>
                <label>Phone<input value={contact.phone || ''} onChange={e => setContact({ ...contact, phone: e.target.value })} /></label>
                <label>LinkedIn<input value={contact.linkedin || ''} onChange={e => setContact({ ...contact, linkedin: e.target.value })} /></label>
                <label>GitHub<input value={contact.github || ''} onChange={e => setContact({ ...contact, github: e.target.value })} /></label>
                <label>Website<input value={contact.website || ''} onChange={e => setContact({ ...contact, website: e.target.value })} /></label>
                <label>Location<input value={contact.location || ''} onChange={e => setContact({ ...contact, location: e.target.value })} /></label>
                <label>WhatsApp<input value={contact.whatsapp || ''} onChange={e => setContact({ ...contact, whatsapp: e.target.value })} /></label>
                <label>Telegram<input value={contact.telegram || ''} onChange={e => setContact({ ...contact, telegram: e.target.value })} /></label>
              </div>
              <div className="row">
                <button className="btn primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
              </div>
            </form>
          ) : (
            <p className="muted">Admin can edit contact details after signing in.</p>
          )}
        </div>
      </div>
    </section>
  );
}

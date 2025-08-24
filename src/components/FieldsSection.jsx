import React from "react";
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function FieldsSection({ token }) {
  const [fields, setFields] = useState(null);
  const [skills, setSkills] = useState('');
  const [awards, setAwards] = useState('');
  const [languages, setLanguages] = useState('');

  async function load() {
    const f = await api.getFields();
    setFields(f);
    setSkills(f.skills.join(', '));
    setAwards(f.awards.join(', '));
    setLanguages(f.languages.join(', '));
  }
  useEffect(() => { load(); }, []);

  async function save() {
    const body = {
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      awards: awards.split(',').map(s => s.trim()).filter(Boolean),
      languages: languages.split(',').map(s => s.trim()).filter(Boolean),
    };
    const res = await api.updateFields(token, body);
    setFields(res);
  }

  if (!fields) return <div className="card">Loading fields…</div>;

  return (
    <section className="card">
      <h2>Skills, Awards, Languages</h2>
      <div className="row">
        <div style={{ flex: 1 }}>
          <h4>Skills</h4>
          <div>{fields.skills.map((s, i) => <span key={i} className="badge">{s}</span>)}</div>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Awards</h4>
          <ul className="list">{fields.awards.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Languages</h4>
          <div>{fields.languages.map((s, i) => <span key={i} className="badge">{s}</span>)}</div>
        </div>
      </div>

      {token && (
        <div className="grid">
          <hr />
          <label>Skills (comma-separated)</label>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} />
          <label>Awards (comma-separated)</label>
          <input value={awards} onChange={(e) => setAwards(e.target.value)} />
          <label>Languages (comma-separated)</label>
          <input value={languages} onChange={(e) => setLanguages(e.target.value)} />
          <button className="btn primary" onClick={save}>Save</button>
        </div>
      )}
    </section>
  );
}

import React from "react";
import { useEffect, useState } from 'react';
import { api } from '../api';

export default function CustomSections({ token }) {
  const [sections, setSections] = useState([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  async function load() { setSections(await api.getSections()); }
  useEffect(() => { load(); }, []);

  async function add() {
    const res = await api.createSection(token, { name, body });
    setSections([...sections, res]);
    setName(''); setBody('');
  }
  async function update(s) {
    const name = prompt('Rename section', s.name) ?? s.name;
    const body = prompt('Edit body (markdown/plain)', s.body) ?? s.body;
    const res = await api.updateSection(token, s._id, { name, body });
    setSections(sections.map(x => x._id === s._id ? res : x));
  }
  async function remove(id) {
    await api.deleteSection(token, id);
    setSections(sections.filter(s => s._id !== id));
  }

  return (
    <section className="card">
      <h2>Custom Sections</h2>
      {token && (
        <div className="grid">
          <input placeholder="Section name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea rows="3" placeholder="Section body" value={body} onChange={(e) => setBody(e.target.value)} />
          <button className="btn primary" onClick={add} disabled={!name}>Add Section</button>
          <hr />
        </div>
      )}
      {!sections.length && <div className="small">No custom sections yet.</div>}
      <div className="grid">
        {sections.map(s => (
          <div key={s._id} className="card">
            <h3>{s.name}</h3>
            <p>{s.body}</p>
            {token && (
              <div className="row">
                <button className="btn" onClick={() => update(s)}>Edit</button>
                <button className="btn" onClick={() => remove(s._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

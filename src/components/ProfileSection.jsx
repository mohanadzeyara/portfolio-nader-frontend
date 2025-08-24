import { useEffect, useState } from 'react';
import { api } from '../api';

export default function ProfileSection({ token }) {
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => { (async () => setProfile(await api.getProfile()))(); }, []);

  const editing = !!token;

  async function save() {
    const res = await api.updateProfile(token, draft);
    setProfile(res);
    setDraft(null);
  }

  if (!profile) return <div className="card">Loading profile…</div>;

  const p = draft || profile;

  return (
    <section className="card">
      <h2>Profile</h2>
      <div className="row">
        {p.photoUrl ? <img src={p.photoUrl} alt="Profile" style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover' }} /> : <div className="small">No photo uploaded</div>}
      </div>
      <h3>{p.name}</h3>
      <p className="small">{p.title}</p>

      <h4>Work Experience</h4>
      <ul className="list">
        {p.workExperience.map((w, i) => (
          <li key={i}><strong>{w.role}</strong>, {w.place} {w.start || w.end ? `(${w.start || ''}${w.start && w.end ? '–' : ''}${w.end || ''})` : ''} — {w.note}</li>
        ))}
      </ul>

      <h4>Education</h4>
      <ul className="list">
        {p.education.map((e, i) => (
          <li key={i}>
            <strong>{e.degree}</strong> in {e.field} — {e.institution} {e.year ? `(${e.year})` : ''}
            {e.note ? ` — ${e.note}` : ''}
            {e.fileUrl ? (<span> — <a href={e.fileUrl} target="_blank">PDF</a></span>) : null}
          </li>
        ))}
      </ul>

      {editing && (
        <div>
          <hr />
          {!draft && <button className="btn" onClick={() => setDraft(JSON.parse(JSON.stringify(profile)))}>Edit Profile</button>}
          {draft && (
            <div className="grid">
              <label>Name</label>
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              <label>Title</label>
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />

              <details>
                <summary>Edit Work Experience</summary>
                {draft.workExperience.map((w, i) => (
                  <div key={i} className="card">
                    <div className="row">
                      <input placeholder="Role" value={w.role || ''} onChange={(e) => (draft.workExperience[i].role = e.target.value, setDraft({ ...draft }))} />
                      <input placeholder="Place" value={w.place || ''} onChange={(e) => (draft.workExperience[i].place = e.target.value, setDraft({ ...draft }))} />
                    </div>
                    <div className="row">
                      <input placeholder="Start" value={w.start || ''} onChange={(e) => (draft.workExperience[i].start = e.target.value, setDraft({ ...draft }))} />
                      <input placeholder="End" value={w.end || ''} onChange={(e) => (draft.workExperience[i].end = e.target.value, setDraft({ ...draft }))} />
                    </div>
                    <input placeholder="Note" value={w.note || ''} onChange={(e) => (draft.workExperience[i].note = e.target.value, setDraft({ ...draft }))} />
                  </div>
                ))}
                <button className="btn" onClick={() => (draft.workExperience.push({ role:'', place:'', start:'', end:'', note:'' }), setDraft({ ...draft }))}>Add Experience</button>
              </details>

              <details>
                <summary>Edit Education</summary>
                {draft.education.map((ed, i) => (
                  <div key={i} className="card">
                    <div className="row">
                      <input placeholder="Degree" value={ed.degree || ''} onChange={(e) => (draft.education[i].degree = e.target.value, setDraft({ ...draft }))} />
                      <input placeholder="Field" value={ed.field || ''} onChange={(e) => (draft.education[i].field = e.target.value, setDraft({ ...draft }))} />
                    </div>
                    <div className="row">
                      <input placeholder="Institution" value={ed.institution || ''} onChange={(e) => (draft.education[i].institution = e.target.value, setDraft({ ...draft }))} />
                      <input placeholder="Year" value={ed.year || ''} onChange={(e) => (draft.education[i].year = e.target.value, setDraft({ ...draft }))} />
                    </div>
                    <input placeholder="Note" value={ed.note || ''} onChange={(e) => (draft.education[i].note = e.target.value, setDraft({ ...draft }))} />
                    <input placeholder="PDF URL (optional)" value={ed.fileUrl || ''} onChange={(e) => (draft.education[i].fileUrl = e.target.value, setDraft({ ...draft }))} />
                  </div>
                ))}
                <button className="btn" onClick={() => (draft.education.push({ degree:'', field:'', institution:'', year:'', note:'', fileUrl:'' }), setDraft({ ...draft }))}>Add Education</button>
              </details>

              <div className="row">
                <button className="btn primary" onClick={save}>Save</button>
                <button className="btn" onClick={() => setDraft(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

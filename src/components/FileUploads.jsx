import { useState } from 'react';
import { api } from '../api';

export default function FileUploads({ token }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  async function uploadPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await api.uploadPhoto(token, file);
    setPhotoUrl(res.url);
    alert('Photo uploaded. URL copied to clipboard: ' + res.url);
    try { await navigator.clipboard.writeText(res.url); } catch {}
  }

  async function uploadPDF(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await api.uploadPDF(token, file);
    setPdfUrl(res.url);
    alert('PDF uploaded. URL copied to clipboard: ' + res.url);
    try { await navigator.clipboard.writeText(res.url); } catch {}
  }

  return (
    <section className="card">
      <h2>Uploads</h2>
      <div className="grid">
        <div className="row">
          <input type="file" accept="image/*" onChange={uploadPhoto} />
          {photoUrl && <a href={photoUrl} target="_blank">View Photo</a>}
        </div>
        <div className="row">
          <input type="file" accept="application/pdf" onChange={uploadPDF} />
          {pdfUrl && <a href={pdfUrl} target="_blank">View PDF</a>}
        </div>
        <p className="small">Tip: paste the returned URLs into the Profile → Education items or set as Profile photoUrl.</p>
      </div>
    </section>
  );
}

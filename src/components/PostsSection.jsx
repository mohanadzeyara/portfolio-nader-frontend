import { useEffect, useState } from 'react';
import { api } from '../api';

export default function PostsSection({ token }) {
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState({ title: '', content: '' });

  async function load() {
    setPosts(await api.getPosts());
  }
  useEffect(() => { load(); }, []);

  async function create() {
    const res = await api.createPost(token, draft);
    setDraft({ title: '', content: '' });
    setPosts([res, ...posts]);
  }
  async function update(id, data) {
    const res = await api.updatePost(token, id, data);
    setPosts(posts.map(p => p._id === id ? res : p));
  }
  async function remove(id) {
    await api.deletePost(token, id);
    setPosts(posts.filter(p => p._id !== id));
  }

  return (
    <section className="card">
      <h2>Posts</h2>
      {token && (
        <div className="grid">
          <input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <textarea rows="3" placeholder="Content" value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
          <button className="btn primary" onClick={create} disabled={!draft.title || !draft.content}>Add Post</button>
          <hr />
        </div>
      )}
      {!posts.length && <div className="small">No posts yet.</div>}
      <div className="grid">
        {posts.map(p => (
          <article key={p._id} className="card">
            <h3>{p.title}</h3>
            <p>{p.content}</p>
            <div className="small">{new Date(p.createdAt).toLocaleString()}</div>
            {token && (
              <div className="row">
                <button className="btn" onClick={() => {
                  const title = prompt('Edit title', p.title) ?? p.title;
                  const content = prompt('Edit content', p.content) ?? p.content;
                  update(p._id, { title, content });
                }}>Edit</button>
                <button className="btn" onClick={() => remove(p._id)}>Delete</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

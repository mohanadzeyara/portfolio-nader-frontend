export default function AdminToolbar({ onLogout }) {
  return (
    <div className="card row" style={{ justifyContent: 'space-between' }}>
      <strong>Admin Edit Mode</strong>
      <button className="btn" onClick={onLogout}>Log out</button>
    </div>
  );
}

# Frontend – Nader Portfolio (React + Vite)

## Setup
```bash
cd frontend
npm install
cp .env.example .env
# If backend runs elsewhere, update VITE_API_URL in .env
npm run dev
```

## Deploy to Vercel
- Create a new Vercel project pointing at `frontend/`.
- Set Environment Variable `VITE_API_URL` to your Render backend URL (e.g., `https://your-api.onrender.com/api`).
- Build command: `npm install && npm run build`
- Output directory: `dist`


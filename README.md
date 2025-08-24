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


How this works

Admin login hidden by default.

Only appears when you go to:

https://your-portfolio/#admin


Fetch calls use /api automatically from .env → backend 404 errors are fixed.

Admin toolbar, file uploads, and editing sections are only visible when you log in.

https://your-portfolio/#admin
Email: drnaderadmin@zeyara.ad
Password: hN7$gPz9vQ2@tRbX
# 🍼 Stork Helpers — Frontend

## 🌐 Frontend



Frontend частина застосунку Stork Helpers, побудована на Next.js (App Router).
Призначена для майбутніх мам: трекінг тижнів, щоденник, завдання, персоналізовані поради.

🛠️ Tech Stack

Next.js 16 (App Router)

TypeScript

React

CSS Modules / SCSS

Axios

Zustand

JWT Auth (via proxy API)

📁 Project Structure
app/
 ├─ api/                 # Next route handlers (proxy, auth)
 ├─ diary/               # Diary pages
 ├─ journey/             # Pregnancy weeks
 ├─ profile/             # Profile & settings
 ├─ components/          # Reusable UI components
 ├─ layout.tsx           # App layout
 └─ page.tsx             # Home (Dashboard)

services/
 ├─ client/              # Axios (client-side)
 ├─ server/              # Fetch (server-side)
 └─ api.ts               # Axios instance

store/                   # Zustand stores
types/                   # TypeScript types
hooks/                   # Custom hooks
🔐 Authentication Flow

Client → /api/proxy/*

Next.js Route Handler

Backend API

Cookies (httpOnly)

Refresh handled automatically

🌐 Proxy API

Всі API-запити проходять через:

/api/proxy/*

Це дозволяє:

уникнути CORS

безпечно працювати з cookies

розділити client / server API

⚙️ Environment Variables

.env.local:

API_URL=http://localhost:4000
🚀 Getting Started
npm install
npm run dev

Frontend буде доступний:

http://localhost:3000
🧠 Architecture Rules

❌ axios у Server Components

✅ fetch у server services

✅ axios у client services

❌ shared services для server + client

✨ Author

Stork Helpers Team 🕊️

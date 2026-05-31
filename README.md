# Cairo Babysitter App | تطبيق مربيات القاهرة

A full-stack babysitter management application for the Cairo area, built with Node.js/Express (backend) and React + Vite (frontend).

## Quick Start

### 1. Install all dependencies

```bash
# From the root /home/user/diagrams directory:
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Run both servers (development)

```bash
npm run dev
```

This uses `concurrently` to start:
- **Backend** on http://localhost:3001
- **Frontend** on http://localhost:5173

Or run them separately:

```bash
npm run dev:backend   # starts Node/Express API
npm run dev:frontend  # starts Vite dev server
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/babysitters` | List all babysitters |
| GET | `/api/babysitters/:id` | Get babysitter profile |
| GET | `/api/search?q=&area=&minRating=&package=` | Search & filter |
| GET | `/api/packages` | List all packages |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/admin/customers` | Admin: list customers (requires header `x-admin-key: admin123`) |
| GET | `/api/health` | Health check |

### Booking request body (POST /api/bookings)
```json
{
  "babysitterId": "1",
  "packageId": "daily",
  "parentName": "Ahmed El-Masry",
  "parentPhone": "+20 100 123 4567",
  "parentEmail": "ahmed@example.com",
  "date": "2025-06-15"
}
```

---

## Packages

| Package | Price | Duration |
|---------|-------|----------|
| Daily — الباقة اليومية | 150 EGP | Up to 8 hours |
| Weekly — الباقة الأسبوعية | 800 EGP | 5 days/week |
| Monthly — الباقة الشهرية | 2,500 EGP | Full month |

---

## Cairo Neighborhoods Covered

Maadi · Zamalek · Heliopolis · New Cairo · Nasr City · Dokki · Mohandessin · 6th of October

---

## Admin Access

Navigate to `/admin` in the frontend and enter password: **admin123**

Or via API:
```bash
curl http://localhost:3001/api/admin/customers -H "x-admin-key: admin123"
```

---

## Project Structure

```
/diagrams
├── package.json          # root — concurrently scripts
├── backend/
│   ├── package.json
│   └── server.js         # Express API, in-memory data
└── frontend/
    ├── package.json
    ├── vite.config.js    # proxy /api → localhost:3001
    ├── index.html
    └── src/
        ├── App.jsx
        ├── App.css
        ├── main.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Avatar.jsx
        │   ├── Stars.jsx
        │   ├── BabysitterCard.jsx
        │   └── BookingModal.jsx
        └── pages/
            ├── HomePage.jsx
            ├── BabysittersPage.jsx
            ├── SearchPage.jsx
            ├── BabysitterProfile.jsx
            ├── BookingModal.jsx
            └── AdminPage.jsx
```

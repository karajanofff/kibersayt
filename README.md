# CyberEdu — Kiberqáwipsizlik kursı platforması

Qaraqalpaq tilindegi kiberqáwipsizlik oquw platforması. Bitta repository, bitta Render web service.

## Papka strukturasi

```
cyberedu/
├── client/          # React + Vite + Tailwind frontend
├── server/          # Node.js + Express API
│   ├── data/        # JSON demo maǵlıwmatlar
│   ├── client-dist/ # Production frontend build (gitignore)
│   └── src/
├── package.json     # Root scriptlar
├── render.yaml      # Render deploy
├── Dockerfile       # Docker deploy
├── .env.example
├── .gitignore
└── README.md
```

## Talaplar

- Node.js 18+

## Environment variables

| O‘zgaruvchi | Tavsif | Default |
|------------|--------|---------|
| `PORT` | Server porti | `5000` |
| `NODE_ENV` | `development` / `production` | `development` |
| `JWT_SECRET` | JWT kaliti (productionda ózgertiń) | dev secret |
| `CORS_ORIGIN` | Ruxsat etilgen originlar (vergul bilan) | `http://localhost:5173` |
| `VITE_API_URL` | Frontend API bazası (devda bo‘sh qoldiring) | `''` |

`.env.example` dan nusxa olib `.env` yarating:

```bash
cp .env.example .env
```

## Local ishga tushirish

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:5000  

## Production build

```bash
npm run build
npm start
```

Bitta server `server/client-dist` papkasından frontendni static qilib serve qiladi.

## Admin login (demo)

| Maydan | Qiymat |
|--------|--------|
| Email | `admin@cyberedu.local` |
| Parol | `admin123` |

Student demo: `aqiljan@student.local` / `student123`

## API endpoints

| Method | Path |
|--------|------|
| GET | `/api/health` |
| GET | `/api/modules` |
| GET | `/api/modules/:id` |
| GET | `/api/lessons/:id` |
| GET | `/api/labs` |
| GET | `/api/tests` |
| POST | `/api/tests/submit` |
| GET | `/api/ctf` |
| POST | `/api/ctf/check` |
| GET | `/api/resources` |
| POST | `/api/auth/login` |
| GET | `/api/progress` |
| POST | `/api/progress/update` |

## GitHub’ga push qilish

```bash
git init
git add .
git commit -m "Initial commit: CyberEdu platform"
git branch -M main
git remote add origin https://github.com/USERNAME/cyberedu.git
git push -u origin main
```

`USERNAME` orniga óz GitHub paydalanıwshı atıńızdı qoyıń.

## Render.com’ga deploy

1. GitHub repozitoriyani Render’ge ulang.
2. **New → Blueprint** yamasa **Web Service** — `render.yaml` avtomatik o‘qiladi.
3. Yoki Docker: `Dockerfile` ishlatiladi, bitta web service.
4. Environment: `NODE_ENV=production`, `JWT_SECRET` (Generate), `CORS_ORIGIN` = Render URL.
5. Deploy — bitta service, start: Docker CMD yoki `npm run build && npm start`.

Render’da alohida frontend service kerek emas — backend build qilingan `client-dist` ni serve qiladi.

### Render (Docker bo‘lmasa)

- Build Command: `npm run install:all && npm run build`
- Start Command: `npm start`

## Xavfsizlik eslatmalari

- CTF flaglar faqat serverda (`server/data/ctf.json`) saqlanadi.
- Platforma faqat qonuniy oquw simulyatsiyası.
- Productionda `JWT_SECRET` ni almashtiring.

## Litsenziya

Oquw maqsadidagi demo loyiha.

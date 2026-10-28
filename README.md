# PatrickStar Spam OTP

Multi-platform OTP sender berbasis web dengan 40+ endpoint.

## Fitur

- 🎨 **Comic dark theme UI** — responsive mobile & desktop
- 📱 **Auto-normalize** — format nomor otomatis (`08xxx`, `+62xxx`, `8xxx` → `628xxx`)
- ⚡ **Real proxy** — request keluar dari Vercel serverless (bypass CORS)
- 📊 **Live stats** — SUCCESS / RATE LIMIT / BAD REQUEST / ERROR
- 🎯 **40+ Endpoints** — BYU, Skul, Internet Rakyat, Matahari, Indodax, Paper.id, Tri, dll
- 🔑 **API Key** — `Patrick` (header `X-API-KEY`)

## Deploy (Vercel)

1. Push isi folder ini ke root repo GitHub
2. Connect repo ke Vercel
3. Deploy → buka domain `.vercel.app`

## Struktur

```
├── api/
│   └── spam.js          # Serverless proxy (semua endpoint)
├── css/style.css
├── js/
│   ├── app.js
│   └── endpoints.js
├── index.html           # Dashboard
├── docs.html            # REST API docs
└── vercel.json
```

## Cara Pakai

1. Buka web di browser
2. Masukkan nomor telepon (maks 5)
3. Klik **Request OTP**
4. Lihat hasil di Console Log + stats

## API

```
POST /api/spam
Header: X-API-KEY: Patrick
Body: { "phone": "08xxxxxxxxxx" }
```

## Tech Stack

- Vercel Serverless (Node.js)
- Vanilla HTML / CSS / JS
- Comic theme (Bangers + Comic Neue)
- Concurrent request pool

## Catatan

Tidak semua endpoint 100% valid. Banyak layanan pakai captcha / token / rate-limit.  
Yang longgar biasanya: BYU, Skul, Internet Rakyat, Tri, Payfazz, Bonus Belanja, dll.

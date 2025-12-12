# Email Assistant — Frontend

A small React frontend app (Vite) for an AI Email Reply Assistant. Paste or type an email thread, choose a tone, and generate a suggested reply powered by a backend API.

**Tech stack:**

### Frontend Framework
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Styling & UI
![CSS](https://img.shields.io/badge/Vanilla%20CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Development Tools
![SWC](https://img.shields.io/badge/SWC-FBB040?style=for-the-badge&logo=swc&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


## Quickstart

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file (optional) to configure the API base URL:

```
VITE_API_BASE_URL=http://localhost:8080/api/email
```

If `VITE_API_BASE_URL` is not set, the frontend uses `/api/email` and the local dev server proxies requests to `http://localhost:8080` (see `vite.config.js`).

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173/ in your browser. The app will proxy API requests to the backend.

## Build & Preview

```bash
npm run build
npm run preview
```

Use `npm run build:dev` to build using the development mode.

## Scripts

- `npm run dev` — start development server (hot reload)
- `npm run build` — produce production build
- `npm run build:dev` — production build using development mode
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint

## Environment / Backend

The frontend expects an Email Assistant API that exposes endpoints under `/api/email`. See `doc/API_DOCUMENTATION.md` for the full API reference (health check, generate-reply, replies list, etc.). During development the Vite server proxies `/api` to `http://localhost:8080` by default (see `vite.config.js`).

If you run the backend on a different host or port, set `VITE_API_BASE_URL` in `.env` to the full base URL (for example `https://api.example.com/api/email`).

## Project structure (important files)

- `index.html` — app root
- `src/main.jsx` — app entry
- `src/App.jsx` — root component
- `src/components/EmailAssistant.jsx` — main feature UI (form, preview)
- `src/components/EmailForm.jsx` — input form for email & tone
- `src/components/ReplyPreview.jsx` — suggested reply editor + copy
- `src/api/emailApi.js` — client helpers for backend endpoints
- `src/*.css` — styles
- `vite.config.js` — dev server + proxy configuration
- `doc/API_DOCUMENTATION.md` — API docs & examples

## Notes

- This repository focuses on the frontend only. The backend must be running and reachable for generate-reply functionality.
- The UI supports three tones: `professional`, `friendly`, and `concise`.

## Contributing

- Fork and open a pull request. Keep changes small and focused.
- Run `npm run lint` before committing.

## License

This repository does not include a license file. Add one if you plan to reuse or publish the code.

---

If you'd like, I can also:
- strip comments from documentation files (markdown),
- add a simple dev backend mock for local testing, or
- add a short README section explaining how the API requests are proxied and how to configure CORS on the backend.

Which of those would you like next?


# CareerSage Frontend

A frontend-only, backend-ready implementation of the finalized CareerSage UI.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Backend handoff

All demo content is centralized in:

`src/data.js`

Replace `APP_DATA` with API response data (or map API responses into the same shape). This keeps the visual components independent from backend data.

The frontend already includes functional flows for:
- Landing
- Login / personalization
- Resume upload + file selection
- Resume analysis loading
- Analysis complete
- Career dashboard
- Detailed resume analysis
- Interview preparation
- Technical question categories
- Company-wise question bank
- Mock tests
- Topic-wise preparation entry
- Progress view with graph
- Practice interview
- Profile

The displayed values are intentionally generic demo data, not tied to the original user's identity.

## Suggested API mapping

- `POST /auth/login` → `user`
- `POST /resume/upload` → uploaded resume metadata
- `GET /resume/analysis` → `resume`
- `GET /dashboard` → `dashboard`
- `GET /interview/preparation` → `preparation`
- `GET /interview/session` → `interview`
- `POST /interview/answer` → interview answer/feedback
- `GET /progress` → preparation progress

## Design

Palette:
- `#FFC570`
- `#EFD2B0`
- `#547792`
- `#1A3263`

No background images are required. The UI uses color-only shapes, glass surfaces, and the CareerSage leaf mark.

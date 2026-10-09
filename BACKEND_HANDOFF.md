# CareerSage frontend — backend handoff

This build is a frontend demo with generic sample career/resume data. UI theme, page layouts, and sample content are intentionally kept separate from backend integration.

## Current demo behavior
- Landing, login, create-account, upload, analysis, dashboard, resume analysis, interview preparation, technical questions, company-wise questions, mock tests, progress, interview practice, and profile views are included.
- Demo account records are stored in browser `localStorage` under `cs-accounts`; the active demo user is stored as `cs-user`.
- **Do not use this localStorage password approach for production.** Replace registration/login logic with backend authentication endpoints; hash passwords on the server and use secure sessions or appropriately configured tokens.
- Resume selection, file type/size checks, basket animation, and simulated analysis progress are frontend-only. No resume is uploaded to a server in this demo.
- Resume icon in the app header reopens the upload flow. Connect it to a resume upload API and re-run analysis after a new resume is received.
- `src/data.js` centralizes generic sample dashboard/resume/interview data. Replace it with API response data while retaining the object shapes or update the UI mapping.

## Suggested API contract (for integration planning)
- `POST /api/auth/register`: `{ username, email, phone, password }`
- `POST /api/auth/login`: `{ identifier, password }` where identifier is email or phone
- `POST /api/resumes`: multipart upload of PDF/DOC/DOCX; return resume id and analysis status
- `GET /api/resumes/:id/analysis`: resume score, skills, keywords, role matches, suggestions
- `GET /api/dashboard`: personalized summary and preparation information
- `GET /api/interview/questions?category=&company=&difficulty=`
- `POST /api/interview/sessions/:id/answers`
- `GET /api/progress`

These are proposed integration endpoints, not currently implemented server routes.

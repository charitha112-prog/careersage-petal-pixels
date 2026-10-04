# CareerSage Backend Handoff

The frontend is intentionally organized so backend integration is easy.

## One place to replace demo data
Edit `src/data.js`.

The `APP_DATA` object contains demo data matching the finalized UI. Replace it with fetched API data or create a small adapter that maps your API responses to the same object shape.

## Important
Do not redesign components to add backend values. The UI already has slots for:
- resume score / ATS score
- skill categories
- role matches
- insights
- keyword matches
- technical question categories
- company-wise question counts
- mock tests
- progress graph
- interview questions
- interview progress

## File upload
The resume upload control is a real browser file input and drag/drop area. The selected file is currently kept in component state. Replace the `Analyze Resume` handler in `ResumeUpload` with your multipart upload call.

## Loading
The analyzing screen currently simulates progress so the frontend can be demoed independently. Replace that timer with the real upload/analysis request state when the backend is ready.

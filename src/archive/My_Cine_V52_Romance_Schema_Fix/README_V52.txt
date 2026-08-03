MY CINÉ V52 — ROMANCE SCHEMA FIX

Root cause:
- Comedy and Romcom batch files use `badge`.
- Romance batch file used `role`.
- App.jsx called editorial.badge.split(), causing every Romance title to fail.

Fix:
- Romance batches standardized to `badge`.
- App.jsx accepts `badge` or `role`.
- Explicit slot numbers added to Romance batches.
- Romcom and Comedy logic unchanged.

Replace:
src/App.jsx
src/data/romanceBatches.js

Or replace the complete src folder from this ZIP.

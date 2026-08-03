# V38 Repeat Lock Fix

Root cause:
The recommendation builder threw an error whenever the recent-arrival hero pool
was empty. This prevented the existing modern-Canon and any-Canon hero fallbacks
from running after the first batch.

Fixes:
- Empty recent hero pool is now valid.
- Hero selection continues through 2026, 2025, 2024, modern Canon, any Canon.
- Start Fresh and Keep Exploring reject even one repeated title.
- Every successful response must contain exactly seven unique IDs.
- Recommendation history is versioned for a clean V38 test.

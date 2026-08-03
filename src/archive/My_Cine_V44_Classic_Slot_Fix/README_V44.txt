MY CINÉ V44 — Classic Slot Fix

Root cause:
The strict composer selected Crowd Favorite before Classic Choice.
With a US hero and a US Crowd Favorite, the maximum-two-per-country rule
blocked every remaining US classic, producing:
"No strict Romcom candidate available for classic-choice."

Fix:
Classic Choice is now selected first, reserving the one Classic slot before
other roles consume the country cap.

Also versions the Romcom ledger/history/enrichment cache for a clean test.
Only src/App.jsx needs replacement.

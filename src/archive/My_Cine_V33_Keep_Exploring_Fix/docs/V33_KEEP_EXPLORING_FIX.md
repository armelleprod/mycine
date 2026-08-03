# V33 Keep Exploring Fix

- Batch number is now calculated before each request.
- The exact requested batch is passed into buildPicks.
- Keep Exploring sends a stable snapshot of all previously shown IDs.
- Overlapping requests are blocked while loading.
- A fully duplicated response is rejected.
- The button becomes Exploration Complete at 7/7.

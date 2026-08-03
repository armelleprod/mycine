# V39 Romcom Rotation Fix

- Introduces deterministic session rotation through the My Ciné Romcom Database.
- Each successful batch advances the rotation by seven positions.
- Start Fresh stays in the same session but requests the next rotation.
- Keep Exploring also requests the next rotation.
- Strict Rule-of-Seven composition retries with a simpler unused-title recovery set.
- Loading is shown clearly while the current batch remains visible.
- New-search sessions reset the rotation; refresh buttons do not.

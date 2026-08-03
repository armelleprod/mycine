# My Ciné V46 — Prebuilt Romcom Editorial Batches

Romcom no longer uses the live role solver.

## Live flow

1. Read the requested prepared batch from `src/data/romcomBatches.js`.
2. Resolve the seven exact title/year pairs through TMDB.
3. Enrich those titles with live posters, ratings, details, trailers and providers.
4. Display the prepared role badge on each poster.
5. Start Fresh and Keep Exploring advance to the next batch.

## Role badges

- 🍿 Tonight's Pick
- ❤️ Crowd Favorite
- 🎞️ Classic
- 🌍 Passport
- 💎 Discovery
- 🏆 Critics
- ✨ Surprise

The first seven batches are used by the current 1/7 through 7/7 interface. Fifteen batches are included for later expansion.

# MY CINÉ 🎬
*The Art of Choosing Tonight's Movie*
by [Armelle Cloche](https://www.armelle.com/screenplays)

## Deploy to Netlify

### Option A — Drag & Drop (easiest)
1. Run `npm install && npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Option B — GitHub + Netlify (auto-deploy)
1. Push this folder to a GitHub repo
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option C — Netlify CLI
```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

## Local Development
```bash
npm install
npm run dev
```

## Architecture
- TMDB seed data pre-fetched and embedded (real poster_paths)
- Claude API curates picks and writes "Why Watch" blurbs  
- One pipeline: Seed → Claude → Display
- Posters: `https://image.tmdb.org/t/p/w500/${poster_path}` via `<img>` tag

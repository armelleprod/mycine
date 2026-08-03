MY CINÉ V61 • HORROR
TEST AND PUBLISH FROM VISUAL STUDIO CODE

PROJECT FOLDER
C:\Users\ac\Dropbox\MY CINE App\mycine-netlify\mycine

A. INSTALL V61
1. Close the running local preview if one is open.
2. Make a backup copy of your current mycine folder.
3. Extract this ZIP.
4. Copy the extracted src folder into your existing mycine project folder.
5. Choose Replace the files in the destination when Windows asks.

Files installed:
- src\App.jsx
- src\data\horrorBatches.js

The previous genre batch files remain in your existing project and are not replaced.

B. OPEN THE CORRECT PROJECT IN VISUAL STUDIO CODE
Open this folder, not the dist folder:
C:\Users\ac\Dropbox\MY CINE App\mycine-netlify\mycine

C. TEST LOCALLY
In Visual Studio Code, open Terminal > New Terminal.
Paste these commands one line at a time:

cd "C:\Users\ac\Dropbox\MY CINE App\mycine-netlify\mycine"
npm install
npm run dev

Open the Local address shown by Vite, normally:
http://localhost:5173

D. HORROR TEST PROMPT
Use these exact selections inside MY CINÉ:

Genre: Horror
Format: Movie
Viewer: Cinephile
Era: Any era
Mood: Mind blown

Then click:
SHOW ME 7 GREAT PICKS

Confirm all of the following:
1. Exactly 7 films appear: 1 Tonight's Pick and 6 alternatives.
2. All 7 titles are Horror selections.
3. Posters load.
4. Clicking Not tonight? gives a new prepared Horror set.
5. No title repeats within the same set.
6. The set counter stops after 7 sets.
7. The finale appears after the seventh set.
8. Romcom, Comedy, Romance, Drama, Thriller, Mystery and Action & Adventure still work.

SECOND HORROR TEST
Genre: Horror
Format: Movie
Viewer: Casual
Era: Classic
Mood: Make me think

Click SHOW ME 7 GREAT PICKS and confirm the page still returns exactly 7 Horror films without an error.

E. PRODUCTION BUILD TEST
Stop the local server with Ctrl+C, then paste:

npm run build
npm run preview

Open the Preview address shown by Vite, normally:
http://localhost:4173

Repeat the Horror test once in Preview mode.

F. POST LIVE TO NETLIFY
After the local and Preview tests pass, stop Preview with Ctrl+C.

If this project is connected to GitHub and Netlify deploys from GitHub, paste:

git status
git add src/App.jsx src/data/horrorBatches.js
git commit -m "Release MY CINE V61 Horror"
git push

Netlify should deploy automatically.

If you normally deploy the dist folder manually, run:

npm run build

Then upload the newly generated dist folder to the existing MY CINÉ Netlify site.

G. FINAL LIVE CHECK
Open the public MY CINÉ URL in a private/incognito window.
Select Horror and confirm:
- exactly 7 recommendations
- posters display
- Not tonight? changes the set
- the seventh-set finale works
- no Claude API error appears

VERSION
MY CINÉ V61 • Horror
320-title Horror database
20 prepared Horror batches
140 prepared Horror selections

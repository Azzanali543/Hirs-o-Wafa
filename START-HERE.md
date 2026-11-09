# Run Hirs o Wafa locally

Install Node.js 22.12 or newer. Extract this ZIP, open the Hirs-o-Wafa folder in VS Code, and open its terminal.

Windows PowerShell:
```powershell
npm.cmd install
npm.cmd run dev
```
Open the local URL printed in the terminal.

Build for hosting:
```powershell
npm.cmd run build
```
Vercel: framework Vite, build command npm run build, output directory dist.

## Customize
- src/data.js: text, team, characters, YouTube links (youtubeUrl, ostUrl, teaserUrl).
- src/PalaceSections.jsx: locations, media, synopsis, script interface, workflow, logo intro.
- src/scriptScenes.js: Urdu script content (never translated).
- src/palace.css: navbar size, maroon quote theme and new section styles.
- src/resumes.js and public/resumes: static downloadable résumé images.
- public/images/studio-logo.webp: production logo.

Media links are placeholders until you add official YouTube URLs. Script contains scene descriptions and key dialogue from the production manual, not a full verbatim screenplay.
This download uses Vite 7 and React plugin 5 to avoid the earlier Tailwind/Vite peer dependency conflict.

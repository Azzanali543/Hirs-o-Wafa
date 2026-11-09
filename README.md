# Hirs o Wafa
React + GSAP ScrollTrigger + Tailwind CSS. Vite builds the static site.

## Run
`pnpm install` then `pnpm dev`. Production: `pnpm build`.

## Customize
All English/Urdu copy, six member profiles, character descriptions, and the YouTube link live in `src/data.js`. Replace `config.youtubeUrl` with your real video URL; until then clicking the thumbnail opens an honest placeholder dialog. Group name, roles, roll numbers, reviews, universities, experience, and emails are clearly labeled sample content. Replace them before public release. The team résumé page is at `/#resumes`; choose a member and use Print résumé to print/save PDF. English is the default each visit. The header switch translates both pages and sets RTL for Urdu.

Imagery in public/images comes from the supplied drama assets. GSAP adds staggered entry animation, section reveals, image parallax, and scroll progress. Reduced-motion preferences are respected. Fonts load from Google Fonts with local serif/sans fallback.

## Static résumé images
The six résumé documents are static PNG files in `public/resumes/`. They never translate when changing the site language. Replace these files with your own images, or update the `image` and `downloadName` fields in `src/resumes.js`. Keep the extension in downloadName aligned with your image format. The Download résumé link downloads the original same-origin image. No uploads, database, or translation is applied to the image.

## Mystique Studio additions
- `src/PalaceSections.jsx`: locations gallery/lightbox, logo introduction, OST, teaser, synopsis, Urdu script reader, production timeline.
- `src/palace.css`: styles and mobile/reduced-motion layouts for these sections.
- `src/scriptScenes.js`: Urdu transcription of the 14 scene descriptions and key dialogues from the lab manual (pp. 17–21). This is not an invented expanded screenplay. All script UI remains Urdu in both language modes.
- `src/useCinematicScroll.js`: scroll-scrubbed, pinned galleries, image reveals, OST artwork and production timeline animations.
- `public/images/studio-logo.webp`: the supplied logo prepared with a transparent background; swap this file to replace branding.
- Set `config.ostUrl` and `config.teaserUrl` in `src/data.js` to the official YouTube URLs. Empty values show Coming soon without opening a fake video.
- Set `config.youtubeUrl` for the full drama.

The logo introduction runs once per document load, is skippable, and is omitted when reduced motion is requested. It never gates content on media playback or remote APIs. Existing résumé images remain static and downloadable.

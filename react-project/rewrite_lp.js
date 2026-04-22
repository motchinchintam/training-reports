const fs = require('fs');
const path = require('path');
const cssPath = path.join(__dirname, 'training-report', 'src', 'App.css');

const content = fs.readFileSync(cssPath, 'utf8');
const lines = content.split('\n');

// Find boundaries
let lpStart = -1, lpEnd = -1, heroStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('LANDING PAGE') && lpStart === -1) lpStart = i - 1; // include comment line before
  if (lines[i].includes('EXPENSE TRACKER') && lpEnd === -1) lpEnd = i - 1;
  if (lines[i].includes('Hero two-column layout') && heroStart === -1) heroStart = i - 1;
}

console.log(`LP section: lines ${lpStart+1}–${lpEnd+1}`);
console.log(`Old hero section starts at: ${heroStart+1}`);

// New LP CSS replacing both the old section AND the bottom additions
const NEW_LP_CSS = `/* ═══════════════════════════════════════════════════════════════════════════
   LANDING PAGE  (lp-)  —  Split portrait layout
═══════════════════════════════════════════════════════════════════════════ */

/* Root fills remaining viewport height below topnav */
.lp-root {
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - 52px);
}

/* ── Hero split ── */
.lp-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 480px;
}

/* Left cream panel */
.lp-panel-left {
  background: #EDE8D3;
  padding: 4rem 4rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  /* Diagonal right edge */
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
}

/* Right dark panel */
.lp-panel-right {
  background: #111D0E;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

/* Photo fills the right panel */
.lp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  /* Blend white-bg photos into dark panel */
  mix-blend-mode: luminosity;
  filter: contrast(1.05);
}

/* "Hi, I am" greeting */
.lp-greeting {
  font-size: 1.1rem;
  font-weight: 500;
  color: #5C7A3C;
  margin-bottom: .5rem;
  letter-spacing: .01em;
}

/* Big name */
.lp-name {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  color: #1A2E17;
  line-height: 1;
  letter-spacing: -.03em;
  margin: 0 0 .6rem;
}

/* Role subtitle */
.lp-role {
  font-size: 14px;
  color: #5A6B50;
  font-weight: 500;
  margin-bottom: 2rem;
  letter-spacing: .01em;
}

/* Social icon buttons */
.lp-socials { display: flex; gap: 10px; margin-bottom: 2.5rem; }
.lp-social-btn {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 900; font-family: inherit;
  text-decoration: none; border: 2px solid; transition: all .15s;
}
.lp-social-fb  { color: #1877F2; border-color: #1877F2; background: rgba(24,119,242,0.07); }
.lp-social-fb:hover  { background: #1877F2; color: #fff; }
.lp-social-ig  { color: #D62976; border-color: #D62976; background: rgba(214,41,118,0.07); }
.lp-social-ig:hover  { background: #D62976; color: #fff; }
.lp-social-zalo { color: #0068FF; border-color: #0068FF; background: rgba(0,104,255,0.07); }
.lp-social-zalo:hover { background: #0068FF; color: #fff; }

/* Books + news mini row */
.lp-extras-mini { display: flex; gap: 2rem; flex-wrap: wrap; }
.lp-extras-section { flex: 1; min-width: 130px; }
.lp-extras-label {
  font-size: 10px; font-weight: 800; color: #7A9B5A;
  text-transform: uppercase; letter-spacing: .08em; margin-bottom: 7px;
}
.lp-book-chip {
  display: inline-block;
  font-size: 12px; font-weight: 600; color: #2D5228;
  background: rgba(92,122,60,0.1); border: 1px solid rgba(92,122,60,0.2);
  border-radius: 6px; padding: 3px 9px; margin: 0 4px 5px 0;
}
.lp-news-link {
  text-decoration: none; color: #2D5228; transition: background .12s;
}
.lp-news-link:hover { background: rgba(92,122,60,0.22); }

/* ── Hub preview bar at bottom ── */
.lp-hub-bar {
  background: #111D0E;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid rgba(237,232,211,0.06);
}
.lp-hub-bar-label {
  font-size: 10px; font-weight: 800; color: rgba(237,232,211,0.35);
  text-transform: uppercase; letter-spacing: .1em; flex-shrink: 0;
}
.lp-hub-bar-cards {
  display: flex; gap: 6px; overflow-x: auto; flex: 1;
  scrollbar-width: none;
}
.lp-hub-bar-cards::-webkit-scrollbar { display: none; }
.lp-hub-bar-card {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 14px; border-radius: 10px; flex-shrink: 0;
  border: 1px solid rgba(237,232,211,0.1);
  background: rgba(237,232,211,0.04);
  color: rgba(237,232,211,0.65);
  cursor: pointer; font-family: inherit; transition: all .15s;
}
.lp-hub-bar-card:hover {
  background: rgba(237,232,211,0.1);
  border-color: var(--hub-accent, rgba(237,232,211,0.3));
  color: #EDE8D3;
}
.lp-hub-bar-icon { font-size: 1.2rem; }
.lp-hub-bar-name { font-size: 13px; font-weight: 700; line-height: 1.2; }
.lp-hub-bar-sub  { font-size: 10px; color: rgba(237,232,211,0.35); margin-top: 1px; }

@media (max-width: 700px) {
  .lp-split { grid-template-columns: 1fr; }
  .lp-panel-left { clip-path: none; padding: 2.5rem 1.5rem 2rem; }
  .lp-panel-right { min-height: 260px; }
  .lp-hub-bar { padding: .75rem 1rem; flex-direction: column; align-items: flex-start; gap: .5rem; }
  .lp-hub-bar-label { display: none; }
}

`;

// Build new file:
// 1. Lines before LP section
// 2. New LP CSS
// 3. Lines from EXPENSE TRACKER to before the old bottom hero section
// 4. Nothing from heroStart onwards (we drop the old bottom lp- additions)
const before   = lines.slice(0, lpStart).join('\n');
const middle   = lines.slice(lpEnd, heroStart).join('\n');  // expense tracker → bottom hero
const output   = before + '\n' + NEW_LP_CSS + middle;

fs.writeFileSync(cssPath, output, 'utf8');
const finalLines = output.split('\n').length;
console.log(`Done. Final CSS: ${finalLines} lines.`);

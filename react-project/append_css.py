import pathlib

CSS_PATH = pathlib.Path(r"c:\Users\ABC\Desktop\training-report\training-reports\react-project\training-report\src\App.css")

NEW_CSS = """

/* ═══════════════════════════════════════════════════════════════════════════
   APP V2 — TOP NAVBAR LAYOUT
═══════════════════════════════════════════════════════════════════════════ */
.app-v2 { display: flex; flex-direction: column; min-height: 100svh; }

.topnav {
  position: sticky; top: 0; z-index: 100;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.topnav-inner {
  display: flex; align-items: center; gap: 8px;
  padding: 0 1rem; height: 52px;
  max-width: 1280px; margin: 0 auto; width: 100%;
}
.topnav-brand {
  display: flex; align-items: center; gap: 8px;
  background: none; border: none; cursor: pointer;
  padding: 6px 10px 6px 4px; border-radius: 8px;
  flex-shrink: 0; transition: background .15s;
}
.topnav-brand:hover { background: var(--bg); }
.topnav-brand-icon { font-size: 1.1rem; color: var(--v-blue); }
.topnav-brand-name { font-size: 15px; font-weight: 800; color: var(--tx); white-space: nowrap; }

.topnav-hubs {
  display: flex; align-items: center; gap: 2px; flex: 1;
  overflow-x: auto; scrollbar-width: none;
}
.topnav-hubs::-webkit-scrollbar { display: none; }
.topnav-hub {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px;
  border: none; background: none; cursor: pointer;
  font-size: 13px; font-weight: 600; color: var(--tx2);
  white-space: nowrap; transition: background .15s, color .15s;
  font-family: inherit;
}
.topnav-hub:hover { background: var(--bg); color: var(--tx); }
.topnav-hub-icon { font-size: 1rem; }

.hub-active-blue   { background: #EFF6FF !important; color: var(--v-blue)   !important; }
.hub-active-purple { background: #F5F3FF !important; color: var(--v-purple) !important; }
.hub-active-teal   { background: #F0FDFA !important; color: var(--v-teal)   !important; }
.hub-active-amber  { background: #FFFBEB !important; color: var(--v-amber)  !important; }
.hub-active-coral  { background: #FFF5F2 !important; color: var(--v-coral)  !important; }

@media (prefers-color-scheme: dark) {
  .hub-active-blue   { background: #1e3a5f !important; }
  .hub-active-purple { background: #2e1c5e !important; }
  .hub-active-teal   { background: #0f3630 !important; }
  .hub-active-amber  { background: #4a2e08 !important; }
  .hub-active-coral  { background: #4a1a0c !important; }
}

.topnav-hamburger {
  display: none; background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--tx); padding: 6px; border-radius: 6px;
  margin-left: auto; font-family: inherit;
}
.topnav-mobile-menu {
  background: var(--surface); border-top: 1px solid var(--border); padding: 8px;
}
.mobile-menu-item {
  display: block; width: 100%; text-align: left;
  padding: 10px 12px; border-radius: 8px; border: none; background: none;
  font-size: 14px; font-weight: 600; color: var(--tx); cursor: pointer; font-family: inherit;
}
.mobile-menu-item:hover { background: var(--bg); }
.mobile-menu-group { margin-top: 4px; }
.mobile-menu-hub {
  display: block; width: 100%; text-align: left;
  padding: 9px 12px; border-radius: 8px; border: none; background: none;
  font-size: 13px; font-weight: 700; color: var(--tx2); cursor: pointer; font-family: inherit;
}
.mobile-menu-hub:hover, .mobile-menu-hub.active { background: var(--bg); color: var(--tx); }
.mobile-menu-tool {
  display: block; width: 100%; text-align: left;
  padding: 7px 12px 7px 28px; border-radius: 8px; border: none; background: none;
  font-size: 13px; color: var(--tx2); cursor: pointer; font-family: inherit;
}
.mobile-menu-tool:hover { background: var(--bg); }
.mobile-menu-tool.active { color: var(--v-blue); font-weight: 600; }

.subnav { border-top: 1px solid var(--border); background: var(--bg); }
.subnav-inner {
  display: flex; gap: 2px; padding: 4px 1rem;
  max-width: 1280px; margin: 0 auto;
  overflow-x: auto; scrollbar-width: none;
}
.subnav-inner::-webkit-scrollbar { display: none; }
.subnav-item {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 11px; border-radius: 7px;
  border: none; background: none; cursor: pointer;
  font-size: 12px; font-weight: 600; color: var(--tx2);
  white-space: nowrap; transition: background .12s, color .12s; font-family: inherit;
}
.subnav-item:hover { background: var(--surface); color: var(--tx); }

.subnav-blue   .subnav-item.active { background: #EFF6FF; color: var(--v-blue); }
.subnav-purple .subnav-item.active { background: #F5F3FF; color: var(--v-purple); }
.subnav-teal   .subnav-item.active { background: #F0FDFA; color: var(--v-teal); }
.subnav-amber  .subnav-item.active { background: #FFFBEB; color: var(--v-amber); }
.subnav-coral  .subnav-item.active { background: #FFF5F2; color: var(--v-coral); }

@media (prefers-color-scheme: dark) {
  .subnav-blue   .subnav-item.active { background: #1e3a5f; }
  .subnav-purple .subnav-item.active { background: #2e1c5e; }
  .subnav-teal   .subnav-item.active { background: #0f3630; }
  .subnav-amber  .subnav-item.active { background: #4a2e08; }
  .subnav-coral  .subnav-item.active { background: #4a1a0c; }
}

.main-content { flex: 1; overflow-y: auto; background: var(--bg); }

@media (max-width: 640px) {
  .topnav-hubs { display: none; }
  .topnav-hamburger { display: block; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED FORM & BUTTON UTILITIES
═══════════════════════════════════════════════════════════════════════════ */
.form-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 1.1rem 1.2rem;
}
.form-row-flex { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.form-row-flex > div { min-width: 100px; flex: 1; }
.form-label {
  display: block; font-size: 11px; font-weight: 700; color: var(--tx2);
  text-transform: uppercase; letter-spacing: .06em; margin-bottom: 5px;
}
.form-input, .form-select {
  width: 100%; border: 1.5px solid var(--border2); border-radius: 8px;
  padding: 8px 10px; font-size: 13px; font-weight: 500;
  background: var(--bg); color: var(--tx); font-family: inherit; outline: none;
  transition: border-color .15s;
}
.form-input:focus, .form-select:focus { border-color: var(--v-blue); background: var(--surface); }
.form-textarea {
  width: 100%; border: 1.5px solid var(--border2); border-radius: 8px;
  padding: 10px 12px; font-size: 13.5px; line-height: 1.7;
  background: var(--bg); color: var(--tx); font-family: inherit; outline: none;
  resize: vertical; transition: border-color .15s;
}
.form-textarea:focus { border-color: var(--v-blue); background: var(--surface); }

.budget-page-header {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 1.25rem;
}
.page-title { font-size: 1.3rem; font-weight: 800; color: var(--tx); margin: 0; }
.page-subtitle { font-size: 12px; color: var(--tx2); margin-top: 2px; }
.nav-back-btn {
  padding: 7px 14px; border-radius: 8px; border: 1.5px solid var(--border2);
  background: var(--surface); color: var(--tx2); font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: inherit; white-space: nowrap; transition: all .15s;
}
.nav-back-btn:hover { border-color: var(--tx2); color: var(--tx); }

.btn-accent-blue {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: var(--v-blue); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .15s;
}
.btn-accent-blue:hover { opacity: .88; }
.btn-accent-green {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: var(--v-green); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .15s;
}
.btn-accent-green:hover { opacity: .88; }
.btn-accent-green:disabled { opacity: .4; cursor: default; }
.btn-accent-amber {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: var(--v-amber); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .15s;
}
.btn-accent-amber:hover { opacity: .88; }
.btn-accent-amber:disabled { opacity: .4; cursor: default; }
.btn-accent-coral {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: var(--v-coral); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .15s;
}
.btn-accent-coral:hover { opacity: .88; }
.btn-danger-sm {
  padding: 6px 12px; border-radius: 7px; border: 1.5px solid var(--v-red);
  background: none; color: var(--v-red);
  font-size: 12px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all .15s;
}
.btn-danger-sm:hover { background: var(--v-red); color: #fff; }
.btn-icon {
  padding: 5px 8px; border-radius: 6px; border: none;
  background: none; color: var(--tx3); font-size: 14px;
  cursor: pointer; transition: background .12s, color .12s;
}
.btn-icon:hover { background: var(--bg2); color: var(--tx); }

.empty-state {
  display: flex; flex-direction: column; align-items: center;
  gap: 10px; padding: 3rem 1rem; text-align: center; color: var(--tx2);
}
.empty-state span { font-size: 3rem; }
.empty-state p { font-size: 14px; line-height: 1.6; max-width: 320px; }

.card-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px;
}

.budget-progress-track {
  height: 8px; background: var(--bg2); border-radius: 99px; overflow: hidden; margin: 8px 0 4px;
}
.budget-progress-fill { height: 100%; border-radius: 99px; transition: width .4s ease; }
.budget-progress-wrap { margin-bottom: 1.25rem; }
.budget-progress-pct { font-size: 11px; color: var(--tx2); font-weight: 600; }

.view-toggle-btn {
  padding: 6px 14px; border-radius: 8px;
  border: 1.5px solid var(--border2); background: var(--surface);
  font-size: 12px; font-weight: 700; color: var(--tx2);
  cursor: pointer; font-family: inherit; transition: all .15s;
}
.view-toggle-btn.active { background: var(--tx); color: var(--surface); border-color: var(--tx); }
.view-toggle-btn:hover:not(.active) { border-color: var(--tx2); }

/* ═══════════════════════════════════════════════════════════════════════════
   TRIP BUDGET
═══════════════════════════════════════════════════════════════════════════ */
.budget-page { max-width: 860px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }

.budget-summary-bar {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 1rem; margin-bottom: 1rem;
}
.budget-stat { text-align: center; }
.budget-stat-label { font-size: 11px; font-weight: 600; color: var(--tx2); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
.budget-stat-value { font-size: 1.1rem; font-weight: 800; color: var(--tx); }

.budget-table {
  width: 100%; border-collapse: collapse;
  background: var(--surface); border-radius: var(--rl);
  border: 1px solid var(--border); overflow: hidden; font-size: 13px;
}
.budget-table thead th {
  text-align: left; padding: 9px 12px;
  font-size: 11px; font-weight: 700; color: var(--tx2);
  text-transform: uppercase; letter-spacing: .05em;
  background: var(--bg); border-bottom: 1px solid var(--border);
}
.budget-table tbody td { padding: 8px 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.budget-table tbody tr:last-child td { border-bottom: none; }
.budget-table tbody tr:hover td { background: var(--bg); }

.budget-list-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--rl); padding: 1rem 1.1rem; cursor: pointer;
  transition: border-color .15s, transform .15s;
}
.budget-list-card:hover { border-color: var(--v-amber); transform: translateY(-1px); }
.budget-list-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.budget-list-name { font-size: 15px; font-weight: 800; color: var(--tx); margin-bottom: 2px; }
.budget-list-dest { font-size: 12px; color: var(--tx2); }
.budget-list-footer { font-size: 11px; color: var(--tx3); margin-top: 8px; font-weight: 600; }

@media (max-width: 580px) {
  .budget-summary-bar { grid-template-columns: repeat(2, 1fr); }
  .budget-table { font-size: 12px; }
  .budget-table thead th, .budget-table tbody td { padding: 7px 8px; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SAVINGS GOALS
═══════════════════════════════════════════════════════════════════════════ */
.savings-page { max-width: 860px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }

.savings-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--rl); padding: 1.1rem 1.2rem; transition: border-color .15s;
}
.savings-card:hover { border-color: var(--v-green); }
.savings-card-done { border-color: var(--v-green) !important; }
.savings-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: .6rem; }
.savings-emoji { font-size: 1.8rem; flex-shrink: 0; }
.savings-name { font-size: 15px; font-weight: 800; color: var(--tx); margin-bottom: 2px; }
.savings-cat { font-size: 11px; color: var(--tx2); font-weight: 600; }
.savings-done-badge {
  font-size: 11px; font-weight: 800; padding: 3px 10px;
  border-radius: 99px; background: #dcfce7; color: var(--v-green); flex-shrink: 0;
}
.savings-amounts { font-size: 13px; color: var(--tx2); margin-bottom: 2px; }
.savings-saved { font-size: 1.1rem; font-weight: 800; color: var(--tx); }
.savings-sep { color: var(--tx3); margin: 0 4px; }
.savings-target { font-size: 13px; color: var(--tx2); font-weight: 600; }
.savings-add-btn {
  margin-top: 10px; width: 100%; padding: 8px;
  border-radius: 8px; border: 1.5px dashed var(--v-green);
  background: none; color: var(--v-green);
  font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; transition: background .15s;
}
.savings-add-btn:hover { background: #f0fdf4; }

/* ═══════════════════════════════════════════════════════════════════════════
   MOOD TRACKER
═══════════════════════════════════════════════════════════════════════════ */
.mood-page { max-width: 720px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }

.mood-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 1.25rem;
}
.mood-stat-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: .75rem 1rem; text-align: center;
}
.mood-stat-val { font-size: 1.4rem; font-weight: 900; color: var(--tx); line-height: 1.1; margin-bottom: 4px; }
.mood-stat-label { font-size: 11px; color: var(--tx2); font-weight: 600; }

.mood-picker { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 0; }
.mood-pick-btn {
  flex: 1; min-width: 80px; padding: 10px 6px;
  border-radius: 10px; border: 2px solid var(--border);
  background: var(--bg); cursor: pointer; font-family: inherit;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  transition: border-color .15s, background .15s;
}
.mood-pick-btn:hover { border-color: var(--mood-color, #999); }
.mood-pick-btn.active {
  border-color: var(--mood-color, #999);
  background: var(--surface);
}
.mood-pick-emoji { font-size: 1.5rem; }
.mood-pick-label { font-size: 11px; font-weight: 700; color: var(--tx2); }

.mood-energy-slider {
  width: 100%; height: 6px; border-radius: 3px;
  accent-color: var(--v-coral); cursor: pointer; margin-top: 6px;
}
.mood-emotions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.mood-emotion-chip {
  padding: 5px 12px; border-radius: 99px;
  border: 1.5px solid var(--border2); background: var(--bg);
  font-size: 12px; font-weight: 600; color: var(--tx2);
  cursor: pointer; font-family: inherit; transition: all .12s;
}
.mood-emotion-chip:hover { border-color: var(--v-coral); color: var(--v-coral); }
.mood-emotion-chip.active { background: var(--v-coral); color: #fff; border-color: var(--v-coral); }

.mood-log { display: flex; flex-direction: column; gap: 8px; }
.mood-entry {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: .85rem 1rem;
}
.mood-entry-top { display: flex; align-items: center; gap: 10px; }
.mood-entry-date { font-size: 13px; font-weight: 800; color: var(--tx); }
.mood-entry-label { font-size: 12px; font-weight: 600; }
.mood-entry-emotions { font-size: 11px; color: var(--tx2); flex: 1; text-align: right; }
.mood-entry-note {
  font-size: 13px; color: var(--tx2); margin-top: 8px; line-height: 1.6;
  padding-top: 8px; border-top: 1px solid var(--border);
}

.mood-chart { background: var(--surface); border: 1px solid var(--border); border-radius: var(--rl); padding: 1rem; }
.mood-chart-label { font-size: 11px; font-weight: 700; color: var(--tx2); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px; }
.mood-bars { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
.mood-bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; }
.mood-bar-fill { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; transition: height .3s; }
.mood-bar-date { font-size: 9px; color: var(--tx3); margin-top: 4px; white-space: nowrap; }

@media (max-width: 580px) {
  .mood-stats { grid-template-columns: repeat(2, 1fr); }
  .mood-pick-btn { min-width: 60px; padding: 8px 4px; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEEKLY REVIEW
═══════════════════════════════════════════════════════════════════════════ */
.review-page { max-width: 720px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }

.review-prompts { display: flex; flex-direction: column; gap: 14px; }
.review-prompt-block {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 1rem 1.1rem;
}
.review-prompt-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 800; color: var(--tx); margin-bottom: 8px;
}
.review-rating-btn {
  padding: 6px 12px; border-radius: 8px;
  border: 1.5px solid var(--border2); background: var(--bg);
  font-size: 12px; font-weight: 700; color: var(--tx2);
  cursor: pointer; font-family: inherit; transition: all .12s; white-space: nowrap;
}
.review-rating-btn:hover { border-color: var(--v-blue); color: var(--v-blue); }
.review-rating-btn.active { background: var(--v-blue); color: #fff; border-color: var(--v-blue); }

.review-read-block { margin-bottom: 1.25rem; }
.review-read-content {
  font-size: 14px; line-height: 1.75; color: var(--tx);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 1rem 1.1rem; margin-top: 6px; white-space: pre-wrap;
}

.review-list-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--rl); padding: 1rem 1.1rem; cursor: pointer; transition: border-color .15s;
}
.review-list-card:hover { border-color: var(--v-blue); }
.review-list-top {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: .5rem;
}
.review-list-week { font-size: 14px; font-weight: 800; color: var(--tx); margin-bottom: 2px; }
.review-list-rating { font-size: 12px; color: var(--tx2); font-weight: 600; }
.review-list-preview {
  font-size: 12px; color: var(--tx2); line-height: 1.5; margin-top: 4px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
"""

with open(CSS_PATH, "a", encoding="utf-8") as f:
    f.write(NEW_CSS)

print(f"Done. File is now {CSS_PATH.stat().st_size} bytes.")

import { useState, useEffect } from 'react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;       // 1–5
  energy: number;     // 1–5
  emotions: string[];
  note: string;
}

const LS_KEY = 'journal_moods';
const MOODS = [
  { score: 1, emoji: '😞', label: 'Rough',   color: '#EF4444' },
  { score: 2, emoji: '😔', label: 'Low',     color: '#F97316' },
  { score: 3, emoji: '😐', label: 'Okay',    color: '#EAB308' },
  { score: 4, emoji: '🙂', label: 'Good',    color: '#22C55E' },
  { score: 5, emoji: '😄', label: 'Amazing', color: '#06B6D4' },
];
const EMOTIONS = ['😌 Calm', '💪 Motivated', '😰 Anxious', '😤 Stressed', '🥰 Grateful', '😴 Tired', '🤩 Excited', '😕 Confused', '💡 Inspired', '😤 Frustrated', '🥺 Lonely', '🎉 Happy'];

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): MoodEntry[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(d: MoodEntry[]) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }

export default function MoodTrackerView() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => load());
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), mood: 4, energy: 3, emotions: [] as string[], note: '' });
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'log' | 'chart'>('log');

  useEffect(() => { save(entries); }, [entries]);

  function toggleEmotion(e: string) {
    setForm(f => ({ ...f, emotions: f.emotions.includes(e) ? f.emotions.filter(x => x !== e) : [...f.emotions, e] }));
  }

  function saveEntry() {
    const existing = entries.find(e => e.date === form.date);
    if (existing) {
      setEntries(entries.map(e => e.date === form.date ? { ...e, ...form } : e));
    } else {
      setEntries([{ id: uid(), ...form }, ...entries]);
    }
    setShowForm(false);
    setForm(f => ({ ...f, note: '', emotions: [] }));
  }

  function deleteEntry(id: string) { setEntries(entries.filter(e => e.id !== id)); }

  // Last 7 days summary
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const avgMood = entries.length ? (entries.reduce((s, e) => s + e.mood, 0) / entries.length).toFixed(1) : '—';
  const avgEnergy = entries.length ? (entries.reduce((s, e) => s + e.energy, 0) / entries.length).toFixed(1) : '—';
  const streak = (() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      if (entries.some(e => e.date === dateStr)) count++; else break;
    }
    return count;
  })();

  return (
    <div className="mood-page">
      <div className="budget-page-header">
        <div>
          <h2 className="page-title">🌡️ Mood Tracker</h2>
          <div className="page-subtitle">Log daily mood · spot patterns · {streak > 0 ? `🔥 ${streak}-day streak` : 'Start your streak today'}</div>
        </div>
        <button className="btn-accent-coral" onClick={() => setShowForm(s => !s)}>{showForm ? '✕ Cancel' : '+ Log Today'}</button>
      </div>

      {/* Stats */}
      <div className="mood-stats">
        <div className="mood-stat-card"><div className="mood-stat-val">{entries.length}</div><div className="mood-stat-label">Days logged</div></div>
        <div className="mood-stat-card"><div className="mood-stat-val">{avgMood} <span style={{ fontSize: '1.2rem' }}>{entries.length ? MOODS[Math.round(Number(avgMood)) - 1]?.emoji : ''}</span></div><div className="mood-stat-label">Avg mood</div></div>
        <div className="mood-stat-card"><div className="mood-stat-val">{avgEnergy} ⚡</div><div className="mood-stat-label">Avg energy</div></div>
        <div className="mood-stat-card"><div className="mood-stat-val">{streak} 🔥</div><div className="mood-stat-label">Day streak</div></div>
      </div>

      {/* Log form */}
      {showForm && (
        <div className="form-card" style={{ marginBottom: '1.5rem' }}>
          <div className="form-row-flex" style={{ marginBottom: 16 }}>
            <div><label className="form-label">Date</label><input type="date" className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
          </div>

          <label className="form-label">How are you feeling? *</label>
          <div className="mood-picker">
            {MOODS.map(m => (
              <button key={m.score} className={`mood-pick-btn ${form.mood === m.score ? 'active' : ''}`}
                style={{ '--mood-color': m.color } as React.CSSProperties}
                onClick={() => setForm(f => ({ ...f, mood: m.score }))}>
                <span className="mood-pick-emoji">{m.emoji}</span>
                <span className="mood-pick-label">{m.label}</span>
              </button>
            ))}
          </div>

          <label className="form-label" style={{ marginTop: 16, display: 'block' }}>Energy level: {form.energy}/5 ⚡</label>
          <input type="range" min={1} max={5} value={form.energy} onChange={e => setForm(f => ({ ...f, energy: Number(e.target.value) }))} className="mood-energy-slider" />

          <label className="form-label" style={{ marginTop: 16, display: 'block' }}>Emotions (pick all that apply)</label>
          <div className="mood-emotions">
            {EMOTIONS.map(em => (
              <button key={em} className={`mood-emotion-chip ${form.emotions.includes(em) ? 'active' : ''}`} onClick={() => toggleEmotion(em)}>{em}</button>
            ))}
          </div>

          <label className="form-label" style={{ marginTop: 16, display: 'block' }}>Quick note (optional)</label>
          <textarea className="form-textarea" rows={3} placeholder="Anything on your mind today?" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />

          <button className="btn-accent-coral" style={{ marginTop: 12 }} onClick={saveEntry}>Save Entry</button>
        </div>
      )}

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <button className={`view-toggle-btn ${viewMode === 'log' ? 'active' : ''}`} onClick={() => setViewMode('log')}>📋 Log</button>
        <button className={`view-toggle-btn ${viewMode === 'chart' ? 'active' : ''}`} onClick={() => setViewMode('chart')}>📊 Chart</button>
      </div>

      {entries.length === 0
        ? <div className="empty-state"><span>🌡️</span><p>No mood entries yet. Log today's mood to start!</p></div>
        : viewMode === 'chart'
          ? (
            <div className="mood-chart">
              <div className="mood-chart-label">Last 14 days — mood score</div>
              <div className="mood-bars">
                {sorted.slice(0, 14).reverse().map(e => {
                  const m = MOODS[e.mood - 1];
                  return (
                    <div key={e.id} className="mood-bar-col">
                      <div className="mood-bar-fill" style={{ height: `${(e.mood / 5) * 100}%`, background: m.color }} title={`${e.date}: ${m.label}`} />
                      <div className="mood-bar-date">{e.date.slice(5)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
          : (
            <div className="mood-log">
              {sorted.map(e => {
                const m = MOODS[e.mood - 1];
                return (
                  <div key={e.id} className="mood-entry" style={{ borderLeft: `3px solid ${m.color}` }}>
                    <div className="mood-entry-top">
                      <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div className="mood-entry-date">{e.date}</div>
                        <div className="mood-entry-label" style={{ color: m.color }}>{m.label} · ⚡ {e.energy}/5</div>
                      </div>
                      {e.emotions.length > 0 && <div className="mood-entry-emotions">{e.emotions.slice(0, 3).join(' · ')}</div>}
                      <button className="btn-icon" onClick={() => deleteEntry(e.id)}>✕</button>
                    </div>
                    {e.note && <div className="mood-entry-note">{e.note}</div>}
                  </div>
                );
              })}
            </div>
          )}
    </div>
  );
}

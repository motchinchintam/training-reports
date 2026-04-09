import { useState } from 'react';

interface Goal {
  id: number; title: string; category: string; description: string;
  target: number; current: number; unit: string; deadline: string;
  done: boolean; createdAt: string;
}

const LS_KEY = 'lh_goals';
function load(): Goal[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }  }
function save(g: Goal[]) { localStorage.setItem(LS_KEY, JSON.stringify(g)); }

const CATEGORIES = ['All', 'SQL', 'TypeScript', 'English', 'Chinese', 'Other'];
const CAT_COLORS: Record<string, string> = {
  SQL: 'blue', TypeScript: 'purple', English: 'teal', Chinese: 'amber', Other: 'coral',
};

const SAMPLE: Goal[] = [
  { id: 1, title: 'Complete 100 SQL exercises', category: 'SQL', description: 'Practice SELECT, JOIN, GROUP BY, subqueries', target: 100, current: 34, unit: 'exercises', deadline: '2026-06-30', done: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Learn TypeScript generics & utility types', category: 'TypeScript', description: 'Cover Partial, Pick, Omit, Record, generics', target: 20, current: 7, unit: 'topics', deadline: '2026-05-31', done: false, createdAt: new Date().toISOString() },
  { id: 3, title: 'Master 500 HSK2 Chinese words', category: 'Chinese', description: 'Daily flashcard review — 20 words per day', target: 500, current: 120, unit: 'words', deadline: '2026-08-31', done: false, createdAt: new Date().toISOString() },
  { id: 4, title: 'Read 500 English articles', category: 'English', description: 'One article per day to build reading fluency', target: 500, current: 500, unit: 'articles', deadline: '2026-04-01', done: true, createdAt: new Date().toISOString() },
];

const blank = { title: '', category: 'SQL', description: '', target: 100, current: 0, unit: '', deadline: '' };

export default function GoalTrackerView() {
  const [goals, setGoals] = useState<Goal[]>(() => { const d = load(); return d.length ? d : SAMPLE; });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState('All');
  const [toast, setToast] = useState('');

  function persist(g: Goal[]) { setGoals(g); save(g); }
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2000); }

  function submit() {
    if (!form.title.trim()) return;
    if (editId !== null) {
      persist(goals.map(g => g.id === editId ? { ...g, ...form, target: Number(form.target), current: Number(form.current) } : g));
      setEditId(null);
    } else {
      const g: Goal = { ...form, id: Date.now(), target: Number(form.target), current: Number(form.current), done: false, createdAt: new Date().toISOString() };
      persist([g, ...goals]);
    }
    setForm(blank); setShowForm(false);
  }

  function deleteGoal(id: number) {
    if (!confirm('Delete this goal?')) return;
    persist(goals.filter(g => g.id !== id));
  }

  function toggleDone(id: number) {
    persist(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  }

  function updateCurrent(id: number, val: number) {
    persist(goals.map(g => g.id === id ? { ...g, current: Math.max(0, Math.min(g.target, val)) } : g));
    showToast('Progress updated!');
  }

  function startEdit(g: Goal) {
    setForm({ title: g.title, category: g.category, description: g.description, target: g.target, current: g.current, unit: g.unit, deadline: g.deadline });
    setEditId(g.id); setShowForm(true);
  }

  const displayed = catFilter === 'All' ? goals : goals.filter(g => g.category === catFilter);
  const active = goals.filter(g => !g.done);
  const done = goals.filter(g => g.done);
  const overallPct = goals.length ? Math.round(goals.reduce((a, g) => a + Math.min(100, g.target > 0 ? g.current / g.target * 100 : 0), 0) / goals.length) : 0;

  function daysLeft(deadline: string) {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    return diff;
  }

  return (
    <div className="view">
      <div className="view-header">
        <h2 className="view-title">Learning Goals</h2>
        <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={() => { setShowForm(true); setEditId(null); setForm(blank); }}>+ Add goal</button>
      </div>

      {/* Stats */}
      <div className="tt-summary-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="tt-stat"><div className="tt-stat-label">Total goals</div><div className="tt-stat-value">{goals.length}</div></div>
        <div className="tt-stat"><div className="tt-stat-label">Active</div><div className="tt-stat-value" style={{ color: 'var(--blue)' }}>{active.length}</div></div>
        <div className="tt-stat"><div className="tt-stat-label">Completed</div><div className="tt-stat-value" style={{ color: 'var(--green)' }}>{done.length}</div></div>
        <div className="tt-stat"><div className="tt-stat-label">Avg progress</div><div className="tt-stat-value" style={{ color: 'var(--teal)' }}>{overallPct}%</div></div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="tt-card" style={{ marginBottom: '1.25rem' }}>
          <div className="tt-card-header"><span className="tt-badge tt-badge-blue">{editId ? 'Edit goal' : 'New goal'}</span></div>
          <div className="tt-card-body">
            <div className="goal-form-grid">
              <div className="tt-field"><label>Goal title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Complete 50 SQL exercises" /></div>
              <div className="tt-field"><label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="tt-field"><label>Target</label><input type="number" min={1} value={form.target} onChange={e => setForm({ ...form, target: Number(e.target.value) })} /></div>
              <div className="tt-field"><label>Current</label><input type="number" min={0} value={form.current} onChange={e => setForm({ ...form, current: Number(e.target.value) })} /></div>
              <div className="tt-field"><label>Unit</label><input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="e.g. exercises, words, topics" /></div>
              <div className="tt-field"><label>Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} /></div>
            </div>
            <div className="tt-field"><label>Description (optional)</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." /></div>
            <div className="form-actions" style={{ marginTop: '10px' }}>
              <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={submit}>{editId ? 'Save changes' : 'Add goal'}</button>
              <button className="tt-btn tt-btn-outline" style={{ flex: 'none' }} onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="filter-bar" style={{ marginBottom: '1rem' }}>
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${catFilter === c ? ' active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
        ))}
      </div>

      {/* Goals list */}
      <div className="goal-list">
        {displayed.map(g => {
          const pct = g.target > 0 ? Math.min(100, Math.round(g.current / g.target * 100)) : 0;
          const days = daysLeft(g.deadline);
          const catColor = CAT_COLORS[g.category] || 'blue';
          return (
            <div key={g.id} className={`goal-card${g.done ? ' goal-done' : ''}`}>
              <div className="goal-card-top">
                <input type="checkbox" checked={g.done} onChange={() => toggleDone(g.id)} className="goal-check" />
                <div className="goal-title-wrap">
                  <div className="goal-title">{g.title}</div>
                  {g.description && <div className="goal-desc">{g.description}</div>}
                </div>
                <span className={`goal-cat-badge goal-cat-${catColor}`}>{g.category}</span>
                <div className="goal-card-actions">
                  <button className="btn-icon" onClick={() => startEdit(g)} title="Edit">✏️</button>
                  <button className="tt-del-btn" onClick={() => deleteGoal(g.id)}>✕</button>
                </div>
              </div>
              <div className="goal-progress-row">
                <div className="goal-prog-track"><div className="goal-prog-fill" style={{ width: pct + '%', background: g.done ? 'var(--green)' : 'var(--blue)' }} /></div>
                <span className="goal-pct">{pct}%</span>
              </div>
              <div className="goal-footer">
                <span className="goal-numbers">
                  <input type="number" className="goal-current-input" min={0} max={g.target} value={g.current}
                    onChange={e => updateCurrent(g.id, Number(e.target.value))} />
                  / {g.target} {g.unit}
                </span>
                {g.deadline && days !== null && (
                  <span className={`goal-deadline ${days < 0 ? 'overdue' : days <= 7 ? 'urgent' : ''}`}>
                    {days < 0 ? `${-days}d overdue` : days === 0 ? 'Due today!' : `${days}d left`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {displayed.length === 0 && <p style={{ color: 'var(--tx3)', fontSize: '14px', padding: '1rem 0' }}>No goals in this category.</p>}
      </div>

      {toast && <div className="tt-toast show">{toast}</div>}
    </div>
  );
}

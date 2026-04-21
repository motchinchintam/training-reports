import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  createdAt: string;
}

const LS_KEY = 'journal_entries';
const MOODS = ['😄 Great', '🙂 Good', '😐 Okay', '😔 Low', '😤 Stressed', '😴 Tired'];

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): JournalEntry[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function save(data: JournalEntry[]) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

export default function DailyJournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => load());
  const [selected, setSelected] = useState<JournalEntry | null>(null);
  const [mode, setMode] = useState<'list' | 'write' | 'read'>('list');
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), title: '', content: '', mood: MOODS[1], tags: '' });
  const [search, setSearch] = useState('');

  useEffect(() => { save(entries); }, [entries]);

  function saveEntry() {
    if (!form.content.trim()) return;
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (selected) {
      setEntries(entries.map(e => e.id === selected.id ? { ...selected, ...form, tags, createdAt: selected.createdAt } : e));
    } else {
      setEntries([{ id: uid(), ...form, tags, createdAt: new Date().toISOString() }, ...entries]);
    }
    setMode('list');
    setSelected(null);
    setForm({ date: new Date().toISOString().slice(0, 10), title: '', content: '', mood: MOODS[1], tags: '' });
  }

  function startNew() {
    setSelected(null);
    setForm({ date: new Date().toISOString().slice(0, 10), title: '', content: '', mood: MOODS[1], tags: '' });
    setMode('write');
  }

  function startEdit(e: JournalEntry) {
    setSelected(e);
    setForm({ date: e.date, title: e.title, content: e.content, mood: e.mood, tags: e.tags.join(', ') });
    setMode('write');
  }

  function deleteEntry(id: string) {
    if (!confirm('Delete this entry?')) return;
    setEntries(entries.filter(e => e.id !== id));
    if (selected?.id === id) { setSelected(null); setMode('list'); }
  }

  const filtered = entries.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.content.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search)
  );

  if (mode === 'write') {
    return (
      <div className="jnl-page">
        <div className="jnl-write-header">
          <button className="itin-nav-btn" onClick={() => { setMode('list'); setSelected(null); }}>← Back</button>
          <h2 className="tpl-page-title">{selected ? 'Edit Entry' : 'New Entry'}</h2>
          <button className="tpl-create-btn" onClick={saveEntry} disabled={!form.content.trim()}>Save Entry</button>
        </div>
        <div className="jnl-write-meta">
          <div>
            <div className="tpl-form-label">Date</div>
            <input type="date" className="tpl-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div>
            <div className="tpl-form-label">Mood</div>
            <select className="tpl-select" style={{ width: '100%', padding: '7px 10px' }} value={form.mood} onChange={e => setForm(f => ({ ...f, mood: e.target.value }))}>
              {MOODS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 2 }}>
            <div className="tpl-form-label">Title (optional)</div>
            <input className="tpl-input" placeholder="Give this entry a title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="tpl-form-label">Tags (comma separated)</div>
            <input className="tpl-input" placeholder="e.g. travel, work, study" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
          </div>
        </div>
        <div>
          <div className="tpl-form-label" style={{ marginBottom: '6px' }}>Entry *</div>
          <textarea
            className="note-textarea jnl-textarea"
            rows={16}
            placeholder={"What happened today?\nWhat did you feel?\nWhat did you learn?\n\nWrite freely — this is just for you."}
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            autoFocus
          />
        </div>
        <div className="jnl-word-count">{form.content.trim().split(/\s+/).filter(Boolean).length} words</div>
      </div>
    );
  }

  if (mode === 'read' && selected) {
    return (
      <div className="jnl-page">
        <div className="jnl-write-header">
          <button className="itin-nav-btn" onClick={() => setMode('list')}>← All Entries</button>
          <div style={{ flex: 1 }} />
          <button className="itin-nav-btn" onClick={() => startEdit(selected)}>Edit</button>
          <button className="itin-nav-btn" style={{ color: 'var(--red)' }} onClick={() => deleteEntry(selected.id)}>Delete</button>
        </div>
        <div className="jnl-read-header">
          <div className="jnl-read-date">{selected.date} · {selected.mood}</div>
          {selected.title && <h2 className="jnl-read-title">{selected.title}</h2>}
          {selected.tags.length > 0 && (
            <div className="jnl-read-tags">{selected.tags.map(t => <span key={t} className="lh-chip">{t}</span>)}</div>
          )}
        </div>
        <div className="jnl-read-content">{selected.content}</div>
      </div>
    );
  }

  return (
    <div className="jnl-page">
      <div className="jnl-list-header">
        <div>
          <h2 className="tpl-page-title">✍️ Daily Journal</h2>
          <div className="tpl-page-sub">{entries.length} entr{entries.length !== 1 ? 'ies' : 'y'}</div>
        </div>
        <button className="tpl-create-btn" onClick={startNew}>+ New Entry</button>
      </div>

      <input className="note-search" style={{ width: '100%', marginBottom: '1rem', boxSizing: 'border-box' }}
        placeholder="Search entries..." value={search} onChange={e => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <div className="tpl-empty-trip">
          <span style={{ fontSize: '3rem' }}>✍️</span>
          <p>{entries.length === 0 ? 'No entries yet. Start writing!' : 'No entries match your search.'}</p>
          {entries.length === 0 && <button className="tpl-create-btn" onClick={startNew}>Write First Entry</button>}
        </div>
      ) : (
        <div className="jnl-list">
          {filtered.map(e => (
            <div key={e.id} className="jnl-entry-card" onClick={() => { setSelected(e); setMode('read'); }}>
              <div className="jnl-entry-top">
                <span className="jnl-entry-mood">{e.mood.split(' ')[0]}</span>
                <span className="jnl-entry-date">{e.date}</span>
                {e.title && <span className="jnl-entry-title">{e.title}</span>}
                <button className="btn-icon" style={{ marginLeft: 'auto' }} onClick={ev => { ev.stopPropagation(); deleteEntry(e.id); }} title="Delete">🗑</button>
              </div>
              <p className="jnl-entry-preview">{e.content}</p>
              {e.tags.length > 0 && (
                <div className="jnl-read-tags">{e.tags.map(t => <span key={t} className="lh-chip">{t}</span>)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';

interface WeeklyReview {
  id: string;
  weekStart: string;
  weekEnd: string;
  wins: string;
  struggles: string;
  lessons: string;
  gratitude: string;
  nextWeekIntentions: string;
  rating: number;
  createdAt: string;
}

const LS_KEY = 'journal_weekly_reviews';

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): WeeklyReview[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(d: WeeklyReview[]) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }

function getWeekBounds(date: Date) {
  const day = date.getDay();
  const monday = new Date(date); monday.setDate(date.getDate() - ((day + 6) % 7));
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  return { weekStart: monday.toISOString().slice(0, 10), weekEnd: sunday.toISOString().slice(0, 10) };
}

const BLANK = { wins: '', struggles: '', lessons: '', gratitude: '', nextWeekIntentions: '', rating: 4 };

const PROMPTS = [
  { key: 'wins',                emoji: '🏆', label: 'Wins & Highlights',         placeholder: 'What went well this week? What are you proud of?' },
  { key: 'struggles',           emoji: '💪', label: 'Struggles & Challenges',    placeholder: 'What was hard? What did you find difficult?' },
  { key: 'lessons',             emoji: '💡', label: 'Lessons Learned',           placeholder: 'What did this week teach you?' },
  { key: 'gratitude',           emoji: '🙏', label: 'Gratitude',                 placeholder: 'Three things you are grateful for this week...' },
  { key: 'nextWeekIntentions',  emoji: '🎯', label: 'Intentions for Next Week',  placeholder: 'What do you want to focus on or improve next week?' },
];

export default function WeeklyReviewView() {
  const [reviews, setReviews] = useState<WeeklyReview[]>(() => load());
  const [screen, setScreen] = useState<'list' | 'write' | 'read'>('list');
  const [form, setForm] = useState({ ...getWeekBounds(new Date()), ...BLANK });
  const [selected, setSelected] = useState<WeeklyReview | null>(null);

  useEffect(() => { save(reviews); }, [reviews]);

  function startNew() {
    setSelected(null);
    setForm({ ...getWeekBounds(new Date()), ...BLANK });
    setScreen('write');
  }

  function saveReview() {
    if (!form.wins && !form.lessons && !form.gratitude) return;
    if (selected) {
      setReviews(reviews.map(r => r.id === selected.id ? { ...selected, ...form } : r));
    } else {
      setReviews([{ id: uid(), ...form, createdAt: new Date().toISOString() }, ...reviews]);
    }
    setScreen('list');
    setSelected(null);
  }

  function deleteReview(id: string) {
    if (!confirm('Delete this review?')) return;
    setReviews(reviews.filter(r => r.id !== id));
    if (selected?.id === id) { setSelected(null); setScreen('list'); }
  }

  const RATINGS = [
    { score: 1, label: '😞 Rough' }, { score: 2, label: '😔 Low' },
    { score: 3, label: '😐 Okay' }, { score: 4, label: '🙂 Good' }, { score: 5, label: '🌟 Amazing' },
  ];

  if (screen === 'write') {
    return (
      <div className="review-page">
        <div className="budget-page-header">
          <button className="nav-back-btn" onClick={() => setScreen('list')}>← Back</button>
          <h2 className="page-title">{selected ? 'Edit Review' : 'Weekly Review'}</h2>
          <button className="btn-accent-blue" onClick={saveReview}>Save Review</button>
        </div>

        <div className="form-row-flex" style={{ marginBottom: '1.25rem' }}>
          <div><label className="form-label">Week Start (Monday)</label><input type="date" className="form-input" value={form.weekStart} onChange={e => setForm(f => ({ ...f, weekStart: e.target.value }))} /></div>
          <div><label className="form-label">Week End (Sunday)</label><input type="date" className="form-input" value={form.weekEnd} onChange={e => setForm(f => ({ ...f, weekEnd: e.target.value }))} /></div>
          <div style={{ flex: 1 }}>
            <label className="form-label">Overall Rating</label>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {RATINGS.map(r => (
                <button key={r.score} className={`review-rating-btn ${form.rating === r.score ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, rating: r.score }))}>{r.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="review-prompts">
          {PROMPTS.map(p => (
            <div key={p.key} className="review-prompt-block">
              <label className="review-prompt-label"><span>{p.emoji}</span> {p.label}</label>
              <textarea className="form-textarea" rows={4} placeholder={p.placeholder}
                value={(form as unknown as Record<string, string>)[p.key]}
                onChange={e => setForm(f => ({ ...f, [p.key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <button className="btn-accent-blue" style={{ marginTop: '1rem', width: '100%' }} onClick={saveReview}>Save Review</button>
      </div>
    );
  }

  if (screen === 'read' && selected) {
    const rating = RATINGS.find(r => r.score === selected.rating);
    return (
      <div className="review-page">
        <div className="budget-page-header">
          <button className="nav-back-btn" onClick={() => setScreen('list')}>← All Reviews</button>
          <div style={{ flex: 1 }}>
            <div className="page-title">{selected.weekStart} → {selected.weekEnd}</div>
            <div className="page-subtitle">{rating?.label}</div>
          </div>
          <button className="nav-back-btn" onClick={() => { setSelected(selected); setForm({ weekStart: selected.weekStart, weekEnd: selected.weekEnd, wins: selected.wins, struggles: selected.struggles, lessons: selected.lessons, gratitude: selected.gratitude, nextWeekIntentions: selected.nextWeekIntentions, rating: selected.rating }); setScreen('write'); }}>Edit</button>
          <button className="nav-back-btn" style={{ color: 'var(--v-red)' }} onClick={() => deleteReview(selected.id)}>Delete</button>
        </div>
        {PROMPTS.map(p => (selected as unknown as Record<string, string>)[p.key] ? (
          <div key={p.key} className="review-read-block">
            <div className="review-prompt-label"><span>{p.emoji}</span> {p.label}</div>
            <div className="review-read-content">{(selected as unknown as Record<string, string>)[p.key]}</div>
          </div>
        ) : null)}
      </div>
    );
  }

  return (
    <div className="review-page">
      <div className="budget-page-header">
        <div>
          <h2 className="page-title">📊 Weekly Review</h2>
          <div className="page-subtitle">{reviews.length} review{reviews.length !== 1 ? 's' : ''} written</div>
        </div>
        <button className="btn-accent-blue" onClick={startNew}>+ New Review</button>
      </div>

      {reviews.length === 0
        ? <div className="empty-state"><span>📊</span><p>No reviews yet. End this week with a reflection!</p><button className="btn-accent-blue" onClick={startNew}>Write First Review</button></div>
        : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviews.map(r => {
              const rating = RATINGS.find(rt => rt.score === r.rating);
              return (
                <div key={r.id} className="review-list-card" onClick={() => { setSelected(r); setScreen('read'); }}>
                  <div className="review-list-top">
                    <div>
                      <div className="review-list-week">{r.weekStart} — {r.weekEnd}</div>
                      <div className="review-list-rating">{rating?.label}</div>
                    </div>
                    <button className="btn-icon" onClick={e => { e.stopPropagation(); deleteReview(r.id); }}>🗑</button>
                  </div>
                  {r.wins && <div className="review-list-preview">🏆 {r.wins}</div>}
                  {r.nextWeekIntentions && <div className="review-list-preview">🎯 {r.nextWeekIntentions}</div>}
                </div>
              );
            })}
          </div>}
    </div>
  );
}

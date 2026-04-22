import { useState, useEffect } from 'react';

interface SavingsGoal {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  savedAmount: number;
  currency: string;
  deadline: string;
  category: string;
  createdAt: string;
}

const LS_KEY = 'finance_savings_goals';
const CATEGORIES = ['✈️ Travel', '💻 Gadget', '🏠 Home', '📚 Education', '🚨 Emergency', '🎁 Gift', '💪 Health', '🎯 Other'];
const CURRENCIES = ['VND', 'TWD', 'USD', 'SGD', 'JPY', 'KRW', 'EUR'];
const EMOJIS = ['✈️', '💻', '🏠', '📱', '🎒', '🏦', '🎓', '🚗', '💍', '🎮', '📷', '🎯'];

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): SavingsGoal[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(d: SavingsGoal[]) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
function fmt(n: number, cur: string) {
  if (['VND', 'JPY', 'KRW'].includes(cur)) return `${cur} ${n.toLocaleString()}`;
  return `${cur} ${n.toFixed(2)}`;
}

export default function SavingsGoalsView() {
  const [goals, setGoals] = useState<SavingsGoal[]>(() => load());
  const [showForm, setShowForm] = useState(false);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [addAmount, setAddAmount] = useState('');
  const [form, setForm] = useState({ name: '', emoji: '🎯', targetAmount: '', savedAmount: '', currency: 'VND', deadline: '', category: CATEGORIES[0] });

  useEffect(() => { save(goals); }, [goals]);

  function createGoal() {
    if (!form.name.trim() || !form.targetAmount) return;
    const g: SavingsGoal = { id: uid(), ...form, targetAmount: Number(form.targetAmount), savedAmount: Number(form.savedAmount) || 0, createdAt: new Date().toISOString() };
    setGoals([g, ...goals]);
    setForm({ name: '', emoji: '🎯', targetAmount: '', savedAmount: '', currency: 'VND', deadline: '', category: CATEGORIES[0] });
    setShowForm(false);
  }

  function addSavings(id: string) {
    const amt = Number(addAmount);
    if (!amt) return;
    setGoals(goals.map(g => g.id === id ? { ...g, savedAmount: Math.min(g.savedAmount + amt, g.targetAmount) } : g));
    setAddingTo(null);
    setAddAmount('');
  }

  function deleteGoal(id: string) {
    if (!confirm('Delete this goal?')) return;
    setGoals(goals.filter(g => g.id !== id));
  }

  const totalGoals = goals.length;
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="savings-page">
      <div className="budget-page-header">
        <div>
          <h2 className="page-title">🏦 Savings Goals</h2>
          <div className="page-subtitle">{totalGoals} goals · {completed} completed</div>
        </div>
        <button className="btn-accent-green" onClick={() => setShowForm(s => !s)}>{showForm ? '✕ Cancel' : '+ New Goal'}</button>
      </div>

      {showForm && (
        <div className="form-card" style={{ marginBottom: '1.5rem', maxWidth: 560 }}>
          <div className="form-row-flex">
            <div>
              <label className="form-label">Icon</label>
              <select className="form-select" value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}>
                {EMOJIS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div style={{ flex: 2 }}><label className="form-label">Goal Name *</label><input className="form-input" placeholder="e.g. Taiwan Trip Fund" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row-flex" style={{ marginTop: 10 }}>
            <div><label className="form-label">Currency</label>
              <select className="form-select" value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}><label className="form-label">Target Amount *</label><input type="number" className="form-input" placeholder="0" value={form.targetAmount} onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))} /></div>
            <div style={{ flex: 1 }}><label className="form-label">Already Saved</label><input type="number" className="form-input" placeholder="0" value={form.savedAmount} onChange={e => setForm(f => ({ ...f, savedAmount: e.target.value }))} /></div>
            <div><label className="form-label">Deadline</label><input type="date" className="form-input" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} /></div>
          </div>
          <button className="btn-accent-green" style={{ marginTop: 12 }} onClick={createGoal} disabled={!form.name.trim() || !form.targetAmount}>Create Goal</button>
        </div>
      )}

      {goals.length === 0
        ? <div className="empty-state"><span>🏦</span><p>No savings goals yet. Create one to start saving!</p></div>
        : <div className="card-grid">
            {goals.map(g => {
              const pct = g.targetAmount > 0 ? Math.min(100, (g.savedAmount / g.targetAmount) * 100) : 0;
              const done = g.savedAmount >= g.targetAmount;
              const remaining = g.targetAmount - g.savedAmount;
              const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline).getTime() - Date.now()) / 86400000) : null;
              return (
                <div key={g.id} className={`savings-card ${done ? 'savings-card-done' : ''}`}>
                  <div className="savings-card-top">
                    <span className="savings-emoji">{g.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div className="savings-name">{g.name}</div>
                      <div className="savings-cat">{g.category}</div>
                    </div>
                    {done && <span className="savings-done-badge">✅ Done!</span>}
                    <button className="btn-icon" onClick={() => deleteGoal(g.id)}>🗑</button>
                  </div>

                  <div className="savings-amounts">
                    <span className="savings-saved">{fmt(g.savedAmount, g.currency)}</span>
                    <span className="savings-sep"> / </span>
                    <span className="savings-target">{fmt(g.targetAmount, g.currency)}</span>
                  </div>

                  <div className="budget-progress-track">
                    <div className="budget-progress-fill" style={{ width: `${pct}%`, background: done ? 'var(--v-green)' : pct > 60 ? 'var(--v-teal)' : 'var(--v-blue)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 5, color: 'var(--tx2)' }}>
                    <span>{pct.toFixed(0)}% saved</span>
                    {!done && <span>{fmt(remaining, g.currency)} to go</span>}
                    {daysLeft !== null && <span style={{ color: daysLeft < 30 ? 'var(--v-red)' : 'var(--tx3)' }}>{daysLeft > 0 ? `${daysLeft}d left` : 'Overdue'}</span>}
                  </div>

                  {!done && (
                    addingTo === g.id
                      ? <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          <input type="number" className="form-input" placeholder={`Amount (${g.currency})`} value={addAmount} onChange={e => setAddAmount(e.target.value)} autoFocus />
                          <button className="btn-accent-green" onClick={() => addSavings(g.id)}>Save</button>
                          <button className="nav-back-btn" onClick={() => setAddingTo(null)}>✕</button>
                        </div>
                      : <button className="savings-add-btn" onClick={() => setAddingTo(g.id)}>+ Add Savings</button>
                  )}
                </div>
              );
            })}
          </div>}
    </div>
  );
}

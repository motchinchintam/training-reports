import { useState, useEffect } from 'react';

interface Expense {
  id: string;
  date: string;
  amount: number;
  currency: string;
  category: string;
  note: string;
}

const LS_KEY = 'finance_expenses';
const CATEGORIES = ['🍜 Food', '🚌 Transport', '🛍 Shopping', '🏨 Accommodation', '🎭 Entertainment', '💊 Health', '📚 Education', '✈️ Travel', '📦 Other'];
const CURRENCIES = ['VND', 'TWD', 'USD', 'SGD', 'JPY', 'KRW', 'EUR'];

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): Expense[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function save(data: Expense[]) { localStorage.setItem(LS_KEY, JSON.stringify(data)); }

function fmt(amount: number, currency: string) {
  if (currency === 'VND' || currency === 'JPY' || currency === 'KRW') return `${currency} ${amount.toLocaleString()}`;
  return `${currency} ${amount.toFixed(2)}`;
}

export default function ExpenseTrackerView() {
  const [expenses, setExpenses] = useState<Expense[]>(() => load());
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: '', currency: 'VND', category: CATEGORIES[0], note: '' });
  const [catFilter, setCatFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { save(expenses); }, [expenses]);

  function add() {
    if (!form.amount || isNaN(Number(form.amount))) return;
    const updated = [{ id: uid(), date: form.date, amount: Number(form.amount), currency: form.currency, category: form.category, note: form.note }, ...expenses];
    setExpenses(updated);
    setForm(f => ({ ...f, amount: '', note: '' }));
    setShowForm(false);
  }

  function remove(id: string) { setExpenses(expenses.filter(e => e.id !== id)); }

  const today = new Date().toISOString().slice(0, 10);
  const filtered = catFilter === 'All' ? expenses : expenses.filter(e => e.category === catFilter);

  // Group by date
  const byDate: Record<string, Expense[]> = {};
  for (const e of filtered) {
    if (!byDate[e.date]) byDate[e.date] = [];
    byDate[e.date].push(e);
  }
  const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));

  // Today total by currency
  const todayExp = expenses.filter(e => e.date === today);
  const todayByCur: Record<string, number> = {};
  for (const e of todayExp) { todayByCur[e.currency] = (todayByCur[e.currency] || 0) + e.amount; }

  return (
    <div className="exp-page">
      <div className="exp-header">
        <div>
          <h2 className="exp-title">💸 Expense Tracker</h2>
          <div className="exp-subtitle">Log and review your daily spending</div>
        </div>
        <button className="exp-add-btn" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Cancel' : '+ Add Expense'}
        </button>
      </div>

      {/* Today summary */}
      {Object.keys(todayByCur).length > 0 && (
        <div className="exp-today-bar">
          <span className="exp-today-label">Today</span>
          {Object.entries(todayByCur).map(([cur, total]) => (
            <span key={cur} className="exp-today-total">{fmt(total, cur)}</span>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="exp-form">
          <div className="exp-form-row">
            <div>
              <div className="tpl-form-label">Date</div>
              <input type="date" className="tpl-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <div className="tpl-form-label">Amount *</div>
              <input type="number" className="tpl-input" placeholder="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
            <div>
              <div className="tpl-form-label">Currency</div>
              <select className="tpl-select" style={{ width: '100%' }} value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div className="tpl-form-label">Category</div>
              <select className="tpl-select" style={{ width: '100%' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 2 }}>
              <div className="tpl-form-label">Note (optional)</div>
              <input className="tpl-input" placeholder="e.g. Lunch at Din Tai Fung" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
            </div>
          </div>
          <button className="tpl-create-btn" style={{ marginTop: '10px' }} onClick={add} disabled={!form.amount}>Save Expense</button>
        </div>
      )}

      {/* Category filter */}
      <div className="exp-filter">
        {['All', ...CATEGORIES].map(c => (
          <button key={c} className={`exp-filter-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
        ))}
      </div>

      {/* Expense list */}
      {sortedDates.length === 0 ? (
        <div className="tpl-empty-trip"><span style={{ fontSize: '2.5rem' }}>💸</span><p>No expenses yet. Click <strong>+ Add Expense</strong> to start.</p></div>
      ) : (
        sortedDates.map(date => (
          <div key={date} className="exp-day-group">
            <div className="exp-day-label">
              {date === today ? '📅 Today' : date}
              <span className="exp-day-count">{byDate[date].length} item{byDate[date].length !== 1 ? 's' : ''}</span>
            </div>
            {byDate[date].map(exp => (
              <div key={exp.id} className="exp-row">
                <span className="exp-cat-icon">{exp.category.split(' ')[0]}</span>
                <div className="exp-row-info">
                  <span className="exp-row-cat">{exp.category.slice(2)}</span>
                  {exp.note && <span className="exp-row-note">{exp.note}</span>}
                </div>
                <span className="exp-row-amount">{fmt(exp.amount, exp.currency)}</span>
                <button className="btn-icon" onClick={() => remove(exp.id)} title="Delete">✕</button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

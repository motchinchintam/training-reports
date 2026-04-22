import { useState, useEffect } from 'react';

interface BudgetItem {
  id: string;
  day: string;
  category: string;
  desc: string;
  planned: number;
  actual: number;
  currency: string;
}

interface TripBudget {
  id: string;
  name: string;
  destination: string;
  currency: string;
  totalBudget: number;
  items: BudgetItem[];
  createdAt: string;
}

const LS_KEY = 'finance_trip_budgets';
const CATEGORIES = ['✈️ Flight', '🏨 Hotel', '🍜 Food', '🚌 Transport', '🎭 Activities', '🛍 Shopping', '💊 Health', '📦 Other'];
const CURRENCIES = ['VND', 'TWD', 'USD', 'SGD', 'JPY', 'KRW', 'EUR'];

function uid() { return Math.random().toString(36).slice(2, 10); }
function load(): TripBudget[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(d: TripBudget[]) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
function fmt(n: number, cur: string) {
  if (['VND', 'JPY', 'KRW'].includes(cur)) return `${cur} ${n.toLocaleString()}`;
  return `${cur} ${n.toFixed(2)}`;
}

export default function TripBudgetView() {
  const [budgets, setBudgets] = useState<TripBudget[]>(() => load());
  const [activeBudget, setActiveBudget] = useState<TripBudget | null>(null);
  const [screen, setScreen] = useState<'list' | 'detail'>('list');
  const [showNewForm, setShowNewForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: '', destination: '', currency: 'VND', totalBudget: '' });
  const [newItem, setNewItem] = useState({ day: '', category: CATEGORIES[0], desc: '', planned: '', actual: '', currency: 'VND' });

  useEffect(() => { save(budgets); }, [budgets]);

  function createBudget() {
    if (!newBudget.name.trim()) return;
    const b: TripBudget = { id: uid(), ...newBudget, totalBudget: Number(newBudget.totalBudget) || 0, items: [], createdAt: new Date().toISOString() };
    const updated = [b, ...budgets];
    setBudgets(updated);
    setActiveBudget(b);
    setScreen('detail');
    setNewBudget({ name: '', destination: '', currency: 'VND', totalBudget: '' });
    setShowNewForm(false);
  }

  function addItem() {
    if (!activeBudget || !newItem.desc.trim()) return;
    const item: BudgetItem = { id: uid(), ...newItem, planned: Number(newItem.planned) || 0, actual: Number(newItem.actual) || 0 };
    const updated = budgets.map(b => b.id === activeBudget.id ? { ...b, items: [...b.items, item] } : b);
    setBudgets(updated);
    setActiveBudget(updated.find(b => b.id === activeBudget.id)!);
    setNewItem({ day: '', category: CATEGORIES[0], desc: '', planned: '', actual: '', currency: newItem.currency });
    setShowItemForm(false);
  }

  function deleteItem(itemId: string) {
    if (!activeBudget) return;
    const updated = budgets.map(b => b.id === activeBudget.id ? { ...b, items: b.items.filter(i => i.id !== itemId) } : b);
    setBudgets(updated);
    setActiveBudget(updated.find(b => b.id === activeBudget.id)!);
  }

  function deleteBudget(id: string) {
    if (!confirm('Delete this budget?')) return;
    setBudgets(budgets.filter(b => b.id !== id));
    if (activeBudget?.id === id) { setActiveBudget(null); setScreen('list'); }
  }

  if (screen === 'detail' && activeBudget) {
    const totalPlanned = activeBudget.items.reduce((s, i) => s + i.planned, 0);
    const totalActual = activeBudget.items.reduce((s, i) => s + i.actual, 0);
    const remaining = activeBudget.totalBudget - totalActual;
    const overBudget = remaining < 0;
    const pct = activeBudget.totalBudget > 0 ? Math.min(100, (totalActual / activeBudget.totalBudget) * 100) : 0;

    return (
      <div className="budget-page">
        <div className="budget-page-header">
          <button className="nav-back-btn" onClick={() => setScreen('list')}>← All Budgets</button>
          <div style={{ flex: 1 }}>
            <h2 className="page-title">{activeBudget.name}</h2>
            {activeBudget.destination && <div className="page-subtitle">📍 {activeBudget.destination}</div>}
          </div>
          <button className="btn-danger-sm" onClick={() => deleteBudget(activeBudget.id)}>Delete</button>
        </div>

        <div className="budget-summary-bar">
          <div className="budget-stat">
            <div className="budget-stat-label">Total Budget</div>
            <div className="budget-stat-value">{fmt(activeBudget.totalBudget, activeBudget.currency)}</div>
          </div>
          <div className="budget-stat">
            <div className="budget-stat-label">Planned</div>
            <div className="budget-stat-value" style={{ color: 'var(--v-blue)' }}>{fmt(totalPlanned, activeBudget.currency)}</div>
          </div>
          <div className="budget-stat">
            <div className="budget-stat-label">Spent</div>
            <div className="budget-stat-value" style={{ color: overBudget ? 'var(--v-red)' : 'var(--v-amber)' }}>{fmt(totalActual, activeBudget.currency)}</div>
          </div>
          <div className="budget-stat">
            <div className="budget-stat-label">{overBudget ? 'Over Budget' : 'Remaining'}</div>
            <div className="budget-stat-value" style={{ color: overBudget ? 'var(--v-red)' : 'var(--v-green)' }}>{fmt(Math.abs(remaining), activeBudget.currency)}</div>
          </div>
        </div>

        <div className="budget-progress-wrap">
          <div className="budget-progress-track">
            <div className="budget-progress-fill" style={{ width: `${pct}%`, background: overBudget ? 'var(--v-red)' : pct > 80 ? 'var(--v-amber)' : 'var(--v-teal)' }} />
          </div>
          <span className="budget-progress-pct">{pct.toFixed(0)}% spent</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button className="btn-accent-amber" onClick={() => setShowItemForm(s => !s)}>{showItemForm ? '✕ Cancel' : '+ Add Item'}</button>
        </div>

        {showItemForm && (
          <div className="form-card" style={{ marginBottom: '1rem' }}>
            <div className="form-row-flex">
              <div><label className="form-label">Day / Date</label><input className="form-input" placeholder="e.g. Apr 29" value={newItem.day} onChange={e => setNewItem(f => ({ ...f, day: e.target.value }))} /></div>
              <div><label className="form-label">Category</label>
                <select className="form-select" value={newItem.category} onChange={e => setNewItem(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ flex: 2 }}><label className="form-label">Description *</label><input className="form-input" placeholder="e.g. Flight SGN-TPE" value={newItem.desc} onChange={e => setNewItem(f => ({ ...f, desc: e.target.value }))} /></div>
              <div><label className="form-label">Currency</label>
                <select className="form-select" value={newItem.currency} onChange={e => setNewItem(f => ({ ...f, currency: e.target.value }))}>
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="form-label">Planned</label><input type="number" className="form-input" placeholder="0" value={newItem.planned} onChange={e => setNewItem(f => ({ ...f, planned: e.target.value }))} /></div>
              <div><label className="form-label">Actual</label><input type="number" className="form-input" placeholder="0" value={newItem.actual} onChange={e => setNewItem(f => ({ ...f, actual: e.target.value }))} /></div>
            </div>
            <button className="btn-accent-amber" style={{ marginTop: '10px' }} onClick={addItem} disabled={!newItem.desc.trim()}>Save Item</button>
          </div>
        )}

        {activeBudget.items.length === 0
          ? <div className="empty-state"><span>🧾</span><p>No items yet. Add your first budget item above.</p></div>
          : (
            <table className="budget-table">
              <thead><tr><th>Day</th><th>Category</th><th>Description</th><th>Planned</th><th>Actual</th><th>Diff</th><th></th></tr></thead>
              <tbody>
                {activeBudget.items.map(item => {
                  const diff = item.actual - item.planned;
                  return (
                    <tr key={item.id}>
                      <td>{item.day || '—'}</td>
                      <td>{item.category}</td>
                      <td>{item.desc}</td>
                      <td>{fmt(item.planned, item.currency)}</td>
                      <td>{fmt(item.actual, item.currency)}</td>
                      <td style={{ color: diff > 0 ? 'var(--v-red)' : 'var(--v-green)', fontWeight: 600 }}>{diff > 0 ? '+' : ''}{fmt(diff, item.currency)}</td>
                      <td><button className="btn-icon" onClick={() => deleteItem(item.id)}>✕</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
      </div>
    );
  }

  return (
    <div className="budget-page">
      <div className="budget-page-header">
        <div><h2 className="page-title">🧾 Trip Budget</h2><div className="page-subtitle">Plan spending before your trip, track actuals as you go</div></div>
        <button className="btn-accent-amber" onClick={() => setShowNewForm(s => !s)}>{showNewForm ? '✕ Cancel' : '+ New Budget'}</button>
      </div>

      {showNewForm && (
        <div className="form-card" style={{ marginBottom: '1.5rem', maxWidth: 540 }}>
          <div className="form-row-flex">
            <div style={{ flex: 2 }}><label className="form-label">Trip Name *</label><input className="form-input" placeholder="e.g. Taiwan May 2026" value={newBudget.name} onChange={e => setNewBudget(f => ({ ...f, name: e.target.value }))} /></div>
            <div style={{ flex: 1 }}><label className="form-label">Destination</label><input className="form-input" placeholder="Taipei" value={newBudget.destination} onChange={e => setNewBudget(f => ({ ...f, destination: e.target.value }))} /></div>
          </div>
          <div className="form-row-flex" style={{ marginTop: 10 }}>
            <div><label className="form-label">Currency</label>
              <select className="form-select" value={newBudget.currency} onChange={e => setNewBudget(f => ({ ...f, currency: e.target.value }))}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}><label className="form-label">Total Budget</label><input type="number" className="form-input" placeholder="0" value={newBudget.totalBudget} onChange={e => setNewBudget(f => ({ ...f, totalBudget: e.target.value }))} /></div>
          </div>
          <button className="btn-accent-amber" style={{ marginTop: 12 }} onClick={createBudget} disabled={!newBudget.name.trim()}>Create Budget</button>
        </div>
      )}

      {budgets.length === 0
        ? <div className="empty-state"><span>🧾</span><p>No trip budgets yet. Create one to start planning!</p></div>
        : <div className="card-grid">
            {budgets.map(b => {
              const spent = b.items.reduce((s, i) => s + i.actual, 0);
              const pct = b.totalBudget > 0 ? Math.min(100, (spent / b.totalBudget) * 100) : 0;
              return (
                <div key={b.id} className="budget-list-card" onClick={() => { setActiveBudget(b); setScreen('detail'); }}>
                  <div className="budget-list-card-top">
                    <div><div className="budget-list-name">{b.name}</div>{b.destination && <div className="budget-list-dest">📍 {b.destination}</div>}</div>
                    <button className="btn-icon" onClick={e => { e.stopPropagation(); deleteBudget(b.id); }}>🗑</button>
                  </div>
                  <div className="budget-progress-track" style={{ marginTop: 8 }}>
                    <div className="budget-progress-fill" style={{ width: `${pct}%`, background: pct > 100 ? 'var(--v-red)' : pct > 80 ? 'var(--v-amber)' : 'var(--v-teal)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 5, color: 'var(--tx2)' }}>
                    <span>{fmt(spent, b.currency)} spent</span>
                    <span>of {fmt(b.totalBudget, b.currency)}</span>
                  </div>
                  <div className="budget-list-footer">{b.items.length} items · Open →</div>
                </div>
              );
            })}
          </div>}
    </div>
  );
}

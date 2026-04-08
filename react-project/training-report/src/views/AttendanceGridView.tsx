import { useState } from 'react';

const STATUS_CYCLE = ['', 'P', 'A', 'L'] as const;
type AttStatus = '' | 'P' | 'A' | 'L';

interface AttTrainee { id: number; name: string; }

const defaultTrainees: AttTrainee[] = [
  { id: 1, name: 'Trainee 1' },
  { id: 2, name: 'Trainee 2' },
  { id: 3, name: 'Trainee 3' },
];

function buildGrid(trainees: AttTrainee[], days: number, existing: Record<number, Record<number, AttStatus>>) {
  const g: Record<number, Record<number, AttStatus>> = {};
  trainees.forEach(t => {
    g[t.id] = {};
    for (let d = 1; d <= days; d++) {
      g[t.id][d] = existing[t.id]?.[d] ?? '';
    }
  });
  return g;
}

function getDayDate(day: number, startDate: string): string {
  if (!startDate) return 'Day ' + day;
  const d = new Date(startDate);
  d.setDate(d.getDate() + day - 1);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function getRate(grid: Record<number, Record<number, AttStatus>>, tid: number): number | null {
  const days = Object.values(grid[tid] || {});
  const marked = days.filter(s => s !== '');
  const present = days.filter(s => s === 'P').length;
  if (!marked.length) return null;
  return Math.round(present / marked.length * 100);
}

export default function AttendanceGridView() {
  const [cohort, setCohort] = useState('');
  const [totalDays, setTotalDays] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [trainees, setTrainees] = useState<AttTrainee[]>(defaultTrainees);
  const [grid, setGrid] = useState<Record<number, Record<number, AttStatus>>>(() =>
    buildGrid(defaultTrainees, 10, {}));
  const [traineeCounter, setTraineeCounter] = useState(3);
  const [toast, setToast] = useState(false);

  function showToast() { setToast(true); setTimeout(() => setToast(false), 2000); }

  function updateDays(n: number) {
    const days = Math.max(1, Math.min(90, n));
    setTotalDays(days);
    setGrid(prev => buildGrid(trainees, days, prev));
  }

  function addTrainee() {
    const nc = traineeCounter + 1;
    setTraineeCounter(nc);
    const newT: AttTrainee = { id: nc, name: 'Trainee ' + nc };
    const newTrainees = [...trainees, newT];
    setTrainees(newTrainees);
    setGrid(prev => {
      const g = { ...prev, [nc]: {} as Record<number, AttStatus> };
      for (let d = 1; d <= totalDays; d++) g[nc][d] = '';
      return g;
    });
  }

  function removeTrainee(id: number) {
    setTrainees(prev => prev.filter(t => t.id !== id));
    setGrid(prev => {
      const g = { ...prev };
      delete g[id];
      return g;
    });
  }

  function setTraineeName(id: number, name: string) {
    setTrainees(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  }

  function cycleCell(tid: number, day: number) {
    setGrid(prev => {
      const cur = prev[tid]?.[day] ?? '';
      const idx = STATUS_CYCLE.indexOf(cur as AttStatus);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return { ...prev, [tid]: { ...prev[tid], [day]: next } };
    });
  }

  // Summary
  const total = trainees.length;
  const allRates = trainees.map(t => getRate(grid, t.id)).filter((r): r is number => r !== null);
  const avgRate = allRates.length ? Math.round(allRates.reduce((a, b) => a + b, 0) / allRates.length) : 0;
  const perfect = allRates.filter(r => r === 100).length;
  const atRisk = allRates.filter(r => r < 70).length;

  function copyReport() {
    const lines = [`ATTENDANCE REPORT\nCohort: ${cohort || '—'} | Total days: ${totalDays}\n`];
    trainees.forEach(tr => {
      const rate = getRate(grid, tr.id);
      const days: string[] = [];
      for (let d = 1; d <= totalDays; d++) days.push(grid[tr.id]?.[d] || '—');
      lines.push(`${tr.name.padEnd(22)}[${days.join(' ')}]  Rate: ${rate !== null ? rate + '%' : '—'}`);
    });
    navigator.clipboard.writeText(lines.join('\n')).then(showToast);
  }

  const attCellClass = (s: AttStatus) => {
    if (s === 'P') return 'att-P';
    if (s === 'A') return 'att-A';
    if (s === 'L') return 'att-L';
    return 'att-blank';
  };

  const rateClass = (r: number | null) => {
    if (r === null) return '';
    if (r >= 90) return 'rate-good';
    if (r >= 70) return 'rate-mid';
    return 'rate-bad';
  };

  return (
    <div className="view">
      <h2 className="view-title">Attendance Tracker</h2>

      {/* Settings */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Settings</span></div>
        <div className="tt-card-body">
          <div className="tt-settings-grid">
            <div className="tt-field">
              <label>Cohort / Group</label>
              <input value={cohort} onChange={e => setCohort(e.target.value)} placeholder="e.g. Technical Support Batch 1" />
            </div>
            <div className="tt-field">
              <label>Total training days</label>
              <input type="number" min={1} max={90} value={totalDays}
                onChange={e => updateDays(parseInt(e.target.value) || 10)} />
            </div>
            <div className="tt-field">
              <label>Start date</label>
              <input type="date" value={startDate}
                onChange={e => setStartDate(e.target.value)} />
            </div>
          </div>
          <div className="att-legend">
            <div className="att-legend-item"><div className="att-dot dot-P"></div>P = Present</div>
            <div className="att-legend-item"><div className="att-dot dot-A"></div>A = Absent</div>
            <div className="att-legend-item"><div className="att-dot dot-L"></div>L = Late</div>
            <div className="att-legend-item"><div className="att-dot dot-blank"></div>— = Not marked</div>
            <span className="att-legend-hint">Click a cell to cycle status</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Attendance grid</span></div>
        <div className="att-scroll-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th className="att-name-th">Name</th>
                {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => (
                  <th key={d}>{getDayDate(d, startDate)}</th>
                ))}
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainees.map(tr => {
                const rate = getRate(grid, tr.id);
                return (
                  <tr key={tr.id}>
                    <td className="att-name-cell">
                      <input className="att-name-input" value={tr.name}
                        onChange={e => setTraineeName(tr.id, e.target.value)} />
                    </td>
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => {
                      const s = grid[tr.id]?.[d] ?? '';
                      return (
                        <td key={d}>
                          <div className={`att-cell ${attCellClass(s as AttStatus)}`}
                            onClick={() => cycleCell(tr.id, d)}>
                            {s || '—'}
                          </div>
                        </td>
                      );
                    })}
                    <td>
                      <span className={`att-rate ${rateClass(rate)}`}>
                        {rate !== null ? rate + '%' : '—'}
                      </span>
                    </td>
                    <td>
                      <button className="tt-del-btn" onClick={() => removeTrainee(tr.id)}>✕</button>
                    </td>
                  </tr>
                );
              })}
              <tr className="att-day-total-row">
                <td className="att-day-total-label">Day total</td>
                {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => {
                  const present = trainees.filter(t => grid[t.id]?.[d] === 'P').length;
                  return <td key={d} className="att-day-total-cell">{present}/{trainees.length}</td>;
                })}
                <td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="att-add-wrap">
          <button className="tt-add-btn" onClick={addTrainee}>+ Add trainee</button>
        </div>
      </div>

      {/* Summary */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-green">Summary</span></div>
        <div className="tt-card-body">
          <div className="tt-summary-grid">
            <div className="tt-stat"><div className="tt-stat-label">Total trainees</div><div className="tt-stat-value">{total}</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Avg attendance</div><div className="tt-stat-value">{avgRate}%</div><div className="tt-stat-sub">across all trainees</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Perfect attendance</div><div className="tt-stat-value" style={{ color: 'var(--green)' }}>{perfect}</div><div className="tt-stat-sub">100% present</div></div>
            <div className="tt-stat"><div className="tt-stat-label">At risk</div><div className="tt-stat-value" style={{ color: 'var(--red)' }}>{atRisk}</div><div className="tt-stat-sub">below 70% attendance</div></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="tt-actions">
        <button className="tt-btn tt-btn-outline" onClick={copyReport}>Copy report</button>
        <button className="tt-btn tt-btn-primary" onClick={() => window.print()}>Print / Export PDF</button>
      </div>

      {toast && <div className="tt-toast show">Copied!</div>}
    </div>
  );
}

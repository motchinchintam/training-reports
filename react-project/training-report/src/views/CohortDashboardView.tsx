import { useState } from 'react';

const PHASES = [
  { id: 'orientation', label: 'Orientation', days: 'Day 1–2', color: 'blue' },
  { id: 'phase1', label: 'Phase 1', days: 'Day 3–5', color: 'blue' },
  { id: 'phase2', label: 'Phase 2', days: 'Day 6–10', color: 'teal' },
  { id: 'fullstack', label: 'Full-stack', days: 'Month 1–2', color: 'purple' },
  { id: 'graduated', label: 'Graduated', days: 'Complete', color: 'green' },
] as const;

const STATUSES = ['active', 'watch', 'dropped', 'graduated'] as const;
type CStatus = typeof STATUSES[number];
type Phase = typeof PHASES[number]['id'];

interface CohortTrainee {
  id: number; name: string; phase: Phase; status: CStatus;
  score: string; attendance: string; note: string;
}

const defaultTrainees: CohortTrainee[] = [
  { id: 1, name: 'Nguyen Van A', phase: 'phase2', status: 'active', score: '85', attendance: '95', note: '' },
  { id: 2, name: 'Tran Thi B', phase: 'phase2', status: 'active', score: '78', attendance: '90', note: '' },
  { id: 3, name: 'Le Van C', phase: 'phase1', status: 'watch', score: '62', attendance: '80', note: 'Needs attention' },
  { id: 4, name: 'Pham Thi D', phase: 'fullstack', status: 'active', score: '91', attendance: '100', note: 'Top performer' },
  { id: 5, name: 'Hoang Van E', phase: 'orientation', status: 'dropped', score: '40', attendance: '60', note: 'Resigned' },
  { id: 6, name: 'Do Thi F', phase: 'fullstack', status: 'active', score: '88', attendance: '92', note: '' },
  { id: 7, name: 'Bui Van G', phase: 'phase2', status: 'active', score: '74', attendance: '88', note: '' },
  { id: 8, name: 'Vo Thi H', phase: 'graduated', status: 'graduated', score: '93', attendance: '98', note: '' },
];

const STATUS_LABELS: Record<CStatus, string> = { active: 'Active', watch: 'Watch', dropped: 'Dropped', graduated: 'Graduated' };

export default function CohortDashboardView() {
  const [cohortName, setCohortName] = useState('');
  const [cohortDate, setCohortDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainees, setTrainees] = useState<CohortTrainee[]>(defaultTrainees);
  const [tc, setTc] = useState(8);
  const [toast, setToast] = useState(false);

  function showToast() { setToast(true); setTimeout(() => setToast(false), 2000); }

  function addTrainee() {
    const nc = tc + 1;
    setTc(nc);
    setTrainees(prev => [...prev, { id: nc, name: 'Trainee ' + nc, phase: 'orientation', status: 'active', score: '', attendance: '', note: '' }]);
  }

  function removeTrainee(id: number) {
    setTrainees(prev => prev.filter(t => t.id !== id));
  }

  function updateField(id: number, field: keyof CohortTrainee, val: string) {
    setTrainees(prev => prev.map(t => t.id === id ? { ...t, [field]: val } : t));
  }

  // Stats
  const total = trainees.length;
  const active = trainees.filter(t => t.status === 'active').length;
  const watch = trainees.filter(t => t.status === 'watch').length;
  const dropped = trainees.filter(t => t.status === 'dropped').length;
  const graduated = trainees.filter(t => t.status === 'graduated').length;
  const scores = trainees.map(t => parseFloat(t.score)).filter(s => !isNaN(s));
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  function copyReport() {
    const date = cohortDate ? new Date(cohortDate).toLocaleDateString('en-GB') : '—';
    const lines = [`TRAINING COHORT DASHBOARD\nCohort: ${cohortName || '—'} | Date: ${date}\n`];
    PHASES.forEach(ph => {
      const pT = trainees.filter(t => t.phase === ph.id);
      if (pT.length) {
        lines.push(`\n[${ph.label}]`);
        pT.forEach(t => lines.push(`  ${t.name.padEnd(20)}${STATUS_LABELS[t.status].padEnd(12)}Score: ${t.score || '—'}%  Att: ${t.attendance || '—'}%${t.note ? ' | ' + t.note : ''}`));
      }
    });
    navigator.clipboard.writeText(lines.join('\n')).then(showToast);
  }

  const phaseColorVar = (color: string) => `var(--${color})`;

  return (
    <div className="view">
      <div className="cohort-topbar">
        <div>
          <h2 className="view-title" style={{ marginBottom: '3px' }}>Training Cohort Dashboard</h2>
          <div style={{ fontSize: '13px', color: 'var(--tx2)' }}>Full pipeline — from orientation to full-stack</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input className="cohort-input" value={cohortName} onChange={e => setCohortName(e.target.value)} placeholder="Cohort name..." />
          <input type="date" className="cohort-input" value={cohortDate} onChange={e => setCohortDate(e.target.value)} />
        </div>
      </div>

      {/* Overview */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Overview</span></div>
        <div className="tt-card-body">
          <div className="cohort-stats-grid">
            <div className="tt-stat"><div className="tt-stat-label">Total enrolled</div><div className="tt-stat-value">{total}</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Active</div><div className="tt-stat-value" style={{ color: 'var(--green)' }}>{active}</div><div className="tt-stat-sub">in training</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Watch list</div><div className="tt-stat-value" style={{ color: 'var(--amber)' }}>{watch}</div><div className="tt-stat-sub">needs attention</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Dropped</div><div className="tt-stat-value" style={{ color: 'var(--red)' }}>{dropped}</div><div className="tt-stat-sub">{total ? Math.round(dropped / total * 100) : 0}% drop rate</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Graduated</div><div className="tt-stat-value" style={{ color: 'var(--teal)' }}>{graduated}</div><div className="tt-stat-sub">avg score {avgScore}%</div></div>
          </div>

          {/* Pipeline */}
          <div style={{ fontSize: '12px', color: 'var(--tx3)', marginBottom: '8px' }}>Training pipeline</div>
          <div className="cohort-pipeline">
            {PHASES.map((ph, i) => {
              const active_t = trainees.filter(t => t.phase === ph.id && t.status !== 'dropped');
              const dropped_t = trainees.filter(t => t.phase === ph.id && t.status === 'dropped').length;
              return (
                <div key={ph.id} style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div className="cohort-phase-col">
                    <div className="cohort-phase-head" style={{ color: phaseColorVar(ph.color) }}>
                      {ph.label}<br />
                      <span style={{ fontSize: '11px', color: 'var(--tx3)', fontWeight: 400 }}>{ph.days}</span>
                    </div>
                    <div className="cohort-phase-body">
                      {active_t.map(t => (
                        <div key={t.id} className={`cohort-chip chip-${t.status}`}>
                          <div className="cohort-chip-dot" />{t.name}
                        </div>
                      ))}
                      <div className="cohort-phase-count">
                        {active_t.length} active{dropped_t ? ` · ${dropped_t} dropped` : ''}
                      </div>
                    </div>
                  </div>
                  {i < PHASES.length - 1 && <div className="cohort-arrow">›</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roster */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-teal">Trainee roster</span>
          <span style={{ fontSize: '12px', color: 'var(--tx3)', marginLeft: 'auto' }}>Edit phase, status, and score for each trainee</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cohort-table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Current phase</th><th>Status</th>
                <th>Score (%)</th><th>Attendance (%)</th><th>Note</th><th></th>
              </tr>
            </thead>
            <tbody>
              {trainees.map((t, i) => {
                const scoreNum = parseFloat(t.score);
                const barW = !isNaN(scoreNum) ? Math.min(100, scoreNum) : 0;
                return (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--tx3)', fontSize: '12px' }}>{i + 1}</td>
                    <td>
                      <input className="cohort-name-input" value={t.name}
                        onChange={e => updateField(t.id, 'name', e.target.value)} />
                    </td>
                    <td>
                      <select className="cohort-cinput" value={t.phase}
                        onChange={e => updateField(t.id, 'phase', e.target.value)}>
                        {PHASES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                      </select>
                    </td>
                    <td>
                      <select className="cohort-cinput" value={t.status}
                        onChange={e => updateField(t.id, 'status', e.target.value as CStatus)}>
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div className="cohort-mini-bar"><div className="cohort-mini-fill" style={{ width: barW + '%' }} /></div>
                        <input className="cohort-cinput" type="number" min={0} max={100} value={t.score}
                          placeholder="—" style={{ width: '50px', textAlign: 'center' }}
                          onChange={e => updateField(t.id, 'score', e.target.value)} />
                      </div>
                    </td>
                    <td>
                      <input className="cohort-cinput" type="number" min={0} max={100} value={t.attendance}
                        placeholder="—" style={{ width: '60px', textAlign: 'center' }}
                        onChange={e => updateField(t.id, 'attendance', e.target.value)} />
                    </td>
                    <td>
                      <input value={t.note} placeholder="Note..."
                        onChange={e => updateField(t.id, 'note', e.target.value)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--tx2)', fontSize: '12px', fontFamily: 'inherit', outline: 'none', width: '120px' }} />
                    </td>
                    <td>
                      <button className="tt-del-btn" onClick={() => removeTrainee(t.id)}>✕</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 18px', borderTop: '0.5px solid var(--bd)' }}>
          <button className="tt-add-btn" onClick={addTrainee}>+ Add trainee</button>
        </div>
      </div>

      <div className="tt-actions">
        <button className="tt-btn tt-btn-outline" onClick={copyReport}>Copy report</button>
        <button className="tt-btn tt-btn-primary" onClick={() => window.print()}>Print / Export PDF</button>
      </div>

      {toast && <div className="tt-toast show">Copied!</div>}
    </div>
  );
}

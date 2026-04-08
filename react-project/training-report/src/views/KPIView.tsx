import { useState } from 'react';

interface KPIItem { id: number; name: string; target: number; actual: string; unit: string; }

const defaultKPIs: KPIItem[] = [
  { id: 1, name: 'Training days completed', target: 10, actual: '', unit: 'days' },
  { id: 2, name: 'Trainees passing mid-test', target: 80, actual: '', unit: '%' },
  { id: 3, name: 'Attendance rate', target: 90, actual: '', unit: '%' },
  { id: 4, name: 'Trainees advancing to full-stack', target: 8, actual: '', unit: 'people' },
];

type KPIStatus = 'complete' | 'on-track' | 'at-risk' | 'behind' | 'pending';

function getStatus(target: number, actual: string): KPIStatus {
  if (actual === '' || actual === null) return 'pending';
  const t = parseFloat(String(target)), a = parseFloat(actual);
  if (isNaN(t) || isNaN(a)) return 'pending';
  const pct = a / t;
  if (pct >= 1) return 'complete';
  if (pct >= 0.85) return 'on-track';
  if (pct >= 0.6) return 'at-risk';
  return 'behind';
}

const STATUS_LABELS: Record<KPIStatus, string> = {
  complete: 'Complete', 'on-track': 'On track', 'at-risk': 'At risk', behind: 'Behind', pending: 'Pending'
};
const BAR_COLORS: Record<KPIStatus, string> = {
  'on-track': '#185FA5', 'at-risk': '#854F0B', behind: '#A32D2D', complete: '#0F6E56', pending: '#B4B2A9'
};

export default function KPIView() {
  const [program, setProgram] = useState('');
  const [period, setPeriod] = useState('');
  const [owner, setOwner] = useState('');
  const [kpis, setKpis] = useState<KPIItem[]>(defaultKPIs);
  const [kpiCounter, setKpiCounter] = useState(4);
  const [toast, setToast] = useState(false);

  function showToast() { setToast(true); setTimeout(() => setToast(false), 2000); }

  function addKPI() {
    const nc = kpiCounter + 1;
    setKpiCounter(nc);
    setKpis(prev => [...prev, { id: nc, name: 'New KPI', target: 100, actual: '', unit: '' }]);
  }

  function removeKPI(id: number) {
    setKpis(prev => prev.filter(k => k.id !== id));
  }

  function updateKPI(id: number, field: keyof KPIItem, val: string | number) {
    setKpis(prev => prev.map(k => k.id === id ? { ...k, [field]: val } : k));
  }

  // Summary
  const total = kpis.length;
  const complete = kpis.filter(k => getStatus(k.target, k.actual) === 'complete').length;
  const onTrack = kpis.filter(k => getStatus(k.target, k.actual) === 'on-track').length;
  const behind = kpis.filter(k => ['behind', 'at-risk'].includes(getStatus(k.target, k.actual))).length;

  function copyReport() {
    const lines = [`KPI & TARGET REPORT\nProgram: ${program || '—'} | Period: ${period || '—'} | Owner: ${owner || '—'}\n`];
    kpis.forEach((k, i) => {
      const s = getStatus(k.target, k.actual);
      const pct = k.actual !== '' ? Math.min(100, Math.round(parseFloat(k.actual) / k.target * 100)) : null;
      lines.push(`${i + 1}. ${k.name}\n   Target: ${k.target} ${k.unit} | Actual: ${k.actual || '—'} | ${pct !== null ? pct + '%' : ''} | ${STATUS_LABELS[s]}`);
    });
    navigator.clipboard.writeText(lines.join('\n')).then(showToast);
  }

  return (
    <div className="view">
      <h2 className="view-title">KPI & Target Tracker</h2>

      {/* Report info */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Report info</span></div>
        <div className="tt-card-body">
          <div className="tt-settings-grid">
            <div className="tt-field"><label>Team / Program</label>
              <input value={program} onChange={e => setProgram(e.target.value)} placeholder="e.g. Technical Support Training" /></div>
            <div className="tt-field"><label>Period</label>
              <input value={period} onChange={e => setPeriod(e.target.value)} placeholder="e.g. Week 1 – Apr 2026" /></div>
            <div className="tt-field"><label>Owner</label>
              <input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Your name" /></div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-blue">KPIs</span>
          <span className="kpi-hint">Enter target & actual — status auto-calculates</span>
        </div>
        <div className="tt-card-body" style={{ padding: '12px 14px' }}>
          <div className="kpi-header-row">
            <div>KPI name</div><div>Target</div><div>Actual</div><div className="kpi-hide-sm">Unit</div><div>Status</div>
          </div>
          <div className="kpi-list">
            {kpis.map(k => {
              const status = getStatus(k.target, k.actual);
              const pct = k.actual !== '' && k.target > 0
                ? Math.min(100, Math.round(parseFloat(k.actual) / k.target * 100)) : 0;
              const barColor = BAR_COLORS[status];
              return (
                <div key={k.id} className="kpi-item">
                  <div className="kpi-top-row">
                    <input className="kpi-cinput" value={k.name}
                      onChange={e => updateKPI(k.id, 'name', e.target.value)} placeholder="KPI name" />
                    <input className="kpi-cinput" type="number" value={k.target}
                      onChange={e => updateKPI(k.id, 'target', parseFloat(e.target.value) || 0)}
                      placeholder="Target" />
                    <input className="kpi-cinput" type="number" value={k.actual}
                      onChange={e => updateKPI(k.id, 'actual', e.target.value)}
                      placeholder="Actual" />
                    <input className="kpi-cinput kpi-hide-sm" value={k.unit}
                      onChange={e => updateKPI(k.id, 'unit', e.target.value)} placeholder="Unit" />
                    <div className="kpi-status-wrap">
                      <span className={`kpi-status-pill kpi-s-${status}`}>{STATUS_LABELS[status]}</span>
                      <button className="tt-del-btn" onClick={() => removeKPI(k.id)}>✕</button>
                    </div>
                  </div>
                  <div className="kpi-bar-wrap">
                    <div className="kpi-bar-label">
                      <span>{k.actual !== '' ? k.actual : 0} / {k.target} {k.unit}</span>
                      <span className="kpi-bar-pct">{k.actual !== '' ? pct + '%' : '—'}</span>
                    </div>
                    <div className="kpi-bar-track">
                      <div className="kpi-bar-fill" style={{ width: pct + '%', background: barColor }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="tt-add-btn" style={{ marginTop: '4px' }} onClick={addKPI}>+ Add KPI</button>
        </div>
      </div>

      {/* Summary */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-green">Summary</span></div>
        <div className="tt-card-body">
          <div className="tt-summary-grid">
            <div className="tt-stat"><div className="tt-stat-label">Total KPIs</div><div className="tt-stat-value">{total}</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Completed</div><div className="tt-stat-value" style={{ color: 'var(--teal)' }}>{complete}</div><div className="tt-stat-sub">target met</div></div>
            <div className="tt-stat"><div className="tt-stat-label">On track</div><div className="tt-stat-value" style={{ color: 'var(--blue)' }}>{onTrack}</div><div className="tt-stat-sub">≥ 85% of target</div></div>
            <div className="tt-stat"><div className="tt-stat-label">Behind / at risk</div><div className="tt-stat-value" style={{ color: 'var(--red)' }}>{behind}</div><div className="tt-stat-sub">needs attention</div></div>
          </div>
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

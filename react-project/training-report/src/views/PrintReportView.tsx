import { useState } from 'react';

interface KPIBox { val: string; lbl: string; }
interface ProgItem { name: string; actual: number; max: number; color: string; }
interface TraineeRow { name: string; status: 'pass' | 'watch' | 'drop'; score: string; note: string; }

const defaultKPIs: KPIBox[] = [
  { val: '8', lbl: 'Days completed' },
  { val: '10', lbl: 'Total trainees' },
  { val: '80%', lbl: 'Pass rate' },
  { val: '20%', lbl: 'Drop rate' },
];

const defaultProg: ProgItem[] = [
  { name: 'Training days completed', actual: 8, max: 10, color: '#185FA5' },
  { name: 'Average attendance rate', actual: 90, max: 100, color: '#3B6D11' },
  { name: 'Average test score', actual: 75, max: 100, color: '#854F0B' },
];

const defaultTrainees: TraineeRow[] = [
  { name: 'Nguyen Van A', status: 'pass', score: '85%', note: 'Strong performance' },
  { name: 'Tran Thi B', status: 'pass', score: '78%', note: '' },
  { name: 'Le Van C', status: 'watch', score: '63%', note: 'Needs support' },
  { name: 'Pham Thi D', status: 'pass', score: '91%', note: 'Top performer' },
  { name: 'Hoang Van E', status: 'drop', score: '—', note: 'Resigned day 3' },
];

const defaultResults = [
  'Completed 8 of 10 training days on schedule.',
  'Mid-term assessment on Day 5 — 4 of 5 trainees passed with scores above 70%.',
  'Average attendance rate maintained at 90% across the cohort.',
];

const defaultPlans = [
  'Complete final 2 training days and full-stack onboarding for passing trainees.',
  'Conduct final assessment on Day 10 to determine advancement eligibility.',
  'Prepare individual development plans for trainees on the watch list.',
];

const defaultIssues = [
  'Drop rate of 20% (2 of 10 trainees) due to self-withdrawal and performance gaps.',
  'One trainee on watch list requires additional mentoring — support requested.',
];

const STATUS_MAP = { pass: { cls: 'pr-tag-pass', lbl: 'Passing' }, watch: { cls: 'pr-tag-watch', lbl: 'Watch' }, drop: { cls: 'pr-tag-drop', lbl: 'Dropped' } };

const now = new Date();
const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

export default function PrintReportView() {
  const [kpis, setKpis] = useState<KPIBox[]>(defaultKPIs);
  const [prog, setProg] = useState<ProgItem[]>(defaultProg);
  const [trainees, setTrainees] = useState<TraineeRow[]>(defaultTrainees);
  const [results, setResults] = useState<string[]>(defaultResults);
  const [plans, setPlans] = useState<string[]>(defaultPlans);
  const [issues, setIssues] = useState<string[]>(defaultIssues);
  const [reporter, setReporter] = useState('Your name');
  const [receiver, setReceiver] = useState('HR Manager');
  const [periodText, setPeriodText] = useState('07 – 13 Apr 2026');
  const [phaseText, setPhaseText] = useState('10-day Technical Support Training');
  const [org, setOrg] = useState('Company / Department Name');
  const [title, setTitle] = useState('Weekly Training Progress Report');

  function updateKPI(i: number, field: keyof KPIBox, val: string) {
    setKpis(prev => prev.map((k, idx) => idx === i ? { ...k, [field]: val } : k));
  }

  function updateProg(i: number, field: keyof ProgItem, val: string) {
    setProg(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: field === 'name' ? val : parseFloat(val) || 0 } : p));
  }

  function updateTrainee(i: number, field: keyof TraineeRow, val: string) {
    setTrainees(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  }

  function updateBullet(list: string[], setList: (v: string[]) => void, i: number, val: string) {
    setList(list.map((x, idx) => idx === i ? val : x));
  }

  function addTraineeRow() {
    setTrainees(prev => [...prev, { name: 'New trainee', status: 'pass', score: '—', note: '' }]);
  }

  function addBullet(list: string[], setList: (v: string[]) => void) {
    setList([...list, '']);
  }

  function removeBullet(list: string[], setList: (v: string[]) => void, i: number) {
    setList(list.filter((_, idx) => idx !== i));
  }

  function resetDefaults() {
    setKpis(defaultKPIs);
    setProg(defaultProg);
    setTrainees(defaultTrainees);
    setResults(defaultResults);
    setPlans(defaultPlans);
    setIssues(defaultIssues);
    setReporter('Your name');
    setReceiver('HR Manager');
    setPeriodText('07 – 13 Apr 2026');
    setPhaseText('10-day Technical Support Training');
    setOrg('Company / Department Name');
    setTitle('Weekly Training Progress Report');
  }

  function clearAll() {
    setKpis([{ val: '—', lbl: 'Metric 1' }, { val: '—', lbl: 'Metric 2' }, { val: '—', lbl: 'Metric 3' }, { val: '—', lbl: 'Metric 4' }]);
    setProg([{ name: 'Progress item 1', actual: 0, max: 100, color: '#185FA5' }, { name: 'Progress item 2', actual: 0, max: 100, color: '#3B6D11' }]);
    setTrainees([]);
    setResults([]);
    setPlans([]);
    setIssues([]);
    setReporter('');
    setReceiver('');
    setPeriodText('');
    setPhaseText('');
    setOrg('');
    setTitle('');
  }

  function BulletList({ items, setItems }: { items: string[]; setItems: (v: string[]) => void }) {
    return (
      <ul className="pr-bullet-list">
        {items.map((text, i) => (
          <li key={i} className="pr-bullet-item">
            <span className="pr-bullet-dot">•</span>
            <input className="pr-edit-field" value={text} placeholder="Type here..."
              onChange={e => updateBullet(items, setItems, i, e.target.value)} />
            <button className="pr-del-btn" onClick={() => removeBullet(items, setItems, i)}>✕</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="view pr-view">
      <div className="pr-controls">
        <div className="pr-ctrl-title">Print-Ready Report</div>
        <button className="pr-btn" onClick={resetDefaults}>Reset to sample</button>
        <button className="pr-btn" onClick={clearAll}>Clear all</button>
        <button className="pr-btn pr-btn-primary" onClick={() => window.print()}>Print / Export PDF</button>
      </div>

      <div className="pr-page">
        {/* Header */}
        <div className="pr-header">
          <div>
            <input className="pr-org-input" value={org} onChange={e => setOrg(e.target.value)} placeholder="Company / Department Name" />
            <input className="pr-title-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Report title" />
          </div>
          <div className="pr-meta">
            <div className="pr-meta-row"><strong>Reporter:</strong> <input className="pr-meta-input" value={reporter} onChange={e => setReporter(e.target.value)} /></div>
            <div className="pr-meta-row"><strong>Submitted to:</strong> <input className="pr-meta-input" value={receiver} onChange={e => setReceiver(e.target.value)} /></div>
            <div className="pr-meta-row"><strong>Period:</strong> <input className="pr-meta-input" value={periodText} onChange={e => setPeriodText(e.target.value)} /></div>
            <div className="pr-meta-row"><strong>Date:</strong> <span>{dateStr}</span></div>
            <div className="pr-meta-row"><strong>Phase:</strong> <input className="pr-meta-input" value={phaseText} onChange={e => setPhaseText(e.target.value)} /></div>
          </div>
        </div>

        <div className="pr-body">
          {/* Key metrics */}
          <div className="pr-section">
            <div className="pr-section-title">Key metrics</div>
            <div className="pr-kpi-grid">
              {kpis.map((k, i) => (
                <div key={i} className="pr-kpi-box">
                  <input className="pr-kpi-val-input" value={k.val} onChange={e => updateKPI(i, 'val', e.target.value)} />
                  <input className="pr-kpi-lbl-input" value={k.lbl} onChange={e => updateKPI(i, 'lbl', e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* Progress tracker */}
          <div className="pr-section">
            <div className="pr-section-title">Progress tracker</div>
            {prog.map((p, i) => {
              const pct = Math.min(100, Math.round(p.actual / (p.max || 1) * 100));
              return (
                <div key={i} className="pr-prog-item">
                  <div className="pr-prog-row">
                    <input className="pr-prog-name-input" value={p.name} onChange={e => updateProg(i, 'name', e.target.value)} />
                    <div className="pr-prog-controls">
                      <input className="pr-prog-input" type="number" min={0} value={p.actual}
                        onChange={e => updateProg(i, 'actual', e.target.value)} />
                      <span className="pr-prog-sep">/</span>
                      <input className="pr-prog-input" type="number" min={1} value={p.max}
                        onChange={e => updateProg(i, 'max', e.target.value)} />
                      <span className="pr-prog-pct">{pct}%</span>
                    </div>
                  </div>
                  <div className="pr-prog-track">
                    <div className="pr-prog-fill" style={{ width: pct + '%', background: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trainee status */}
          <div className="pr-section">
            <div className="pr-section-title">Trainee status</div>
            <table className="pr-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Status</th><th>Score</th><th>Note</th><th></th></tr>
              </thead>
              <tbody>
                {trainees.map((t, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--tx3)', fontSize: '12px' }}>{i + 1}</td>
                    <td><input className="pr-td-input" value={t.name} onChange={e => updateTrainee(i, 'name', e.target.value)} /></td>
                    <td>
                      <select className={`pr-status-tag ${STATUS_MAP[t.status].cls}`} value={t.status}
                        onChange={e => updateTrainee(i, 'status', e.target.value)}>
                        <option value="pass">Passing</option>
                        <option value="watch">Watch</option>
                        <option value="drop">Dropped</option>
                      </select>
                    </td>
                    <td><input className="pr-td-input" value={t.score} onChange={e => updateTrainee(i, 'score', e.target.value)} /></td>
                    <td><input className="pr-td-input" value={t.note} onChange={e => updateTrainee(i, 'note', e.target.value)} /></td>
                    <td><button className="pr-del-btn" onClick={() => setTrainees(prev => prev.filter((_, idx) => idx !== i))}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="pr-add-btn" onClick={addTraineeRow}>+ Add trainee</button>
          </div>

          {/* Results */}
          <div className="pr-section">
            <div className="pr-section-title">Results this period</div>
            <BulletList items={results} setItems={setResults} />
            <button className="pr-add-btn" onClick={() => addBullet(results, setResults)}>+ Add item</button>
          </div>

          {/* Plans */}
          <div className="pr-section">
            <div className="pr-section-title">Plans for next period</div>
            <BulletList items={plans} setItems={setPlans} />
            <button className="pr-add-btn" onClick={() => addBullet(plans, setPlans)}>+ Add item</button>
          </div>

          {/* Issues */}
          <div className="pr-section">
            <div className="pr-section-title">Issues & support needed</div>
            <BulletList items={issues} setItems={setIssues} />
            <button className="pr-add-btn" onClick={() => addBullet(issues, setIssues)}>+ Add item</button>
          </div>

          {/* Signatures */}
          <div className="pr-sig-wrap">
            <div className="pr-sig-box">
              <div className="pr-sig-line">Reporter signature</div>
              <div className="pr-sig-name">{reporter || 'Your name'}</div>
            </div>
            <div className="pr-sig-box">
              <div className="pr-sig-line">Approved by</div>
              <div className="pr-sig-name">{receiver || 'Manager name'}</div>
            </div>
          </div>
        </div>

        <div className="pr-footer">
          <span>Confidential — Internal use only</span>
          <span>Generated: {dateStr}</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface Test { id: number; name: string; }
interface TTTrainee { id: number; name: string; scores: Record<number, string>; }

const defaultTests: Test[] = [{ id: 1, name: 'Mid-test (Day 5)' }];
const defaultTrainees: TTTrainee[] = [
  { id: 1, name: 'Trainee 1', scores: { 1: '' } },
  { id: 2, name: 'Trainee 2', scores: { 1: '' } },
  { id: 3, name: 'Trainee 3', scores: { 1: '' } },
];

function getPct(raw: string, max: number): number | null {
  if (raw === '' || raw === null || raw === undefined || isNaN(+raw)) return null;
  return Math.min(100, Math.round(+raw / max * 100));
}

function getBarColor(pct: number | null, thr: number): string {
  if (pct === null) return '#B4B2A9';
  if (pct >= 80) return '#3B6D11';
  if (pct >= thr) return '#185FA5';
  return '#A32D2D';
}

export default function TestTrackerView() {
  const [cohort, setCohort] = useState('');
  const [threshold, setThreshold] = useState(70);
  const [maxScore, setMaxScore] = useState(100);
  const [tests, setTests] = useState<Test[]>(defaultTests);
  const [trainees, setTrainees] = useState<TTTrainee[]>(defaultTrainees);
  const [currentTest, setCurrentTest] = useState(1);
  const [testCounter, setTestCounter] = useState(1);
  const [traineeCounter, setTraineeCounter] = useState(3);
  const [toast, setToast] = useState(false);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function addTest() {
    const nc = testCounter + 1;
    setTestCounter(nc);
    const newTest = { id: nc, name: 'Test ' + nc };
    setTests(prev => [...prev, newTest]);
    setTrainees(prev => prev.map(t => ({ ...t, scores: { ...t.scores, [nc]: '' } })));
    setCurrentTest(nc);
  }

  function renameTest(id: number) {
    const test = tests.find(t => t.id === id);
    if (!test) return;
    const name = prompt('Rename test:', test.name);
    if (name && name.trim()) {
      setTests(prev => prev.map(t => t.id === id ? { ...t, name: name.trim() } : t));
    }
  }

  function addTrainee() {
    const nc = traineeCounter + 1;
    setTraineeCounter(nc);
    const scores: Record<number, string> = {};
    tests.forEach(t => { scores[t.id] = ''; });
    setTrainees(prev => [...prev, { id: nc, name: 'Trainee ' + nc, scores }]);
  }

  function removeTrainee(id: number) {
    setTrainees(prev => prev.filter(t => t.id !== id));
  }

  function setScore(traineeId: number, testId: number, val: string) {
    setTrainees(prev => prev.map(t => t.id === traineeId
      ? { ...t, scores: { ...t.scores, [testId]: val } }
      : t));
  }

  function setTraineeName(id: number, name: string) {
    setTrainees(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  }

  // Summary calculations
  const thr = threshold;
  const max = maxScore;
  const total = trainees.length;

  const allPcts: number[] = [];
  tests.forEach(test => {
    trainees.forEach(tr => {
      const p = getPct(tr.scores[test.id] ?? '', max);
      if (p !== null) allPcts.push(p);
    });
  });
  const avg = allPcts.length ? Math.round(allPcts.reduce((a, b) => a + b, 0) / allPcts.length) : 0;
  const allPass = trainees.filter(tr => {
    const pts = tests.map(t => getPct(tr.scores[t.id] ?? '', max)).filter((p): p is number => p !== null);
    return pts.length > 0 && pts.every(p => p >= thr);
  }).length;
  const hasFail = trainees.filter(tr => {
    const pts = tests.map(t => getPct(tr.scores[t.id] ?? '', max)).filter((p): p is number => p !== null);
    return pts.some(p => p < thr);
  }).length;

  function copyReport() {
    const lines = [`TEST & ASSESSMENT REPORT\nCohort: ${cohort || '—'} | Pass threshold: ${thr}% | Max score: ${max}\n`];
    tests.forEach(test => {
      lines.push(`\n[${test.name}]`);
      lines.push('  Name                Score    %       Status');
      trainees.forEach(tr => {
        const raw = tr.scores[test.id] ?? '';
        const pct = getPct(raw, max);
        const status = pct === null ? '—' : pct >= thr ? 'PASS' : 'FAIL';
        lines.push(`  ${(tr.name + '                    ').slice(0, 20)}${(String(raw || '—') + '         ').slice(0, 9)}${((pct !== null ? pct + '%' : '—') + '       ').slice(0, 8)}${status}`);
      });
    });
    navigator.clipboard.writeText(lines.join('\n')).then(showToast);
  }

  return (
    <div className="view">
      <h2 className="view-title">Test & Assessment Tracker</h2>

      {/* Settings */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Settings</span></div>
        <div className="tt-card-body">
          <div className="tt-settings-grid">
            <div className="tt-field">
              <label>Training cohort name</label>
              <input value={cohort} onChange={e => setCohort(e.target.value)} placeholder="e.g. Technical Support Batch 1" />
            </div>
            <div className="tt-field">
              <label>Pass threshold (%)</label>
              <input type="number" min={0} max={100} value={threshold}
                onChange={e => setThreshold(parseInt(e.target.value) || 70)} />
            </div>
            <div className="tt-field">
              <label>Max score per test</label>
              <input type="number" min={1} value={maxScore}
                onChange={e => setMaxScore(parseInt(e.target.value) || 100)} />
            </div>
          </div>
        </div>
      </div>

      {/* Tests */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-blue">Tests</span>
          <div className="tt-tabs">
            {tests.map(t => (
              <div key={t.id}
                className={`tt-tab${currentTest === t.id ? ' active' : ''}`}
                onClick={() => setCurrentTest(t.id)}
                onDoubleClick={() => renameTest(t.id)}
                title="Double-click to rename">
                {t.name}
              </div>
            ))}
            <button className="tt-add-tab-btn" onClick={addTest}>+ Add test</button>
          </div>
        </div>
        <div className="tt-card-body">
          <table className="tt-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score / {max}</th>
                <th>%</th>
                <th>Status</th>
                <th>Bar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainees.map((tr, i) => {
                const raw = tr.scores[currentTest] ?? '';
                const pct = getPct(raw, max);
                const color = getBarColor(pct, thr);
                const barW = pct !== null ? pct : 0;
                const statusVal = pct === null ? 'na' : pct >= thr ? 'pass' : 'fail';
                return (
                  <tr key={tr.id}>
                    <td className="tt-num">{i + 1}</td>
                    <td>
                      <input className="tt-name-input" value={tr.name}
                        onChange={e => setTraineeName(tr.id, e.target.value)} />
                    </td>
                    <td>
                      <input className="tt-score-input" type="number" min={0} max={max}
                        value={raw} placeholder="—"
                        onChange={e => setScore(tr.id, currentTest, e.target.value)} />
                    </td>
                    <td>
                      <span className="tt-pct" style={{ color }}>{pct !== null ? pct + '%' : '—'}</span>
                    </td>
                    <td>
                      <span className={`tt-status-pill tt-s-${statusVal}`}>
                        {statusVal === 'pass' ? 'Pass' : statusVal === 'fail' ? 'Fail' : '—'}
                      </span>
                    </td>
                    <td>
                      <div className="tt-bar-wrap">
                        <div className="tt-bar-fill" style={{ width: barW + '%', background: color }} />
                      </div>
                    </td>
                    <td>
                      <button className="tt-del-btn" onClick={() => removeTrainee(tr.id)}>✕</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="tt-add-btn" onClick={addTrainee}>+ Add trainee</button>
        </div>
      </div>

      {/* Summary */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-green">Summary</span>
          <span className="tt-thr-note">Pass threshold: {thr}%</span>
        </div>
        <div className="tt-card-body">
          <div className="tt-summary-grid">
            <div className="tt-stat">
              <div className="tt-stat-label">Trainees</div>
              <div className="tt-stat-value">{total}</div>
              <div className="tt-stat-sub">in cohort</div>
            </div>
            <div className="tt-stat">
              <div className="tt-stat-label">Avg score</div>
              <div className="tt-stat-value">{avg}%</div>
              <div className="tt-stat-sub">across all tests</div>
            </div>
            <div className="tt-stat">
              <div className="tt-stat-label">All passing</div>
              <div className="tt-stat-value" style={{ color: 'var(--green)' }}>{allPass}</div>
              <div className="tt-stat-sub">all tests ≥ {thr}%</div>
            </div>
            <div className="tt-stat">
              <div className="tt-stat-label">Has failed</div>
              <div className="tt-stat-value" style={{ color: 'var(--red)' }}>{hasFail}</div>
              <div className="tt-stat-sub">at least one test</div>
            </div>
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

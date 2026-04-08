import { useState } from 'react';

type TemplateKey = 'weekly' | 'training' | 'kpi' | 'incident';

const TEMPLATES: Record<TemplateKey, { subj: (n: string, p: string) => string; greeting: string }> = {
  weekly: {
    subj: (n, p) => `Weekly Report – ${n} (${p})`,
    greeting: 'I hope this message finds you well. Please find below my weekly report summary.',
  },
  training: {
    subj: (_, p) => `Training Progress Report – ${p}`,
    greeting: 'Please find below the training progress update for the current period.',
  },
  kpi: {
    subj: (n, p) => `KPI Update – ${n} (${p})`,
    greeting: 'Here is the KPI and performance update for the period.',
  },
  incident: {
    subj: (n, p) => `Incident Report – ${n} – ${p}`,
    greeting: 'This report documents an incident that occurred during the period. Details are outlined below.',
  },
};

const today = new Date().toISOString().split('T')[0];

export default function EmailExportView() {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [fromName, setFromName] = useState('');
  const [dept, setDept] = useState('');
  const [reportDate, setReportDate] = useState(today);
  const [subject, setSubject] = useState('');
  const [period, setPeriod] = useState('');
  const [phase, setPhase] = useState('');
  const [template, setTemplate] = useState<TemplateKey>('weekly');
  const [progressItems, setProgressItems] = useState<string[]>(['Describe what was completed...']);
  const [planItems, setPlanItems] = useState<string[]>(['Describe an upcoming plan...']);
  const [issueItems, setIssueItems] = useState<string[]>(['Describe an issue or request...']);
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState(false);

  function showToast() { setToast(true); setTimeout(() => setToast(false), 2000); }

  function getPreviewBody() {
    const name = fromName || '[Your name]';
    const deptStr = dept || '[Department]';
    const periodStr = period || '[Period]';
    const tmpl = TEMPLATES[template];
    const dateStr = reportDate
      ? new Date(reportDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    const fmtItems = (items: string[]) =>
      items.length ? items.map((x, i) => `  ${i + 1}. ${x.trim() || '(not filled)'}`).join('\n') : '  (none added)';

    return `Dear [Manager's name],

${tmpl.greeting}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reporter: ${name}
Department: ${deptStr}
Period: ${periodStr}${phase ? '\nPhase: ' + phase : ''}
Date: ${dateStr}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESULTS THIS PERIOD
${fmtItems(progressItems)}

UPCOMING PLANS
${fmtItems(planItems)}

ISSUES / SUPPORT NEEDED
${fmtItems(issueItems)}${notes ? '\n\nADDITIONAL NOTES\n  ' + notes : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
${name}
${deptStr}`;
  }

  const previewBody = getPreviewBody();
  const autoSubject = TEMPLATES[template].subj(fromName || 'Report', period || '—');

  function updateItem(list: string[], setList: (v: string[]) => void, idx: number, val: string) {
    const next = [...list];
    next[idx] = val;
    setList(next);
  }

  function addItem(list: string[], setList: (v: string[]) => void, ph: string) {
    setList([...list, ph]);
  }

  function removeItem(list: string[], setList: (v: string[]) => void, idx: number) {
    setList(list.filter((_, i) => i !== idx));
  }

  function copyBody() {
    navigator.clipboard.writeText(previewBody).then(showToast);
  }

  function openMailto() {
    const sub = subject || autoSubject;
    const ccPart = cc ? `&cc=${encodeURIComponent(cc)}` : '';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(sub)}${ccPart}&body=${encodeURIComponent(previewBody)}`;
  }

  function ItemList({ items, setItems, placeholder }: { items: string[]; setItems: (v: string[]) => void; placeholder: string }) {
    return (
      <div className="email-rows">
        {items.map((item, i) => (
          <div key={i} className="email-row-group">
            <span className="email-row-num">{i + 1}.</span>
            <textarea className="email-row-ta" rows={1} value={item} placeholder={placeholder}
              onChange={e => updateItem(items, setItems, i, e.target.value)} />
            <button className="tt-del-btn" onClick={() => removeItem(items, setItems, i)}>✕</button>
          </div>
        ))}
        <button className="email-add-row-btn" onClick={() => addItem(items, setItems, placeholder)}>+ Add item</button>
      </div>
    );
  }

  return (
    <div className="view">
      <h2 className="view-title">Email Report Export</h2>

      {/* Email header */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Email header</span></div>
        <div className="tt-card-body">
          <div className="email-grid2">
            <div className="tt-field"><label>To (recipient email)</label>
              <input value={to} onChange={e => setTo(e.target.value)} placeholder="manager@company.com" /></div>
            <div className="tt-field"><label>CC</label>
              <input value={cc} onChange={e => setCc(e.target.value)} placeholder="hr@company.com (optional)" /></div>
          </div>
          <div className="email-grid3">
            <div className="tt-field"><label>From (your name)</label>
              <input value={fromName} onChange={e => setFromName(e.target.value)} placeholder="Your name" /></div>
            <div className="tt-field"><label>Your department</label>
              <input value={dept} onChange={e => setDept(e.target.value)} placeholder="e.g. IT / Technical Support" /></div>
            <div className="tt-field"><label>Report date</label>
              <input type="date" value={reportDate} onChange={e => setReportDate(e.target.value)} /></div>
          </div>
          <div className="tt-field"><label>Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              placeholder={autoSubject} /></div>
        </div>
      </div>

      {/* Template */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Template</span></div>
        <div className="tt-card-body">
          <div className="email-template-pills">
            {(['weekly', 'training', 'kpi', 'incident'] as TemplateKey[]).map(t => (
              <button key={t} className={`email-tpill${template === t ? ' active' : ''}`}
                onClick={() => setTemplate(t)}>
                {t === 'weekly' ? 'Weekly report' : t === 'training' ? 'Training progress' : t === 'kpi' ? 'KPI update' : 'Incident report'}
              </button>
            ))}
          </div>
          <div className="email-grid2">
            <div className="tt-field"><label>Period / week</label>
              <input value={period} onChange={e => setPeriod(e.target.value)} placeholder="e.g. 07–13 Apr 2026" /></div>
            <div className="tt-field"><label>Phase / training type</label>
              <input value={phase} onChange={e => setPhase(e.target.value)} placeholder="e.g. 10-day Technical Support" /></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-green">Content</span></div>
        <div className="tt-card-body">
          <div className="tt-field">
            <label>Progress / results this period</label>
            <ItemList items={progressItems} setItems={setProgressItems} placeholder="What was completed..." />
          </div>
          <div className="tt-field">
            <label>Plans for next period</label>
            <ItemList items={planItems} setItems={setPlanItems} placeholder="Upcoming plan..." />
          </div>
          <div className="tt-field">
            <label>Issues / support needed</label>
            <ItemList items={issueItems} setItems={setIssueItems} placeholder="Issue or support request..." />
          </div>
          <div className="tt-field"><label>Additional notes (optional)</label>
            <textarea className="email-notes-ta" rows={3} value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any extra context for the recipient..." />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-amber">Preview</span>
          <span style={{ fontSize: '12px', color: 'var(--tx3)', marginLeft: 'auto' }}>Updates live as you type</span>
        </div>
        <div className="tt-card-body">
          <div className="email-preview-header">Email body preview</div>
          <pre className="email-preview-box">{previewBody}</pre>
        </div>
      </div>

      <div className="tt-actions">
        <button className="tt-btn tt-btn-outline" onClick={copyBody}>Copy email body</button>
        <button className="tt-btn tt-btn-primary" onClick={openMailto}>Open in Mail client</button>
        <button className="tt-btn tt-btn-green" onClick={() => window.print()}>Print / PDF</button>
      </div>

      {toast && <div className="tt-toast show">Copied!</div>}
    </div>
  );
}

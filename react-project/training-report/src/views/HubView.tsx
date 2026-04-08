interface HubViewProps {
  onNavigate: (view: string) => void;
}

interface ToolCard {
  view: string;
  icon: string;
  name: string;
  badge: string;
  badgeColor: string;
  desc: string;
  tags: string[];
  color: string;
}

const TRAINING_TOOLS: ToolCard[] = [
  {
    view: 'testtracker',
    icon: '📝',
    name: 'Test & Assessment Tracker',
    badge: 'Training',
    badgeColor: 'blue',
    desc: 'Score each trainee per test, auto-calculate pass/fail vs threshold, and view cohort summary.',
    tags: ['scores', 'pass/fail', 'multi-test'],
    color: 'blue',
  },
  {
    view: 'attendance',
    icon: '📅',
    name: 'Attendance Tracker',
    badge: 'Training',
    badgeColor: 'teal',
    desc: 'Mark Present / Absent / Late per trainee per day. Auto-calculates attendance rate and flags at-risk trainees.',
    tags: ['attendance', 'daily', 'per trainee'],
    color: 'teal',
  },
  {
    view: 'cohort',
    icon: '🗂',
    name: 'Cohort Dashboard',
    badge: 'Training',
    badgeColor: 'purple',
    desc: 'Full pipeline view — track every trainee from orientation through to full-stack graduation.',
    tags: ['pipeline', 'all phases', 'overview'],
    color: 'purple',
  },
  {
    view: 'document',
    icon: '📄',
    name: 'Training Document',
    badge: 'Training',
    badgeColor: 'coral',
    desc: 'A dedicated editable document space for training reports, observations, and plans.',
    tags: ['document', 'notes', 'print'],
    color: 'coral',
  },
];

const REPORTING_TOOLS: ToolCard[] = [
  {
    view: 'kpi',
    icon: '🎯',
    name: 'KPI & Target Tracker',
    badge: 'Reporting',
    badgeColor: 'green',
    desc: 'Set targets, enter actuals, and auto-track status — On track, At risk, Behind, or Complete.',
    tags: ['KPIs', 'targets', 'progress'],
    color: 'green',
  },
  {
    view: 'printreport',
    icon: '🖨',
    name: 'Print-Ready Report',
    badge: 'Reporting',
    badgeColor: 'blue',
    desc: 'Fully editable, print-optimized report with live progress bars, trainee table, and signature lines.',
    tags: ['PDF export', 'editable', 'formal'],
    color: 'blue',
  },
  {
    view: 'email',
    icon: '✉',
    name: 'Email Export',
    badge: 'Reporting',
    badgeColor: 'amber',
    desc: 'Fill in your report, preview the email live, then send directly to your mail client pre-filled.',
    tags: ['email', 'templates', 'export'],
    color: 'amber',
  },
];

const UTILITY_TOOLS: ToolCard[] = [
  {
    view: 'datamanager',
    icon: '💾',
    name: 'Data Manager',
    badge: 'Utility',
    badgeColor: 'coral',
    desc: 'Save, search, and reload any report data in your browser. Export as JSON or import from file.',
    tags: ['local storage', 'save/load', 'export'],
    color: 'coral',
  },
];

function ToolCardItem({ card, onNavigate }: { card: ToolCard; onNavigate: (v: string) => void }) {
  return (
    <div className={`hub-card hub-${card.color}`} onClick={() => onNavigate(card.view)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}>
      <div className="hub-card-top">
        <div className="hub-icon">{card.icon}</div>
        <div className="hub-info">
          <div className="hub-name">{card.name}</div>
          <span className={`hub-badge hub-badge-${card.badgeColor}`}>{card.badge}</span>
        </div>
      </div>
      <div className="hub-desc">{card.desc}</div>
      <div className="hub-tags">
        {card.tags.map(t => <span key={t} className="hub-tag">{t}</span>)}
      </div>
      <div className="hub-open-btn">Open tool →</div>
    </div>
  );
}

export default function HubView({ onNavigate }: HubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero">
        <span className="hub-hero-icon">📊</span>
        <h1>Training Report Hub</h1>
        <p>All your reporting and tracking tools in one place. Click any card to open the tool.</p>
      </div>

      <div className="hub-section-label">Training tools</div>
      <div className="hub-grid">
        {TRAINING_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-section-label" style={{ marginTop: '1.75rem' }}>Reporting tools</div>
      <div className="hub-grid">
        {REPORTING_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-section-label" style={{ marginTop: '1.75rem' }}>Utilities</div>
      <div className="hub-grid">
        {UTILITY_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">
        Training Report Hub · Open any tool above · All data stays in your browser
      </div>
    </div>
  );
}

interface FinanceHubViewProps {
  onNavigate: (view: string) => void;
}

interface ToolCard {
  view: string;
  icon: string;
  name: string;
  badge: string;
  badgeColor: string;
  desc: string;
  color: string;
  soon?: boolean;
}

const FINANCE_TOOLS: ToolCard[] = [
  {
    view: 'expenses',
    icon: '💸',
    name: 'Expense Tracker',
    badge: 'Daily',
    badgeColor: 'amber',
    desc: 'Log daily expenses by category — food, transport, shopping, entertainment. See totals at a glance.',
    color: 'amber',
  },
  {
    view: 'tripbudget',
    icon: '🧾',
    name: 'Trip Budget',
    badge: 'Travel',
    badgeColor: 'teal',
    desc: 'Set a budget for each trip, log spending per day, and track how much you have left.',
    color: 'teal',
  },
  {
    view: 'savings',
    icon: '🏦',
    name: 'Savings Goals',
    badge: 'Goals',
    badgeColor: 'green',
    desc: 'Define savings targets — next trip, gadget, emergency fund — and track your progress over time.',
    color: 'green',
  },
];

function ToolCardItem({ card, onNavigate }: { card: ToolCard; onNavigate: (v: string) => void }) {
  return (
    <div
      className={`hub-card hub-${card.color} ${card.soon ? 'hub-card-soon' : ''}`}
      onClick={() => !card.soon && onNavigate(card.view)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && !card.soon && onNavigate(card.view)}
      style={card.soon ? { opacity: .55, cursor: 'default' } : {}}
    >
      <div className="hub-card-top">
        <span className="hub-icon">{card.icon}</span>
        <div>
          <div className="hub-card-name">{card.name}</div>
          <span className={`hub-badge hub-badge-${card.badgeColor}`}>
            {card.soon ? '🔒 Coming Soon' : card.badge}
          </span>
        </div>
      </div>
      <p className="hub-card-desc">{card.desc}</p>
      {!card.soon && <div className="hub-open-btn">Open →</div>}
    </div>
  );
}

export default function FinanceHubView({ onNavigate }: FinanceHubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero hub-amber">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--amber-bg)', color: 'var(--amber)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>💰</div>
        <h1 className="hub-hero-title">Finance Hub</h1>
        <p className="hub-hero-sub">Track expenses, manage trip budgets, and work toward savings goals — stay on top of your money.</p>
      </div>

      <div className="hub-section-label">Money Tools</div>
      <div className="hub-grid">
        {FINANCE_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Finance Hub · Your money, your control</div>
    </div>
  );
}

interface TravelHubViewProps {
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
}

const TRAVEL_TOOLS: ToolCard[] = [
  {
    view: 'itinerary',
    icon: '🗺️',
    name: 'Trip Itinerary',
    badge: 'Planning',
    badgeColor: 'teal',
    desc: 'Day-by-day travel plans, schedules, and activity notes for each trip.',
    color: 'teal',
  },
];

function ToolCardItem({ card, onNavigate }: { card: ToolCard; onNavigate: (v: string) => void }) {
  return (
    <div className={`hub-card hub-${card.color}`} onClick={() => onNavigate(card.view)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}>
      <div className="hub-card-top">
        <span className="hub-icon">{card.icon}</span>
        <div>
          <div className="hub-card-name">{card.name}</div>
          <span className={`hub-badge hub-badge-${card.badgeColor}`}>{card.badge}</span>
        </div>
      </div>
      <p className="hub-card-desc">{card.desc}</p>
      <div className="hub-open-btn">Open →</div>
    </div>
  );
}

export default function TravelHubView({ onNavigate }: TravelHubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero hub-teal">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--teal-bg)', color: 'var(--teal)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>✈️</div>
        <h1 className="hub-hero-title">Travel Hub</h1>
        <p className="hub-hero-sub">Plan your trips, save itineraries, and keep track of travel adventures — all in one place.</p>
      </div>

      <div className="hub-section-label">Trip Tools</div>
      <div className="hub-grid">
        {TRAVEL_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Travel Hub · Plan your next adventure</div>
    </div>
  );
}

interface MainHubViewProps {
  onNavigate: (view: string) => void;
}

const HUBS = [
  { view: 'hub',        icon: '📊', name: 'Training',  subtitle: 'Reporting & Tracking', accent: '#4A9EFF' },
  { view: 'learnhub',  icon: '🎓', name: 'Learning',  subtitle: 'Skills · Languages',   accent: '#A78BFA' },
  { view: 'travelhub', icon: '✈️', name: 'Travel',    subtitle: 'Trips & Itineraries',  accent: '#2DD4BF' },
  { view: 'financehub',icon: '💰', name: 'Finance',   subtitle: 'Budget & Expenses',    accent: '#FBBF24' },
  { view: 'journalhub',icon: '📔', name: 'Journal',   subtitle: 'Daily Log · Reflect',  accent: '#F87171' },
];

const BOOKS = [
  'The Great Gatsby',
  'The Silence of the Lambs',
];

const NEWS = [
  { name: 'ZNews',     url: 'https://znews.vn' },
  { name: 'VnExpress', url: 'https://vnexpress.net' },
];

export default function MainHubView({ onNavigate }: MainHubViewProps) {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="lp-root">

      {/* ── Hero: split left/right ── */}
      <div className="lp-split">

        {/* LEFT — cream panel with info */}
        <div className="lp-panel-left">
          <p className="lp-greeting">Hi, I am</p>
          <h1 className="lp-name">Quân</h1>
          <p className="lp-role">Software QA Engineer · Language Learner · Solo Traveler</p>

          {/* Social icons */}
          <div className="lp-socials">
            <a
              href="https://www.facebook.com/availableeeeee/"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-fb" title="Facebook"
            >f</a>
            <a
              href="https://www.instagram.com/motchinchintam"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-ig" title="Instagram"
            >◎</a>
            <a
              href="https://zalo.me/0916366443"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-zalo" title="Zalo · 0916 366 443"
            >Z</a>
          </div>

          {/* Books + News */}
          <div className="lp-extras-mini">
            <div className="lp-extras-section">
              <div className="lp-extras-label">📚 Reads</div>
              {BOOKS.map(b => <span key={b} className="lp-book-chip">{b}</span>)}
            </div>
            <div className="lp-extras-section">
              <div className="lp-extras-label">📰 News</div>
              {NEWS.map(n => (
                <a key={n.name} href={n.url} target="_blank" rel="noopener noreferrer"
                  className="lp-book-chip lp-news-link">{n.name} ↗</a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — dark panel with photo */}
        <div className="lp-panel-right">
          <img
            src={`${base}avatar.jpg`}
            alt="Quân"
            className="lp-photo"
            onError={e => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
        </div>

      </div>

      {/* ── Hub preview bar at bottom ── */}
      <div className="lp-hub-bar">
        <span className="lp-hub-bar-label">Workspaces</span>
        <div className="lp-hub-bar-cards">
          {HUBS.map(hub => (
            <button
              key={hub.view}
              className="lp-hub-bar-card"
              style={{ '--hub-accent': hub.accent } as React.CSSProperties}
              onClick={() => onNavigate(hub.view)}
            >
              <span className="lp-hub-bar-icon">{hub.icon}</span>
              <div>
                <div className="lp-hub-bar-name">{hub.name}</div>
                <div className="lp-hub-bar-sub">{hub.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

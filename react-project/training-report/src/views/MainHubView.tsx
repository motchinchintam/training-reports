import { useState } from 'react';

interface MainHubViewProps {
  onNavigate: (view: string) => void;
}

const HUBS = [
  { view: 'hub',        icon: '📊', name: 'Training',  subtitle: 'Reporting & Tracking', accent: '#4A9EFF', desc: 'Attendance, KPIs & cohort dashboards' },
  { view: 'learnhub',  icon: '🎓', name: 'Learning',  subtitle: 'Skills · Languages',   accent: '#A78BFA', desc: 'Flashcards, quizzes & study timers' },
  { view: 'travelhub', icon: '✈️', name: 'Travel',    subtitle: 'Trips & Itineraries',  accent: '#2DD4BF', desc: 'Plan trips & build itineraries' },
  { view: 'financehub',icon: '💰', name: 'Finance',   subtitle: 'Budget & Expenses',    accent: '#FBBF24', desc: 'Track expenses, budgets & savings' },
  { view: 'journalhub',icon: '📔', name: 'Journal',   subtitle: 'Daily Log · Reflect',  accent: '#F87171', desc: 'Daily journal, mood & weekly reviews' },
];

const CURRENTLY = [
  { icon: '🗣', label: 'Learning Mandarin & English' },
  { icon: '✈️', label: 'Planning to travel abroad' },
  { icon: '📖', label: 'Reading The Silence of the Lambs' },
];

const STATS = [
  { num: '6+',  label: 'Yrs Exp'      },
  { num: '100+', label: 'Staff Trained' },
  { num: '4K+', label: 'Accounts'     },
  { num: '3',   label: 'Languages'    },
];

const MOTTO = '"The world is a book, and those who do not travel read only one page."';

const GOALS = [
  '🌏 Travel abroad this year',
  '🀄 Reach HSK 3 in Mandarin',
  '📚 Read 20 books this year',
];

// ── Professional profile (from resume) ──────────────────────────────────────
const PROFILE = {
  name:    'Nguyen Thanh Quan',
  title:   'HR & Sales Training · HRD',
  company: 'Enrich Operating System (Mango for Salon)',
  period:  'Sep 2025 – Present',
  summary: 'Dynamic Sales & Business Development professional with 6+ years driving revenue growth, building client portfolios, and leading high-performing teams across SaaS, retail, and duty-free environments.',
  metrics: [
    { num: '700→4K+', label: 'Merchant Accounts' },
    { num: '20%→5%',  label: 'Churn Rate'        },
    { num: '100+',    label: 'Staff Trained'      },
    { num: '85%+',    label: 'Avg Pass Rate'      },
  ],
  skills: [
    'B2B/B2C Sales', 'Team Training & Coaching', 'HR & Talent Management',
    'KPI & P&L Management', 'Account Management', 'Ops & Process Design',
    'CRM / HRM Systems', 'Revenue Forecasting',
  ],
  certs: [
    { name: 'IELTS 6.0 (B2)', issuer: 'British Council · 2018' },
    { name: 'Mid-Level Management & Leadership', issuer: 'HUREDIN Institute · 2025 · Excellent' },
  ],
};

const NEWS = [
  { name: 'ZNews',     url: 'https://znews.vn' },
  { name: 'VnExpress', url: 'https://vnexpress.net' },
];

export default function MainHubView({ onNavigate }: MainHubViewProps) {
  const base = import.meta.env.BASE_URL;
  const [dark, setDark] = useState(false);

  return (
    <div className={`lp-root${dark ? ' lp-dark' : ''}`}>

      {/* ── Hero: split left/right ── */}
      <div className="lp-split">

        {/* LEFT — info panel */}
        <div className="lp-panel-left">

          {/* Theme toggle */}
          <button
            className="lp-theme-toggle"
            onClick={() => setDark(d => !d)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Identity */}
          <p className="lp-greeting lp-anim" style={{ '--d': '0ms' } as React.CSSProperties}>Hi, I am</p>
          <h1 className="lp-name lp-anim" style={{ '--d': '130ms' } as React.CSSProperties}>Quân</h1>
          <p className="lp-role lp-anim" style={{ '--d': '260ms' } as React.CSSProperties}>
            HR & Sales Training HRD · Language Learner · Traveler
          </p>
          

          {/* Motto */}
          <p className="lp-quote lp-anim" style={{ '--d': '360ms' } as React.CSSProperties}>{MOTTO}</p>

          {/* Social icons */}
          <div className="lp-socials lp-anim" style={{ '--d': '460ms' } as React.CSSProperties}>
            <a href="https://www.facebook.com/availableeeeee/" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-fb" title="Facebook">f</a>
            <a href="https://www.instagram.com/motchinchintam" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-ig" title="Instagram">◎</a>
            <a href="https://zalo.me/0916366443" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-zalo" title="Zalo · 0916 366 443">Z</a>
          </div>

          {/* Currently */}
          <div className="lp-currently lp-anim" style={{ '--d': '560ms' } as React.CSSProperties}>
            <div className="lp-section-label">Currently</div>
            <div className="lp-currently-chips">
              {CURRENTLY.map(c => (
                <span key={c.label} className="lp-currently-chip">{c.icon} {c.label}</span>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="lp-stats lp-anim" style={{ '--d': '660ms' } as React.CSSProperties}>
            {STATS.map((s, i) => (
              <div key={s.label} className="lp-stat" style={i < STATS.length - 1 ? { borderRight: '1px solid rgba(92,122,60,0.2)' } : {}}>
                <div className="lp-stat-num">{s.num}</div>
                <div className="lp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Goals + News */}
          <div className="lp-extras-mini lp-anim" style={{ '--d': '760ms' } as React.CSSProperties}>
            <div className="lp-extras-section">
              <div className="lp-section-label">Goals</div>
              {GOALS.map(g => <span key={g} className="lp-book-chip lp-goal-chip">{g}</span>)}
            </div>
            <div className="lp-extras-section">
              <div className="lp-section-label">📰 News</div>
              {NEWS.map(n => (
                <a key={n.name} href={n.url} target="_blank" rel="noopener noreferrer"
                  className="lp-book-chip lp-news-link">{n.name} ↗</a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT — photo panel */}
        <div className="lp-panel-right">
          <img
            src={`${base}newphoto.png`}
            alt="Quân"
            className="lp-photo"
            onError={e => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
        </div>

      </div>

      {/* ── Professional profile section ── */}
      <div className="lp-profile">

        {/* Role + summary */}
        <div className="lp-profile-left">
          <div className="lp-profile-badge">💼 Current Role</div>
          <div className="lp-profile-title">{PROFILE.title}</div>
          <div className="lp-profile-company">{PROFILE.company}</div>
          <div className="lp-profile-period">{PROFILE.period}</div>
          <p className="lp-profile-summary">{PROFILE.summary}</p>
          <div className="lp-profile-certs">
            {PROFILE.certs.map(c => (
              <div key={c.name} className="lp-profile-cert">
                <span className="lp-profile-cert-name">🎓 {c.name}</span>
                <span className="lp-profile-cert-issuer">{c.issuer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics + skills */}
        <div className="lp-profile-right">
          <div className="lp-profile-metrics">
            {PROFILE.metrics.map(m => (
              <div key={m.label} className="lp-profile-metric">
                <div className="lp-profile-metric-num">{m.num}</div>
                <div className="lp-profile-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="lp-profile-skills-label">Core Skills</div>
          <div className="lp-profile-skills">
            {PROFILE.skills.map(s => (
              <span key={s} className="lp-profile-skill">{s}</span>
            ))}
          </div>
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
              <div className="lp-hub-tooltip">{hub.desc}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

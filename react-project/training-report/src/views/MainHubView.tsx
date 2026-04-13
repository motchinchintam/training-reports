interface MainHubViewProps {
  onNavigate: (view: string) => void;
}

interface HubCard {
  view: string;
  icon: string;
  name: string;
  subtitle: string;
  desc: string;
  tools: string[];
  color: string;
  accentVar: string;
}

const HUBS: HubCard[] = [
  {
    view: 'hub',
    icon: '📊',
    name: 'Training Hub',
    subtitle: 'Reporting & Tracking',
    desc: 'Tools for managing training programs — track attendance, test scores, KPIs, cohort pipeline, and generate print-ready reports.',
    tools: ['Test Tracker', 'Attendance', 'Cohort Dashboard', 'KPI Tracker', 'Print Report', 'Email Export', 'Data Manager', 'Training Doc'],
    color: 'main-blue',
    accentVar: 'var(--blue)',
  },
  {
    view: 'learnhub',
    icon: '🎓',
    name: 'Learning Hub',
    subtitle: 'Tester Skills · Languages',
    desc: 'Personal study tools for SQL, TypeScript, English, and Chinese — flashcards, quizzes, Pomodoro timer, goals, and notes.',
    tools: ['Flashcard Decks', 'Quiz Builder', 'Study Timer', 'Learning Goals', 'Study Notes'],
    color: 'main-purple',
    accentVar: 'var(--purple)',
  },
  {
    view: 'travelhub',
    icon: '✈️',
    name: 'Travel Hub',
    subtitle: 'Trips & Itineraries',
    desc: 'Plan and save travel adventures — day-by-day itineraries, activity schedules, food spots, and trip notes all in one place.',
    tools: ['Trip Itinerary'],
    color: 'main-teal',
    accentVar: 'var(--teal)',
  },
];

export default function MainHubView({ onNavigate }: MainHubViewProps) {
  return (
    <div className="main-hub-page">
      <div className="main-hub-hero">
        <div className="main-hub-avatar">Q</div>
        <h1 className="main-hub-title">Quân's Works</h1>
        <p className="main-hub-sub">A personal workspace — training management tools, self-study resources, and travel planning, all in one place.</p>
      </div>

      <div className="main-hub-grid">
        {HUBS.map(hub => (
          <div
            key={hub.view}
            className={`main-hub-card ${hub.color}`}
            onClick={() => onNavigate(hub.view)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(hub.view)}
          >
            <div className="main-hub-card-header">
              <span className="main-hub-card-icon">{hub.icon}</span>
              <div>
                <div className="main-hub-card-name">{hub.name}</div>
                <div className="main-hub-card-subtitle">{hub.subtitle}</div>
              </div>
            </div>
            <p className="main-hub-card-desc">{hub.desc}</p>
            <div className="main-hub-tools">
              {hub.tools.map(t => <span key={t} className="main-hub-tool-chip">{t}</span>)}
            </div>
            <div className="main-hub-enter">Enter hub →</div>
          </div>
        ))}
      </div>

      <div className="main-hub-footer">
        Quân's Works · All data saved locally in your browser
      </div>
    </div>
  );
}

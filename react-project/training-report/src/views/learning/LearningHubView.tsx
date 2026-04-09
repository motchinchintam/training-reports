interface LearningHubViewProps {
  onNavigate: (view: string) => void;
}

interface LearnCard {
  view: string;
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  color: string;
  badge: string;
}

const TOOLS: LearnCard[] = [
  {
    view: 'flashcard',
    icon: '🃏',
    name: 'Flashcard Decks',
    badge: 'Memory',
    desc: 'Memorise SQL commands, TypeScript syntax, English/Chinese vocabulary. Flip cards, mark Know or Review, track mastery.',
    tags: ['SQL', 'vocabulary', 'TypeScript', 'Chinese'],
    color: 'purple',
  },
  {
    view: 'quiz',
    icon: '🧠',
    name: 'Quiz Builder',
    badge: 'Assessment',
    desc: 'Test yourself with multiple-choice quizzes on SQL queries, TypeScript concepts, English grammar, or Chinese characters.',
    tags: ['SQL quiz', 'TSX', 'grammar', 'self-test'],
    color: 'blue',
  },
  {
    view: 'studytimer',
    icon: '⏱',
    name: 'Study Timer',
    badge: 'Focus',
    desc: 'Pomodoro-style timer — stay focused during SQL practice, coding, or language drills. Track daily study sessions.',
    tags: ['pomodoro', 'focus', 'daily habit'],
    color: 'teal',
  },
  {
    view: 'goals',
    icon: '🎯',
    name: 'Learning Goals',
    badge: 'Planning',
    desc: 'Set goals like "Complete 50 SQL exercises" or "Learn 300 Chinese words". Track deadlines and completion rate.',
    tags: ['SQL', 'English', 'Chinese', 'TypeScript'],
    color: 'green',
  },
  {
    view: 'studynotes',
    icon: '📓',
    name: 'Study Notes',
    badge: 'Knowledge',
    desc: 'Write and organise notes by topic — SQL joins, TypeScript types, English grammar rules, Chinese HSK vocab.',
    tags: ['SQL', 'TSX notes', 'grammar', 'HSK'],
    color: 'amber',
  },
];

export default function LearningHubView({ onNavigate }: LearningHubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero">
        <span className="hub-hero-icon">🎓</span>
        <h1>Learning Hub</h1>
        <p>Study tools built for <strong>Tester</strong> skills (SQL, TypeScript) and <strong>Language</strong> learning (English, Chinese).</p>
      </div>

      <div className="hub-section-label">Study tools</div>
      <div className="hub-grid">
        {TOOLS.map(card => (
          <div
            key={card.view}
            className={`hub-card hub-${card.color}`}
            onClick={() => onNavigate(card.view)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}
          >
            <div className="hub-card-top">
              <div className="hub-icon">{card.icon}</div>
              <div className="hub-info">
                <div className="hub-name">{card.name}</div>
                <span className={`hub-badge hub-badge-${card.color}`}>{card.badge}</span>
              </div>
            </div>
            <div className="hub-desc">{card.desc}</div>
            <div className="hub-tags">
              {card.tags.map(t => <span key={t} className="hub-tag">{t}</span>)}
            </div>
            <div className="hub-open-btn">Open tool →</div>
          </div>
        ))}
      </div>

      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Learning tracks</div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { icon: '🗄️', label: 'SQL', desc: 'Queries, joins, aggregation, indexing', color: 'blue' },
          { icon: '📘', label: 'TypeScript', desc: 'Types, interfaces, TSX, generics', color: 'purple' },
          { icon: '🇬🇧', label: 'English', desc: 'Grammar, vocabulary, writing', color: 'teal' },
          { icon: '🇨🇳', label: 'Chinese', desc: 'HSK vocab, characters, tones', color: 'amber' },
        ].map(track => (
          <div key={track.label} className={`hub-track-chip hub-track-${track.color}`}>
            <span>{track.icon}</span>
            <div>
              <div className="hub-track-label">{track.label}</div>
              <div className="hub-track-desc">{track.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hub-footer">
        Learning Hub · All data saved locally in your browser
      </div>
    </div>
  );
}

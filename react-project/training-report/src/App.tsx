import { useState } from 'react';
import { LangProvider, useLang, type Lang } from './i18n/index';

// Portfolio pages
import HomeView     from './views/portfolio/HomeView';
import WorkView     from './views/portfolio/WorkView';
import AboutView    from './views/portfolio/AboutView';
import InsightsView from './views/portfolio/InsightsView';
import ContactView  from './views/portfolio/ContactView';

// Apps / tool views
import MainHubView        from './views/MainHubView';
import HubView            from './views/HubView';
import TestTrackerView    from './views/TestTrackerView';
import AttendanceGridView from './views/AttendanceGridView';
import KPIView            from './views/KPIView';
import EmailExportView    from './views/EmailExportView';
import DataManagerView    from './views/DataManagerView';
import CohortDashboardView from './views/CohortDashboardView';
import PrintReportView    from './views/PrintReportView';
import TrainingDocumentView from './views/TrainingDocumentView';
import LearningHubView    from './views/learning/LearningHubView';
import FlashcardView      from './views/learning/FlashcardView';
import QuizView           from './views/learning/QuizView';
import StudyTimerView     from './views/learning/StudyTimerView';
import GoalTrackerView    from './views/learning/GoalTrackerView';
import StudyNotesView     from './views/learning/StudyNotesView';
import TravelHubView      from './views/travel/TravelHubView';
import TravelItineraryView from './views/travel/TravelItineraryView';
import TripTemplateView   from './views/travel/TripTemplateView';
import FinanceHubView     from './views/finance/FinanceHubView';
import ExpenseTrackerView from './views/finance/ExpenseTrackerView';
import TripBudgetView     from './views/finance/TripBudgetView';
import SavingsGoalsView   from './views/finance/SavingsGoalsView';
import JournalHubView     from './views/journal/JournalHubView';
import DailyJournalView   from './views/journal/DailyJournalView';
import MoodTrackerView    from './views/journal/MoodTrackerView';
import WeeklyReviewView   from './views/journal/WeeklyReviewView';
import './App.css';

type View =
  | 'home' | 'work' | 'about' | 'insights' | 'contact'          // Portfolio
  | 'apps'                                                         // Tools dashboard
  | 'hub' | 'testtracker' | 'attendance' | 'kpi' | 'email' | 'datamanager' | 'cohort' | 'printreport' | 'document'
  | 'learnhub' | 'flashcard' | 'quiz' | 'studytimer' | 'goals' | 'studynotes'
  | 'travelhub' | 'itinerary' | 'triptemplate'
  | 'financehub' | 'expenses' | 'tripbudget' | 'savings'
  | 'journalhub' | 'dailyjournal' | 'moodtracker' | 'weeklyreview';

interface HubGroup {
  id: View;
  label: string;
  icon: string;
  color: string;
  tools: { id: View; label: string; icon: string }[];
}

const HUB_GROUPS: HubGroup[] = [
  {
    id: 'hub', label: 'Training', icon: '📊', color: 'blue',
    tools: [
      { id: 'hub',         label: 'Overview',    icon: '📋' },
      { id: 'testtracker', label: 'Test Tracker', icon: '📝' },
      { id: 'attendance',  label: 'Attendance',  icon: '📅' },
      { id: 'kpi',         label: 'KPI',         icon: '🎯' },
      { id: 'cohort',      label: 'Cohort',      icon: '🗂' },
      { id: 'document',    label: 'Doc',         icon: '📄' },
      { id: 'printreport', label: 'Print',       icon: '🖨' },
      { id: 'email',       label: 'Email',       icon: '✉' },
      { id: 'datamanager', label: 'Data',        icon: '💾' },
    ],
  },
  {
    id: 'learnhub', label: 'Learning', icon: '🎓', color: 'purple',
    tools: [
      { id: 'learnhub',   label: 'Overview',   icon: '🎓' },
      { id: 'flashcard',  label: 'Flashcards', icon: '🃏' },
      { id: 'quiz',       label: 'Quiz',       icon: '🧠' },
      { id: 'studytimer', label: 'Timer',      icon: '⏱' },
      { id: 'goals',      label: 'Goals',      icon: '🎯' },
      { id: 'studynotes', label: 'Notes',      icon: '📓' },
    ],
  },
  {
    id: 'travelhub', label: 'Travel', icon: '✈️', color: 'teal',
    tools: [
      { id: 'travelhub',    label: 'Overview',    icon: '✈️' },
      { id: 'itinerary',    label: 'Taiwan 2026', icon: '🇹🇼' },
      { id: 'triptemplate', label: 'Templates',   icon: '📋' },
    ],
  },
  {
    id: 'financehub', label: 'Finance', icon: '💰', color: 'amber',
    tools: [
      { id: 'financehub', label: 'Overview', icon: '💰' },
      { id: 'expenses',   label: 'Expenses', icon: '💸' },
      { id: 'tripbudget', label: 'Budget',   icon: '🧾' },
      { id: 'savings',    label: 'Savings',  icon: '🏦' },
    ],
  },
  {
    id: 'journalhub', label: 'Journal', icon: '📔', color: 'coral',
    tools: [
      { id: 'journalhub',   label: 'Overview', icon: '📔' },
      { id: 'dailyjournal', label: 'Journal',  icon: '✍️' },
      { id: 'moodtracker',  label: 'Mood',     icon: '🌡️' },
      { id: 'weeklyreview', label: 'Review',   icon: '📊' },
    ],
  },
];

const PORTFOLIO_VIEWS = new Set<View>(['home', 'work', 'about', 'insights', 'contact']);

function getActiveHub(view: View): HubGroup | null {
  if (PORTFOLIO_VIEWS.has(view) || view === 'apps') return null;
  return HUB_GROUPS.find(g => g.tools.some(t => t.id === view)) ?? null;
}

function AppInner() {
  const { lang, setLang, s } = useLang();
  const [view, setView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function navigate(v: string) {
    setView(v as View);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }

  const isPortfolio = PORTFOLIO_VIEWS.has(view);
  const isApps      = view === 'apps';
  const activeHub   = getActiveHub(view);

  const LANG_OPTIONS: { id: Lang; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'vi', label: 'VI' },
    { id: 'zh', label: '中' },
  ];

  const NAV_ITEMS = [
    { id: 'work'     as const, label: s.nav.work     },
    { id: 'about'    as const, label: s.nav.about    },
    { id: 'insights' as const, label: s.nav.insights },
    { id: 'contact'  as const, label: s.nav.contact  },
  ];

  return (
    <div className={`app-v2${isApps ? ' app--landing' : ''}`}>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header className="topnav">
        <div className="topnav-inner">

          {/* Brand */}
          <button className="topnav-brand" onClick={() => navigate('home')}>
            <span className="topnav-brand-icon">✦</span>
            <span className="topnav-brand-name">Quân</span>
          </button>

          {/* Portfolio nav links */}
          <nav className="topnav-hubs">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                className={`topnav-hub topnav-plink${view === id ? ' plink-active' : ''}`}
                onClick={() => navigate(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="topnav-lang-switcher">
            {LANG_OPTIONS.map(o => (
              <button
                key={o.id}
                className={`topnav-lang-btn${lang === o.id ? ' active' : ''}`}
                onClick={() => setLang(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Apps access button */}
          <button
            className={`topnav-apps-btn${!isPortfolio ? ' active' : ''}`}
            onClick={() => navigate('apps')}
            title="Personal productivity apps"
          >
            {s.nav.apps} ⊞
          </button>

          {/* Mobile hamburger */}
          <button
            className="topnav-hamburger"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="topnav-mobile-menu">
            <button className="mobile-menu-item" onClick={() => navigate('home')}>🏠 {s.nav.home}</button>
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} className="mobile-menu-item" onClick={() => navigate(id)}>{label}</button>
            ))}
            {/* Mobile lang switcher */}
            <div className="mobile-menu-section-label">Language</div>
            <div className="mobile-lang-row">
              {LANG_OPTIONS.map(o => (
                <button
                  key={o.id}
                  className={`topnav-lang-btn${lang === o.id ? ' active' : ''}`}
                  onClick={() => setLang(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="mobile-menu-section-label">{s.nav.apps}</div>
            {HUB_GROUPS.map(g => (
              <div key={g.id} className="mobile-menu-group">
                <button
                  className={`mobile-menu-hub${activeHub?.id === g.id ? ' active' : ''}`}
                  onClick={() => navigate(g.id)}
                >
                  {g.icon} {g.label}
                </button>
                {activeHub?.id === g.id && g.tools.map(t => (
                  <button
                    key={t.id}
                    className={`mobile-menu-tool${view === t.id ? ' active' : ''}`}
                    onClick={() => navigate(t.id)}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Tool sub-nav (only when inside a specific tool) */}
        {activeHub && (
          <div className={`subnav subnav-${activeHub.color}`}>
            <div className="subnav-inner">
              {activeHub.tools.map(t => (
                <button
                  key={t.id}
                  className={`subnav-item${view === t.id ? ' active' : ''}`}
                  onClick={() => navigate(t.id)}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <main className={isPortfolio ? 'pt-main' : 'main-content'}>
        {view === 'home'        && <HomeView     onNavigate={navigate} />}
        {view === 'work'        && <WorkView     onNavigate={navigate} />}
        {view === 'about'       && <AboutView    onNavigate={navigate} />}
        {view === 'insights'    && <InsightsView onNavigate={navigate} />}
        {view === 'contact'     && <ContactView  onNavigate={navigate} />}
        {view === 'apps'        && <MainHubView  onNavigate={navigate} />}

        {/* Existing tool views */}
        {view === 'hub'          && <HubView onNavigate={navigate} />}
        {view === 'testtracker'  && <TestTrackerView />}
        {view === 'attendance'   && <AttendanceGridView />}
        {view === 'kpi'          && <KPIView />}
        {view === 'email'        && <EmailExportView />}
        {view === 'datamanager'  && <DataManagerView />}
        {view === 'cohort'       && <CohortDashboardView />}
        {view === 'printreport'  && <PrintReportView />}
        {view === 'document'     && <TrainingDocumentView />}
        {view === 'learnhub'     && <LearningHubView onNavigate={navigate} />}
        {view === 'flashcard'    && <FlashcardView />}
        {view === 'quiz'         && <QuizView />}
        {view === 'studytimer'   && <StudyTimerView />}
        {view === 'goals'        && <GoalTrackerView />}
        {view === 'studynotes'   && <StudyNotesView />}
        {view === 'travelhub'    && <TravelHubView onNavigate={navigate} />}
        {view === 'itinerary'    && <TravelItineraryView />}
        {view === 'triptemplate' && <TripTemplateView />}
        {view === 'financehub'   && <FinanceHubView onNavigate={navigate} />}
        {view === 'expenses'     && <ExpenseTrackerView />}
        {view === 'tripbudget'   && <TripBudgetView />}
        {view === 'savings'      && <SavingsGoalsView />}
        {view === 'journalhub'   && <JournalHubView onNavigate={navigate} />}
        {view === 'dailyjournal' && <DailyJournalView />}
        {view === 'moodtracker'  && <MoodTrackerView />}
        {view === 'weeklyreview' && <WeeklyReviewView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

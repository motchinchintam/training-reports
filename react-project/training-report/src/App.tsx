import { useState, useEffect } from 'react';
import { LangProvider, useLang, type Lang } from './i18n/index';
import NavSearch from './components/NavSearch';
import PasscodeGate, { isHubUnlocked } from './components/PasscodeGate';

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

const ALL_VIEWS = new Set<View>([
  'home', 'work', 'about', 'insights', 'contact',
  'apps',
  'hub', 'testtracker', 'attendance', 'kpi', 'email', 'datamanager', 'cohort', 'printreport', 'document',
  'learnhub', 'flashcard', 'quiz', 'studytimer', 'goals', 'studynotes',
  'travelhub', 'itinerary', 'triptemplate',
  'financehub', 'expenses', 'tripbudget', 'savings',
  'journalhub', 'dailyjournal', 'moodtracker', 'weeklyreview',
]);

function getActiveHub(view: View): HubGroup | null {
  if (PORTFOLIO_VIEWS.has(view) || view === 'apps') return null;
  return HUB_GROUPS.find(g => g.tools.some(t => t.id === view)) ?? null;
}

function readHash(): View {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return (ALL_VIEWS.has(hash as View) ? hash : 'home') as View;
}

function AppInner() {
  const { lang, setLang, s } = useLang();
  const [view, setView] = useState<View>(readHash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('pt-dark') === '1');
  const [hubUnlocked, setHubUnlocked] = useState(isHubUnlocked);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    localStorage.setItem('pt-dark', next ? '1' : '0');
  }

  /* sync URL hash → view on browser back/forward */
  useEffect(() => {
    function onHashChange() { setView(readHash()); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function navigate(v: string) {
    const newView = v as View;
    setView(newView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    /* update URL hash for all views so links are shareable */
    if (newView === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${newView}`);
    }
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
    { id: 'work'    as const, label: s.nav.work    },
    { id: 'about'   as const, label: s.nav.about   },
    { id: 'contact' as const, label: s.nav.contact },
  ];

  return (
    <div className={`app-v2${isApps ? ' app--landing' : ''}${dark ? ' pt-dark' : ''}`}>

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

          {/* Search */}
          <NavSearch onNavigate={navigate} />

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

          {/* Dark mode toggle */}
          <button
            className="topnav-dark-btn"
            onClick={toggleDark}
            title={dark ? 'Light mode' : 'Dark mode'}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

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

        {/* Back-to-home bar — shown on every portfolio page except home */}
        {isPortfolio && view !== 'home' && (
          <div className="pt-back-bar">
            <button className="pt-back-home-btn" onClick={() => navigate('home')}>
              ← {s.nav.home}
            </button>
          </div>
        )}

        {view === 'home'        && <HomeView     onNavigate={navigate} />}
        {view === 'work'        && <WorkView     onNavigate={navigate} />}
        {view === 'about'       && <AboutView    onNavigate={navigate} />}
        {view === 'insights'    && <InsightsView onNavigate={navigate} />}
        {view === 'contact'     && <ContactView  onNavigate={navigate} />}
        {view === 'apps'        && <MainHubView  onNavigate={navigate} dark={dark} />}

        {/* Passcode gate — shown when navigating into any hub tool */}
        {!isPortfolio && !isApps && !hubUnlocked && (
          <PasscodeGate onUnlock={() => setHubUnlocked(true)} />
        )}

        {/* Existing tool views */}
        {view === 'hub'          && hubUnlocked && <HubView onNavigate={navigate} />}
        {view === 'testtracker'  && hubUnlocked && <TestTrackerView />}
        {view === 'attendance'   && hubUnlocked && <AttendanceGridView />}
        {view === 'kpi'          && hubUnlocked && <KPIView />}
        {view === 'email'        && hubUnlocked && <EmailExportView />}
        {view === 'datamanager'  && hubUnlocked && <DataManagerView />}
        {view === 'cohort'       && hubUnlocked && <CohortDashboardView />}
        {view === 'printreport'  && hubUnlocked && <PrintReportView />}
        {view === 'document'     && hubUnlocked && <TrainingDocumentView />}
        {view === 'learnhub'     && hubUnlocked && <LearningHubView onNavigate={navigate} />}
        {view === 'flashcard'    && hubUnlocked && <FlashcardView />}
        {view === 'quiz'         && hubUnlocked && <QuizView />}
        {view === 'studytimer'   && hubUnlocked && <StudyTimerView />}
        {view === 'goals'        && hubUnlocked && <GoalTrackerView />}
        {view === 'studynotes'   && hubUnlocked && <StudyNotesView />}
        {view === 'travelhub'    && hubUnlocked && <TravelHubView onNavigate={navigate} />}
        {view === 'itinerary'    && hubUnlocked && <TravelItineraryView />}
        {view === 'triptemplate' && hubUnlocked && <TripTemplateView />}
        {view === 'financehub'   && hubUnlocked && <FinanceHubView onNavigate={navigate} />}
        {view === 'expenses'     && hubUnlocked && <ExpenseTrackerView />}
        {view === 'tripbudget'   && hubUnlocked && <TripBudgetView />}
        {view === 'savings'      && hubUnlocked && <SavingsGoalsView />}
        {view === 'journalhub'   && hubUnlocked && <JournalHubView onNavigate={navigate} />}
        {view === 'dailyjournal' && hubUnlocked && <DailyJournalView />}
        {view === 'moodtracker'  && hubUnlocked && <MoodTrackerView />}
        {view === 'weeklyreview' && hubUnlocked && <WeeklyReviewView />}
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

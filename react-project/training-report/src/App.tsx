import { useState } from 'react';
import MainHubView from './views/MainHubView';
import HubView from './views/HubView';
import TestTrackerView from './views/TestTrackerView';
import AttendanceGridView from './views/AttendanceGridView';
import KPIView from './views/KPIView';
import EmailExportView from './views/EmailExportView';
import DataManagerView from './views/DataManagerView';
import CohortDashboardView from './views/CohortDashboardView';
import PrintReportView from './views/PrintReportView';
import TrainingDocumentView from './views/TrainingDocumentView';
import LearningHubView from './views/learning/LearningHubView';
import FlashcardView from './views/learning/FlashcardView';
import QuizView from './views/learning/QuizView';
import StudyTimerView from './views/learning/StudyTimerView';
import GoalTrackerView from './views/learning/GoalTrackerView';
import StudyNotesView from './views/learning/StudyNotesView';
import TravelHubView from './views/travel/TravelHubView';
import TravelItineraryView from './views/travel/TravelItineraryView';
import TripTemplateView from './views/travel/TripTemplateView';
import FinanceHubView from './views/finance/FinanceHubView';
import ExpenseTrackerView from './views/finance/ExpenseTrackerView';
import TripBudgetView from './views/finance/TripBudgetView';
import SavingsGoalsView from './views/finance/SavingsGoalsView';
import JournalHubView from './views/journal/JournalHubView';
import DailyJournalView from './views/journal/DailyJournalView';
import MoodTrackerView from './views/journal/MoodTrackerView';
import WeeklyReviewView from './views/journal/WeeklyReviewView';
import './App.css';

type View =
  | 'main'
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
      { id: 'hub',          label: 'Overview',         icon: '📋' },
      { id: 'testtracker',  label: 'Test Tracker',     icon: '📝' },
      { id: 'attendance',   label: 'Attendance',       icon: '📅' },
      { id: 'kpi',          label: 'KPI',              icon: '🎯' },
      { id: 'cohort',       label: 'Cohort',           icon: '🗂' },
      { id: 'document',     label: 'Doc',              icon: '📄' },
      { id: 'printreport',  label: 'Print',            icon: '🖨' },
      { id: 'email',        label: 'Email',            icon: '✉' },
      { id: 'datamanager',  label: 'Data',             icon: '💾' },
    ],
  },
  {
    id: 'learnhub', label: 'Learning', icon: '🎓', color: 'purple',
    tools: [
      { id: 'learnhub',   label: 'Overview',    icon: '🎓' },
      { id: 'flashcard',  label: 'Flashcards',  icon: '🃏' },
      { id: 'quiz',       label: 'Quiz',        icon: '🧠' },
      { id: 'studytimer', label: 'Timer',       icon: '⏱' },
      { id: 'goals',      label: 'Goals',       icon: '🎯' },
      { id: 'studynotes', label: 'Notes',       icon: '📓' },
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
      { id: 'financehub', label: 'Overview',  icon: '💰' },
      { id: 'expenses',   label: 'Expenses',  icon: '💸' },
      { id: 'tripbudget', label: 'Budget',    icon: '🧾' },
      { id: 'savings',    label: 'Savings',   icon: '🏦' },
    ],
  },
  {
    id: 'journalhub', label: 'Journal', icon: '📔', color: 'coral',
    tools: [
      { id: 'journalhub',   label: 'Overview',  icon: '📔' },
      { id: 'dailyjournal', label: 'Journal',   icon: '✍️' },
      { id: 'moodtracker',  label: 'Mood',      icon: '🌡️' },
      { id: 'weeklyreview', label: 'Review',    icon: '📊' },
    ],
  },
];

function getActiveHub(view: View): HubGroup | null {
  if (view === 'main') return null;
  return HUB_GROUPS.find(g => g.tools.some(t => t.id === view)) ?? null;
}

export default function App() {
  const [view, setView] = useState<View>('main');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function navigate(v: string) { setView(v as View); setMobileMenuOpen(false); }

  const isLanding = view === 'main';
  const activeHub = getActiveHub(view);

  return (
    <div className={`app-v2 ${isLanding ? 'app--landing' : ''}`}>

      {/* ── Top Navigation ── */}
      <header className="topnav">
        <div className="topnav-inner">
          <button className="topnav-brand" onClick={() => navigate('main')}>
            <span className="topnav-brand-icon">✦</span>
            <span className="topnav-brand-name">Quân's Works</span>
          </button>

          <nav className="topnav-hubs">
            {HUB_GROUPS.map(g => (
              <button
                key={g.id}
                className={`topnav-hub ${activeHub?.id === g.id ? `active hub-active-${g.color}` : ''}`}
                onClick={() => navigate(g.id)}
              >
                <span className="topnav-hub-icon">{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </nav>

          <button className="topnav-hamburger" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Menu">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="topnav-mobile-menu">
            <button className="mobile-menu-item" onClick={() => navigate('main')}>🏠 Home</button>
            {HUB_GROUPS.map(g => (
              <div key={g.id} className="mobile-menu-group">
                <button className={`mobile-menu-hub ${activeHub?.id === g.id ? 'active' : ''}`} onClick={() => navigate(g.id)}>
                  {g.icon} {g.label}
                </button>
                {activeHub?.id === g.id && g.tools.map(t => (
                  <button key={t.id} className={`mobile-menu-tool ${view === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Sub-nav for active hub */}
        {activeHub && (
          <div className={`subnav subnav-${activeHub.color}`}>
            <div className="subnav-inner">
              {activeHub.tools.map(t => (
                <button
                  key={t.id}
                  className={`subnav-item ${view === t.id ? 'active' : ''}`}
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

      {/* ── Page Content ── */}
      <main className="main-content">
        {view === 'main'         && <MainHubView onNavigate={navigate} />}
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

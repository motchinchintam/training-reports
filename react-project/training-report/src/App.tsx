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
import './App.css';

type View =
  | 'main'
  | 'hub' | 'testtracker' | 'attendance' | 'kpi' | 'email' | 'datamanager' | 'cohort' | 'printreport' | 'document'
  | 'learnhub' | 'flashcard' | 'quiz' | 'studytimer' | 'goals' | 'studynotes';

const NAV: { id: View; label: string; icon: string }[] = [
  { id: 'main',        label: "Quân's Works",      icon: '🏠' },
  { id: 'hub',         label: 'Overview',           icon: '📋' },
  { id: 'testtracker', label: 'Test Tracker',       icon: '📝' },
  { id: 'attendance',  label: 'Attendance',         icon: '📅' },
  { id: 'kpi',         label: 'KPI Tracker',        icon: '🎯' },
  { id: 'email',       label: 'Email Export',       icon: '✉' },
  { id: 'datamanager', label: 'Data Manager',       icon: '💾' },
  { id: 'cohort',      label: 'Cohort Dashboard',   icon: '🗂' },
  { id: 'printreport', label: 'Print Report',       icon: '🖨' },
  { id: 'document',    label: 'Training Doc',       icon: '📄' },
  { id: 'learnhub',    label: 'Overview',           icon: '🎓' },
  { id: 'flashcard',   label: 'Flashcards',         icon: '🃏' },
  { id: 'quiz',        label: 'Quiz Builder',       icon: '🧠' },
  { id: 'studytimer',  label: 'Study Timer',        icon: '⏱' },
  { id: 'goals',       label: 'Learning Goals',     icon: '🎯' },
  { id: 'studynotes',  label: 'Study Notes',        icon: '📓' },
];

const NAV_GROUPS: { label: string; ids: View[] }[] = [
  { label: "Quân's Works", ids: ['main'] },
  { label: 'Training Hub', ids: ['hub', 'testtracker', 'attendance', 'cohort', 'document', 'kpi', 'printreport', 'email', 'datamanager'] },
  { label: 'Learning Hub', ids: ['learnhub', 'flashcard', 'quiz', 'studytimer', 'goals', 'studynotes'] },
];

export default function App() {
  const [view, setView] = useState<View>('main');

  function navigate(v: string) { setView(v as View); }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand" onClick={() => setView('main')} style={{ cursor: 'pointer' }}>
          <span className="brand-icon">✦</span>
          <span className="brand-name">Quân's Works</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {NAV.filter(n => group.ids.includes(n.id)).map(n => (
                <button key={n.id}
                  className={`nav-item ${view === n.id ? 'active' : ''}`}
                  onClick={() => setView(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  <span className="nav-label">{n.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">All data saved in browser</div>
      </aside>

      <main className="main">
        {view === 'main'        && <MainHubView onNavigate={navigate} />}
        {view === 'hub'         && <HubView onNavigate={navigate} />}
        {view === 'testtracker' && <TestTrackerView />}
        {view === 'attendance'  && <AttendanceGridView />}
        {view === 'kpi'         && <KPIView />}
        {view === 'email'       && <EmailExportView />}
        {view === 'datamanager' && <DataManagerView />}
        {view === 'cohort'      && <CohortDashboardView />}
        {view === 'printreport' && <PrintReportView />}
        {view === 'document'    && <TrainingDocumentView />}
        {view === 'learnhub'    && <LearningHubView onNavigate={navigate} />}
        {view === 'flashcard'   && <FlashcardView />}
        {view === 'quiz'        && <QuizView />}
        {view === 'studytimer'  && <StudyTimerView />}
        {view === 'goals'       && <GoalTrackerView />}
        {view === 'studynotes'  && <StudyNotesView />}
      </main>
    </div>
  );
}

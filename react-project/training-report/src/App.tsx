import { useState } from 'react';
import HubView from './views/HubView';
import TestTrackerView from './views/TestTrackerView';
import AttendanceGridView from './views/AttendanceGridView';
import KPIView from './views/KPIView';
import EmailExportView from './views/EmailExportView';
import DataManagerView from './views/DataManagerView';
import CohortDashboardView from './views/CohortDashboardView';
import PrintReportView from './views/PrintReportView';
import TrainingDocumentView from './views/TrainingDocumentView';
import './App.css';

type View = 'hub' | 'testtracker' | 'attendance' | 'kpi' | 'email' | 'datamanager' | 'cohort' | 'printreport' | 'document';

const NAV = [
  { id: 'hub' as View, label: 'Hub', icon: '🏠' },
  { id: 'testtracker' as View, label: 'Test Tracker', icon: '📝' },
  { id: 'attendance' as View, label: 'Attendance', icon: '📅' },
  { id: 'kpi' as View, label: 'KPI Tracker', icon: '🎯' },
  { id: 'email' as View, label: 'Email Export', icon: '✉' },
  { id: 'datamanager' as View, label: 'Data Manager', icon: '💾' },
  { id: 'cohort' as View, label: 'Cohort Dashboard', icon: '🗂' },
  { id: 'printreport' as View, label: 'Print Report', icon: '🖨' },
  { id: 'document' as View, label: 'Training Doc', icon: '📄' },
];

const NAV_GROUPS = [
  { label: 'Main', ids: ['hub'] },
  { label: 'Training tools', ids: ['testtracker', 'attendance', 'cohort', 'document'] },
  { label: 'Reporting', ids: ['kpi', 'printreport', 'email'] },
  { label: 'Utilities', ids: ['datamanager'] },
];

export default function App() {
  const [view, setView] = useState<View>('hub');

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">📊</span>
          <span className="brand-name">Training Hub</span>
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
        {view === 'hub'         && <HubView onNavigate={v => setView(v as View)} />}
        {view === 'testtracker' && <TestTrackerView />}
        {view === 'attendance'  && <AttendanceGridView />}
        {view === 'kpi'         && <KPIView />}
        {view === 'email'       && <EmailExportView />}
        {view === 'datamanager' && <DataManagerView />}
        {view === 'cohort'      && <CohortDashboardView />}
        {view === 'printreport' && <PrintReportView />}
        {view === 'document'    && <TrainingDocumentView />}
      </main>
    </div>
  );
}

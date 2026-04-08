import { useState, useRef } from 'react';

const STORAGE_KEY = 'report_manager_entries';
const NOTES_KEY = 'report_manager_notes';

interface SavedEntry {
  id: number;
  name: string;
  type: string;
  data: string;
  savedAt: string;
}

function getEntries(): SavedEntry[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function setEntries(e: SavedEntry[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(e)); }

function typeLabel(t: string) { return ({ weekly: 'Weekly', training: 'Training', kpi: 'KPI', other: 'Other' } as Record<string, string>)[t] || 'Other'; }
function typeClass(t: string) { return ({ weekly: 'dm-type-weekly', training: 'dm-type-training', kpi: 'dm-type-kpi', other: 'dm-type-other' } as Record<string, string>)[t] || 'dm-type-other'; }

export default function DataManagerView() {
  const [saveName, setSaveName] = useState('');
  const [saveType, setSaveType] = useState('weekly');
  const [saveData, setSaveData] = useState('');
  const [search, setSearch] = useState('');
  const [entries, setEntriesState] = useState<SavedEntry[]>(() => getEntries());
  const [notes, setNotes] = useState(() => localStorage.getItem(NOTES_KEY) || '');
  const [toast, setToast] = useState<{ msg: string; type?: string } | null>(null);
  const [modal, setModal] = useState<SavedEntry | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  function showToast(msg: string, type?: string) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  }

  function saveEntry() {
    if (!saveName.trim()) { showToast('Please enter a report name', 'amber'); return; }
    if (!saveData.trim()) { showToast('Please enter some data to save', 'amber'); return; }
    const entry: SavedEntry = { id: Date.now(), name: saveName.trim(), type: saveType, data: saveData.trim(), savedAt: new Date().toISOString() };
    const all = [entry, ...getEntries()];
    setEntries(all);
    setSaveName('');
    setSaveData('');
    setEntriesState(all);
    showToast('Report saved!');
  }

  function deleteEntry(id: number) {
    if (!confirm('Delete this saved report?')) return;
    const all = getEntries().filter(e => e.id !== id);
    setEntries(all);
    setEntriesState(all);
    showToast('Deleted', 'red');
  }

  function loadIntoForm(entry: SavedEntry) {
    setSaveName(entry.name + ' (copy)');
    setSaveType(entry.type);
    setSaveData(entry.data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Loaded into form');
  }

  function exportAll() {
    const all = getEntries();
    if (!all.length) { showToast('Nothing to export', 'amber'); return; }
    const json = JSON.stringify({ exported: new Date().toISOString(), entries: all }, null, 2);
    const a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
    a.download = 'report_data_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    showToast('Exported!');
  }

  function importFile(files: FileList | null) {
    if (!files || !files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        const toImport: SavedEntry[] = parsed.entries || [];
        if (!toImport.length) { showToast('No entries found in file', 'amber'); return; }
        const merged = [...toImport, ...getEntries()];
        setEntries(merged);
        setEntriesState(merged);
        showToast(`Imported ${toImport.length} reports!`);
      } catch { showToast('Invalid JSON file', 'red'); }
    };
    reader.readAsText(files[0]);
    if (importRef.current) importRef.current.value = '';
  }

  function saveNotes(val: string) {
    setNotes(val);
    localStorage.setItem(NOTES_KEY, val);
  }

  function copyModalData() {
    if (!modal) return;
    navigator.clipboard.writeText(modal.data).then(() => showToast('Copied!'));
  }

  // Storage info
  let storageUsedKB = 0, storagePct = 0;
  try {
    const used = new Blob([JSON.stringify(localStorage)]).size;
    const max = 5 * 1024 * 1024;
    storageUsedKB = Math.round(used / 1024 * 10) / 10;
    storagePct = Math.min(100, Math.round(used / max * 100));
  } catch {}

  const filtered = entries.filter(e => {
    const q = search.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.type.includes(q);
  });

  const toastBg = toast?.type === 'red' ? '#791F1F' : toast?.type === 'amber' ? '#633806' : '#27500A';
  const toastColor = toast?.type === 'red' ? '#F7C1C1' : toast?.type === 'amber' ? '#FAC775' : '#C0DD97';

  return (
    <div className="view">
      <h2 className="view-title">Report Data Manager</h2>
      <p style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '1.5rem' }}>
        Save, load, and manage all your report data — stored locally in your browser.
      </p>

      {/* Save new */}
      <div className="tt-card">
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Save new report</span></div>
        <div className="tt-card-body">
          <div className="dm-form-grid">
            <div className="tt-field"><label>Report name</label>
              <input value={saveName} onChange={e => setSaveName(e.target.value)}
                placeholder="e.g. Week 14 – Technical Support Training" /></div>
            <div className="tt-field"><label>Report type</label>
              <select value={saveType} onChange={e => setSaveType(e.target.value)}>
                <option value="weekly">Weekly report</option>
                <option value="training">Training report</option>
                <option value="kpi">KPI tracker</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="tt-field" style={{ marginBottom: '12px' }}>
            <label>Data (JSON or plain text)</label>
            <textarea className="dm-data-ta" rows={5} value={saveData}
              onChange={e => setSaveData(e.target.value)}
              placeholder='Paste JSON data from any report, or type notes, key numbers, anything you want to save...' />
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="tt-btn tt-btn-primary" onClick={saveEntry}>Save to browser</button>
            <button className="tt-btn tt-btn-outline" onClick={() => { setSaveName(''); setSaveData(''); }}>Clear</button>
          </div>
          <div className="dm-storage-info">
            Browser storage used: ~{storageUsedKB} KB of ~5 MB ({storagePct}%)
          </div>
          <div className="dm-storage-bar-track">
            <div className="dm-storage-bar-fill" style={{
              width: storagePct + '%',
              background: storagePct > 80 ? '#A32D2D' : storagePct > 60 ? '#854F0B' : '#185FA5'
            }} />
          </div>
        </div>
      </div>

      {/* Saved reports */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-green">Saved reports</span>
          <span style={{ fontSize: '12px', color: 'var(--tx3)', marginLeft: '4px' }}>({entries.length} saved)</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button className="tt-btn tt-btn-outline dm-btn-sm" onClick={exportAll}>Export all</button>
            <button className="tt-btn tt-btn-outline dm-btn-sm" onClick={() => importRef.current?.click()}>Import</button>
            <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
              onChange={e => importFile(e.target.files)} />
          </div>
        </div>
        <div className="tt-card-body">
          <div className="tt-field" style={{ marginBottom: '12px' }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search saved reports..." />
          </div>
          <div className="dm-saved-list">
            {filtered.length === 0 && (
              <div className="dm-empty">{search ? `No results for "${search}"` : 'No saved reports yet. Save one above.'}</div>
            )}
            {filtered.map(e => {
              const d = new Date(e.savedAt).toLocaleString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
              });
              return (
                <div key={e.id} className="dm-saved-item">
                  <div className="dm-saved-meta">
                    <div className="dm-saved-name">{e.name}</div>
                    <div className="dm-saved-info">Saved {d} · {e.data.length} chars</div>
                  </div>
                  <span className={`dm-saved-type ${typeClass(e.type)}`}>{typeLabel(e.type)}</span>
                  <div className="dm-saved-actions">
                    <button className="tt-btn tt-btn-outline dm-btn-sm" onClick={() => setModal(e)}>View</button>
                    <button className="tt-btn tt-btn-outline dm-btn-sm" onClick={() => loadIntoForm(e)}>Edit</button>
                    <button className="tt-btn dm-btn-red dm-btn-sm" onClick={() => deleteEntry(e.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick notes */}
      <div className="tt-card">
        <div className="tt-card-header">
          <span className="tt-badge tt-badge-amber">Quick notes</span>
          <span style={{ fontSize: '12px', color: 'var(--tx3)', marginLeft: 'auto' }}>Auto-saved as you type</span>
        </div>
        <div className="tt-card-body">
          <textarea className="dm-data-ta" rows={5} value={notes}
            onChange={e => saveNotes(e.target.value)}
            placeholder="Quick notes, reminders, or draft text — saved automatically..." />
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="dm-modal-bg" onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="dm-modal">
            <div className="dm-modal-title">{modal.name}</div>
            <div className="tt-field">
              <textarea className="dm-data-ta" rows={10} readOnly value={modal.data} />
            </div>
            <div className="dm-modal-actions">
              <button className="tt-btn tt-btn-outline" onClick={copyModalData}>Copy data</button>
              <button className="tt-btn tt-btn-primary" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="tt-toast show" style={{ background: toastBg, color: toastColor }}>{toast.msg}</div>
      )}
    </div>
  );
}

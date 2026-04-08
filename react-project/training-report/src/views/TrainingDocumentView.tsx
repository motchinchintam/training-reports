import { useState, useRef, useEffect } from 'react';

const STORAGE_KEY = 'training_document_store';
const DRAFT_KEY = 'training_document_draft';

interface TrainingDoc {
  id: string;
  name: string;
  date: string;
  trainer: string;
  program: string;
  summary: string;
  highlights: string;
  actionPlan: string;
  notes: string;
  updatedAt: string;
}

function getSaved(): TrainingDoc[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function setSaved(docs: TrainingDoc[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(docs)); }
function getDraft(): TrainingDoc | null {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); } catch { return null; }
}
function setDraft(doc: TrainingDoc) { localStorage.setItem(DRAFT_KEY, JSON.stringify(doc)); }
function clearDraft() { localStorage.removeItem(DRAFT_KEY); }

const blank: Omit<TrainingDoc, 'id' | 'updatedAt'> = {
  name: '', date: 'April 8, 2026', trainer: 'Your name',
  program: 'Technical Training Program',
  summary: 'Summarize the training progress, key outcomes, and next steps here.',
  highlights: '- Completed technical workshop modules\n- Maintained strong attendance\n- Identified a few trainees needing additional support',
  actionPlan: '- Review assessments and provide feedback\n- Schedule mentoring sessions for at-risk trainees\n- Confirm next assessment date',
  notes: 'Use this area for additional notes that should accompany the training document.',
};

export default function TrainingDocumentView() {
  const [docId, setDocId] = useState('');
  const [docName, setDocName] = useState('');
  const [date, setDate] = useState(blank.date);
  const [trainer, setTrainer] = useState(blank.trainer);
  const [program, setProgram] = useState(blank.program);
  const [summary, setSummary] = useState(blank.summary);
  const [highlights, setHighlights] = useState(blank.highlights);
  const [actionPlan, setActionPlan] = useState(blank.actionPlan);
  const [notes, setNotes] = useState(blank.notes);
  const [savedDocs, setSavedDocs] = useState<TrainingDoc[]>(() => getSaved());
  const [status, setStatus] = useState('No saved document loaded.');
  const importRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      loadFields(draft);
      setStatus(`Restored your last draft from browser storage.`);
    }
    setSavedDocs(getSaved());
  }, []);

  function readFields(): TrainingDoc {
    return {
      id: docId || Date.now().toString(),
      name: docName,
      date, trainer, program, summary, highlights,
      actionPlan, notes,
      updatedAt: new Date().toISOString(),
    };
  }

  function loadFields(doc: TrainingDoc) {
    setDocId(doc.id || '');
    setDocName(doc.name || '');
    setDate(doc.date || '');
    setTrainer(doc.trainer || '');
    setProgram(doc.program || '');
    setSummary(doc.summary || '');
    setHighlights(doc.highlights || '');
    setActionPlan(doc.actionPlan || '');
    setNotes(doc.notes || '');
  }

  function saveDocument() {
    if (!docName.trim()) { setStatus('Enter a document name before saving.'); return; }
    const current = readFields();
    const docs = getSaved();
    const idx = docs.findIndex(d => d.id === current.id);
    if (idx >= 0) docs[idx] = current; else docs.unshift(current);
    setSaved(docs);
    setDraft(current);
    setSavedDocs([...docs]);
    setDocId(current.id);
    setStatus('Document saved locally. You can reload it from the list below.');
  }

  function newDocument() {
    setDocId('');
    setDocName('');
    setDate('');
    setTrainer('');
    setProgram('');
    setSummary('');
    setHighlights('');
    setActionPlan('');
    setNotes('');
    clearDraft();
    setStatus('Ready for a new document.');
  }

  function loadDocument(id: string) {
    const doc = getSaved().find(d => d.id === id);
    if (!doc) { setStatus('Saved document not found.'); return; }
    loadFields(doc);
    setDraft(doc);
    setStatus(`Loaded "${doc.name}" from saved documents.`);
  }

  function deleteDocument(id: string) {
    if (!confirm('Delete this saved document?')) return;
    const docs = getSaved().filter(d => d.id !== id);
    setSaved(docs);
    setSavedDocs(docs);
    if (docId === id) newDocument();
    setStatus('Deleted saved document.');
  }

  function exportDocument() {
    const doc = readFields();
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (doc.name || 'training-document').replace(/[^a-z0-9\-_ ]+/gi, '_') + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setStatus('Exported current document as JSON.');
  }

  function importDocument(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      try {
        const data = JSON.parse(text);
        if (data && typeof data === 'object') {
          loadFields({
            id: data.id || docId || Date.now().toString(),
            name: data.name || docName || file.name,
            date: data.date || '',
            trainer: data.trainer || '',
            program: data.program || '',
            summary: data.summary || '',
            highlights: data.highlights || '',
            actionPlan: data.actionPlan || data.action || '',
            notes: data.notes || '',
            updatedAt: data.updatedAt || new Date().toISOString(),
          });
          setStatus('Imported document from JSON file.');
          return;
        }
      } catch {}
      if (text.trim()) {
        setNotes(text.trim());
        setDocName(file.name.replace(/\.[^.]+$/, ''));
        setStatus('Imported text file into notes.');
      } else {
        setStatus('Uploaded file was empty or invalid.');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="view">
      <div className="td-topbar">
        <div className="td-title-block">
          <h1 className="td-h1">Training Document</h1>
          <p className="td-subtitle">A dedicated workspace for your training report document. Edit sections, save them as documents, and reopen later.</p>
        </div>
        <button className="td-btn td-btn-primary" onClick={() => window.print()}>Print / Export</button>
      </div>

      {/* Save panel */}
      <div className="td-save-panel">
        <div className="td-save-row">
          <div className="td-field" style={{ flex: 1, minWidth: '220px' }}>
            <label>Document name</label>
            <input value={docName} onChange={e => setDocName(e.target.value)} placeholder="e.g. April training report" />
          </div>
          <button className="td-btn td-btn-primary" onClick={saveDocument}>Save document</button>
          <button className="td-btn" onClick={newDocument}>New document</button>
          <button className="td-btn" onClick={() => importRef.current?.click()}>Upload document</button>
          <button className="td-btn" onClick={exportDocument}>Export JSON</button>
          <input ref={importRef} type="file" accept=".json,.txt" style={{ display: 'none' }}
            onChange={e => importDocument(e.target.files?.[0] || null)} />
        </div>
        <div className="td-status">{status}</div>

        {/* Saved documents list */}
        {savedDocs.length > 0 && (
          <div className="td-saved-list">
            {savedDocs.map(doc => (
              <div key={doc.id} className="td-saved-item">
                <div className="td-saved-meta">
                  <div className="td-saved-name">{doc.name}</div>
                  <div className="td-saved-info">Updated {new Date(doc.updatedAt).toLocaleString('en-GB')}</div>
                </div>
                <div className="td-saved-actions">
                  <button className="td-btn td-btn-primary" onClick={() => loadDocument(doc.id)}>Load</button>
                  <button className="td-btn" onClick={() => deleteDocument(doc.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document */}
      <div className="td-document">
        {/* Overview */}
        <div className="td-section">
          <div className="td-section-title">Document overview</div>
          <div className="td-meta-item"><strong>Date</strong>
            <textarea className="td-editable" value={date} onChange={e => setDate(e.target.value)} rows={1} placeholder="Enter date" /></div>
          <div className="td-meta-item"><strong>Trainer</strong>
            <textarea className="td-editable" value={trainer} onChange={e => setTrainer(e.target.value)} rows={1} placeholder="Enter trainer name" /></div>
          <div className="td-meta-item"><strong>Program</strong>
            <textarea className="td-editable" value={program} onChange={e => setProgram(e.target.value)} rows={1} placeholder="Enter program title" /></div>
        </div>

        {/* Executive summary */}
        <div className="td-section">
          <div className="td-section-title">Executive summary</div>
          <textarea className="td-editable" value={summary} onChange={e => setSummary(e.target.value)}
            rows={5} placeholder="Write a short summary of the training status and main findings." />
        </div>

        {/* Highlights */}
        <div className="td-section">
          <div className="td-section-title">Training highlights</div>
          <textarea className="td-editable" value={highlights} onChange={e => setHighlights(e.target.value)}
            rows={5} placeholder="List the key achievements, milestones, or trainee performance highlights." />
        </div>

        {/* Action plan */}
        <div className="td-section">
          <div className="td-section-title">Action plan</div>
          <textarea className="td-editable" value={actionPlan} onChange={e => setActionPlan(e.target.value)}
            rows={5} placeholder="Outline follow-up actions, next training steps, and support requests." />
        </div>

        {/* Notes */}
        <div className="td-section">
          <div className="td-section-title">Notes & remarks</div>
          <textarea className="td-editable" value={notes} onChange={e => setNotes(e.target.value)}
            rows={5} placeholder="Add any additional comments, observations, or training notes." />
        </div>
      </div>

      <div className="td-footer">
        This page is a dedicated training document space. Content is editable directly in the browser.
      </div>
    </div>
  );
}

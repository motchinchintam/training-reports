import { useState } from 'react';
import { PROJECTS } from '../../data/portfolio';
import type { Project } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface WorkViewProps { onNavigate: (v: string) => void; }

type MergedProject = Project & { title: string; context: string; result: string; tags: string[] };

export default function WorkView({ onNavigate }: WorkViewProps) {
  const { s } = useLang();
  const [selected, setSelected] = useState<MergedProject | null>(null);

  const projects: MergedProject[] = PROJECTS.map((p, i) => ({ ...p, ...s.data.projects[i] }));

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="pt-page">

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">{s.work.pageTitle}</h1>
          <p className="pt-page-sub">{s.work.pageSub}</p>
        </div>
      </div>

      <div className="pt-section-inner pt-work-list">
        {projects.map((p, i) => (
          <div key={p.id} className="pt-work-item" onClick={() => setSelected(p)}>
            <span className="pt-work-num">0{i + 1}</span>
            <div className="pt-work-info">
              <div className="pt-work-tags">
                {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
              </div>
              <h2 className="pt-work-title">{p.title}</h2>
              <p className="pt-work-meta">{p.company} · {p.period}</p>
              <p className="pt-work-context">{p.context}</p>
            </div>
            <div className="pt-work-result-block">
              <span className="pt-work-result-label">{s.common.result}</span>
              <span className="pt-work-result-value">{p.result}</span>
            </div>
            <span className="pt-work-arrow">→</span>
          </div>
        ))}
      </div>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">{s.common.footerTag}</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {s.nav[p]}
              </button>
            ))}
          </div>
          <div className="pt-footer-contact">
            <a href="mailto:motchinchiintam@gmail.com">motchinchiintam@gmail.com</a>
          </div>
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}

/* ── Project detail ─────────────────────────────────────────────── */
function ProjectDetail({ project: p, onBack }: { project: MergedProject; onBack: () => void }) {
  const { s } = useLang();
  const detail = p.detail;

  return (
    <div className="pt-page">
      <div className="pt-detail-wrap">

        <button className="pt-back-btn" onClick={onBack}>{s.common.backToWork}</button>

        <div className="pt-detail-header">
          <div className="pt-work-tags">
            {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
          </div>
          <h1 className="pt-detail-title">{p.title}</h1>
          <p className="pt-detail-meta">{p.company} · {p.period}</p>
          <div className="pt-detail-result-bar">
            <span className="pt-detail-result-label">{s.common.result}</span>
            <span className="pt-detail-result-value">{p.result}</span>
          </div>
        </div>

        <div className="pt-detail-body">
          {([
            { label: s.common.overview,  content: detail.overview },
            { label: s.common.problem,   content: detail.problem  },
            { label: s.common.goal,      content: detail.goal     },
            { label: s.common.solution,  content: detail.solution },
          ] as { label: string; content: string }[]).map(sec => (
            <div key={sec.label} className="pt-detail-section">
              <h2 className="pt-detail-section-title">{sec.label}</h2>
              <p className="pt-detail-section-body">{sec.content}</p>
            </div>
          ))}

          <div className="pt-detail-section">
            <h2 className="pt-detail-section-title">{s.common.approach}</h2>
            <ul className="pt-detail-list">
              {detail.approach.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div className="pt-detail-section pt-detail-section--impact">
            <h2 className="pt-detail-section-title">{s.common.impact}</h2>
            <ul className="pt-detail-list pt-detail-list--impact">
              {detail.impact.map((imp, i) => <li key={i}>{imp}</li>)}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

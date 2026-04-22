import { useState } from 'react';
import { INSIGHTS } from '../../data/portfolio';
import type { InsightPost } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface InsightsViewProps { onNavigate: (v: string) => void; }

type MergedInsight = InsightPost & { title: string; excerpt: string; body: string[] };

export default function InsightsView({ onNavigate }: InsightsViewProps) {
  const { s } = useLang();
  const [selected, setSelected] = useState<MergedInsight | null>(null);

  const insights: MergedInsight[] = INSIGHTS.map((ins, i) => ({ ...ins, ...s.data.insights[i] }));

  if (selected) return <InsightDetail post={selected} onBack={() => setSelected(null)} onNavigate={onNavigate} />;

  return (
    <div className="pt-page">

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">{s.insights.pageTitle}</h1>
          <p className="pt-page-sub">{s.insights.pageSub}</p>
        </div>
      </div>

      <div className="pt-section-inner pt-insights-list">
        {insights.map(ins => (
          <div key={ins.id} className="pt-insight-item" onClick={() => setSelected(ins)}>
            <div className="pt-insight-item-meta">
              <span className="pt-tag">{ins.tag}</span>
              <span className="pt-insight-time">{ins.readTime} · {ins.date}</span>
            </div>
            <h2 className="pt-insight-item-title">{ins.title}</h2>
            <p className="pt-insight-item-excerpt">{ins.excerpt}</p>
            <span className="pt-insight-read">{s.common.read}</span>
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

function InsightDetail({ post, onBack, onNavigate }: { post: MergedInsight; onBack: () => void; onNavigate: (v: string) => void }) {
  const { s } = useLang();
  return (
    <div className="pt-page">
      <div className="pt-detail-wrap">

        <button className="pt-back-btn" onClick={onBack}>{s.common.backToInsights}</button>

        <div className="pt-detail-header">
          <div className="pt-insight-item-meta">
            <span className="pt-tag">{post.tag}</span>
            <span className="pt-insight-time">{post.readTime} · {post.date}</span>
          </div>
          <h1 className="pt-detail-title">{post.title}</h1>
        </div>

        <div className="pt-article-body">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>

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
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}

import { TIMELINE } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface AboutViewProps { onNavigate: (v: string) => void; }

export default function AboutView({ onNavigate }: AboutViewProps) {
  const { s } = useLang();
  const strengths = s.data.strengths;
  const timeline  = TIMELINE.map((t, i) => ({ ...t, role: s.data.timeline[i]?.role ?? t.role }));

  return (
    <div className="pt-page">

      <div className="pt-page-hero pt-page-hero--about">
        <div className="pt-section-inner">
          <span className="pt-eyebrow">{s.about.backgroundEyebrow}</span>
          <h1 className="pt-page-title">Nguyen Thanh Quan</h1>
          <p className="pt-page-sub">{s.about.pageSub}</p>
        </div>
      </div>

      {/* Background */}
      <section className="pt-section">
        <div className="pt-section-inner pt-about-body">
          <div className="pt-about-bio">
            <span className="pt-eyebrow">{s.about.backgroundEyebrow}</span>
            <p>{s.about.bio1}</p>
            <p>{s.about.bio2}</p>
            <p>{s.about.bio3}</p>
          </div>

          <div className="pt-about-certs">
            <span className="pt-eyebrow">{s.about.certsEyebrow}</span>
            <div className="pt-cert-card">
              <div className="pt-cert-name">IELTS – Score 6.0 (B2)</div>
              <div className="pt-cert-issuer">British Council · 2018</div>
            </div>
            <div className="pt-cert-card">
              <div className="pt-cert-name">Mid-Level Management &amp; Leadership</div>
              <div className="pt-cert-issuer">HUREDIN Institute · K13 · Excellent · 2025</div>
            </div>
            <div className="pt-cert-card">
              <div className="pt-cert-name">English Pedagogy</div>
              <div className="pt-cert-issuer">University of Khanh Hoa · Merit Scholarship × 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">{s.about.howIWork}</h2>
          <p className="pt-section-sub">{s.about.howIWorkSub}</p>
          <div className="pt-howwork-grid">
            {s.about.principles.map(h => (
              <div key={h.label} className="pt-howwork-card">
                <h3 className="pt-howwork-title">{h.label}</h3>
                <p className="pt-howwork-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">{s.about.coreStrengths}</h2>
          <div className="pt-strengths-grid">
            {strengths.map((st, i) => (
              <div key={st.title} className="pt-strength-card">
                <span className="pt-strength-num">0{i + 1}</span>
                <h3 className="pt-strength-title">{st.title}</h3>
                <p className="pt-strength-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">{s.about.experienceTitle}</h2>
          <div className="pt-timeline">
            {timeline.map(t => (
              <div key={t.period} className="pt-timeline-item">
                <div className="pt-timeline-period">{t.period}</div>
                <div className="pt-timeline-content">
                  <div className="pt-timeline-role">{t.role}</div>
                  <div className="pt-timeline-company">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-cta-section">
        <div className="pt-section-inner pt-cta-inner">
          <p className="pt-cta-line">{s.common.interestedWorking}</p>
          <button className="pt-btn-primary" onClick={() => onNavigate('contact')}>{s.common.contact}</button>
        </div>
      </section>

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

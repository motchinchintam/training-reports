import { TIMELINE } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface AboutViewProps { onNavigate: (v: string) => void; }

export default function AboutView({ onNavigate }: AboutViewProps) {
  const base = import.meta.env.BASE_URL;
  const { s } = useLang();
  const strengths = s.data.strengths;
  const timeline  = TIMELINE.map((t, i) => ({ ...t, role: s.data.timeline[i]?.role ?? t.role }));

  return (
    <div className="pt-page">

      {/* ── Hero with floating photos ────────────────────────────────────── */}
      <div className="pt-page-hero pt-page-hero--about">
        <div className="pt-section-inner pt-about-hero-inner">
          <div className="pt-about-hero-text">
            <span className="pt-eyebrow">{s.about.backgroundEyebrow}</span>
            <h1 className="pt-page-title">Nguyen Thanh Quan</h1>
            <p className="pt-page-sub">{s.about.pageSub}</p>
          </div>
          <div className="pt-about-hero-photos">
            <img src={`${base}photo4.jpg`} alt="" className="pt-about-hero-photo pt-about-hero-photo--main" />
            <img src={`${base}photo5.jpg`} alt="" className="pt-about-hero-photo pt-about-hero-photo--accent" />
          </div>
        </div>
      </div>

      {/* ── Background ──────────────────────────────────────────────────── */}
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

      {/* ── Photo strip ─────────────────────────────────────────────────── */}
      <div className="pt-photo-strip-wrap">
        <div className="pt-photo-strip">
          {['photo1', 'photo2', 'photo3', 'photo7'].map(p => (
            <img key={p} src={`${base}${p}.jpg`} alt="" className="pt-strip-photo" />
          ))}
        </div>
      </div>

      {/* ── How I work ──────────────────────────────────────────────────── */}
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

      {/* ── Core Strengths ──────────────────────────────────────────────── */}
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

      {/* ── Experience timeline ──────────────────────────────────────────── */}
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

      {/* ── Key Achievements ────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">Key Achievements</h2>
          <div className="pt-achievements-grid">
            {[
              { metric: '700 → 4,000+', label: 'Merchant accounts scaled in 12 months', co: 'Global Liaison' },
              { metric: '20% → 5%',     label: 'Client churn rate reduced across 1,800 merchants', co: 'Zota Brand' },
              { metric: '+35%',         label: 'Category revenue growth through structured upselling', co: 'Lotte Duty Free' },
              { metric: '+40%',         label: 'Average transaction value increased via upselling', co: 'MaxSport' },
              { metric: '100+',         label: 'Staff trained with 85%+ average pass rate', co: 'Multiple roles' },
              { metric: '0%',           label: 'Attrition in Marketing cohort during onboarding redesign', co: 'Mango for Salon' },
            ].map(a => (
              <div key={a.metric} className="pt-achievement-card">
                <div className="pt-achievement-metric">{a.metric}</div>
                <div className="pt-achievement-label">{a.label}</div>
                <div className="pt-achievement-co">{a.co}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <a
              href="/quan-resume.pdf"
              download="Nguyen_Thanh_Quan_Resume.pdf"
              className="pt-cv-download"
            >
              ⬇ Download Full CV
            </a>
          </div>
        </div>
      </section>

      {/* ── Beyond Work ─────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">{s.about.currentlyTitle}</h2>
          <div className="pt-currently-grid">

            {/* Mandarin — featured card with danda.vn */}
            <a
              href="https://danda.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="pt-currently-card pt-currently-card--featured"
            >
              <div className="pt-currently-icon">🀄</div>
              <div className="pt-currently-body">
                <div className="pt-currently-title">{s.about.learningMandarin}</div>
                <div className="pt-currently-desc">{s.about.dandaDesc}</div>
                <div className="pt-currently-link">danda.vn ↗</div>
              </div>
            </a>

            {/* English */}
            <div className="pt-currently-card">
              <div className="pt-currently-icon">🇬🇧</div>
              <div className="pt-currently-body">
                <div className="pt-currently-title">{s.about.learningEnglish}</div>
                <div className="pt-currently-desc">{s.about.englishDesc}</div>
              </div>
            </div>

            {/* Travel */}
            <div className="pt-currently-card">
              <div className="pt-currently-icon">✈️</div>
              <div className="pt-currently-body">
                <div className="pt-currently-title">{s.about.planningTravel}</div>
                <div className="pt-currently-desc">{s.about.travelDesc}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
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

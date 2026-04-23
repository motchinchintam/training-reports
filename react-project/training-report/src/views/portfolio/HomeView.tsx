import type React from 'react';
import { PROJECTS } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface HomeViewProps { onNavigate: (v: string) => void; }

const MOTTO = '"The world is a book, and those who do not travel read only one page."';

const STATS = [
  { num: '6+',   label: 'Yrs Experience'  },
  { num: '100+', label: 'Staff Trained'   },
  { num: '4K+',  label: 'Merchants'       },
  { num: '85%+', label: 'Avg Pass Rate'   },
];

const CURRENTLY = [
  { icon: '🀄', label: 'Learning Mandarin' },
  { icon: '🇬🇧', label: 'Improving English' },
  { icon: '✈️', label: 'Planning to travel' },
];

const TRUST_METRICS = [
  { metric: '700 → 4,000+', label: 'Merchant accounts scaled',    company: 'Global Liaison' },
  { metric: '20% → 5%',     label: 'Client churn rate reduced',   company: 'Zota Brand'     },
  { metric: '100+',         label: 'Staff trained & onboarded',   company: 'Multiple roles'  },
  { metric: '85%+',         label: 'Average training pass rate',  company: 'Mango for Salon' },
];

function anim(d: string): React.CSSProperties {
  return { '--d': d } as React.CSSProperties;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const base = import.meta.env.BASE_URL;
  const { s } = useLang();

  const projects = PROJECTS.slice(0, 3).map((p, i) => ({ ...p, ...s.data.projects[i] }));

  return (
    <div className="pt-page">

      {/* ── 1. HERO — App-style split layout ─────────────────────────────── */}
      <div className="lp-split home-hero-split">

        {/* LEFT — cream info panel */}
        <div className="lp-panel-left">
          <p className="lp-greeting lp-anim" style={anim('0ms')}>{s.home.greeting}</p>
          <h1 className="lp-name lp-anim"    style={anim('100ms')}>Quân</h1>
          <p className="lp-role lp-anim"     style={anim('200ms')}>
            HR &amp; Sales Training · HRD · Language Learner
          </p>
          <p className="lp-quote lp-anim" style={anim('300ms')}>{MOTTO}</p>

          {/* Social icons */}
          <div className="lp-socials lp-anim" style={anim('380ms')}>
            <a href="https://www.facebook.com/availableeeeee/" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-fb" title="Facebook">f</a>
            <a href="https://www.instagram.com/motchinchintam" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-ig" title="Instagram">◎</a>
            <a href="https://zalo.me/0916366443" target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-zalo" title="Zalo">Z</a>
          </div>

          {/* Currently */}
          <div className="lp-currently lp-anim" style={anim('460ms')}>
            <div className="lp-section-label">Currently</div>
            <div className="lp-currently-chips">
              {CURRENTLY.map(c => (
                <span key={c.label} className="lp-currently-chip">{c.icon} {c.label}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="lp-stats lp-anim" style={anim('540ms')}>
            {STATS.map((st, i) => (
              <div key={st.label} className="lp-stat"
                style={i < STATS.length - 1 ? { borderRight: '1px solid rgba(92,122,60,0.2)' } : {}}>
                <div className="lp-stat-num">{st.num}</div>
                <div className="lp-stat-label">{st.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="lp-ctas lp-anim" style={anim('620ms')}>
            <button className="pt-btn-primary"     onClick={() => onNavigate('work')}>{s.common.viewWork}</button>
            <button className="home-btn-secondary" onClick={() => onNavigate('contact')}>{s.common.contact}</button>
          </div>
        </div>

        {/* RIGHT — dark photo panel */}
        <div className="lp-panel-right">
          <img
            src={`${base}photo6.jpg`}
            alt="Nguyen Thanh Quan"
            className="lp-photo"
            onError={e => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
        </div>
      </div>

      {/* ── 2. TRUST / METRICS BAR ────────────────────────────────────────── */}
      <div className="pt-trust-bar">
        <div className="pt-trust-inner">
          <span className="pt-trust-label">Key Results</span>
          <div className="pt-trust-metrics">
            {TRUST_METRICS.map(m => (
              <div key={m.metric} className="pt-trust-metric">
                <div className="pt-trust-num">{m.metric}</div>
                <div className="pt-trust-desc">{m.label}</div>
                <div className="pt-trust-company">{m.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. SELECTED WORK ──────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <div>
              <span className="pt-eyebrow">{s.home.selectedWork}</span>
              <h2 className="pt-section-title" style={{ marginTop: '.25rem' }}>{s.home.selectedWork}</h2>
            </div>
            <button className="pt-link-btn" onClick={() => onNavigate('work')}>{s.common.seeAll}</button>
          </div>
          <div className="pt-home-work-list">
            {projects.map((p, i) => (
              <div key={p.id} className="pt-home-work-item" onClick={() => onNavigate('work')}>
                <div className="pt-home-work-num">0{i + 1}</div>
                <div className="pt-home-work-body">
                  <div className="pt-home-work-tags">
                    {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
                  </div>
                  <h3 className="pt-home-work-title">{p.title}</h3>
                  <p className="pt-home-work-context">{p.context}</p>
                </div>
                <div className="pt-home-work-result">
                  <div className="pt-home-work-result-label">Result</div>
                  <div className="pt-home-work-result-val">{p.result}</div>
                </div>
                <div className="pt-home-work-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT PREVIEW ──────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner pt-home-about">
          <div className="pt-home-about-photos">
            <img src={`${base}photo1.jpg`} alt="" className="pt-collage-main"   />
            <img src={`${base}photo2.jpg`} alt="" className="pt-collage-accent" />
          </div>
          <div className="pt-home-about-text">
            <span className="pt-eyebrow">{s.home.aboutEyebrow}</span>
            <h2 className="pt-section-title">{s.home.aboutHeadline}</h2>
            <p className="pt-home-about-body">{s.home.aboutBody}</p>
            <button className="pt-btn-primary" style={{ marginTop: '.5rem' }} onClick={() => onNavigate('about')}>
              {s.home.fullAbout}
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ────────────────────────────────────────────────────────── */}
      <section className="pt-cta-section">
        <div className="pt-section-inner pt-cta-inner">
          <div>
            <p className="pt-cta-line">{s.common.interestedWorking}</p>
            <p className="pt-cta-sub">Based in Ho Chi Minh City · Available for remote collaboration</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="pt-btn-primary" onClick={() => onNavigate('contact')}>{s.common.contact}</button>
            <a
              href="https://www.linkedin.com/in/motchinchintam/"
              target="_blank" rel="noopener noreferrer"
              className="pt-cta-linkedin"
            >LinkedIn ↗</a>
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ─────────────────────────────────────────────────────── */}
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
            <a href="https://www.linkedin.com/in/motchinchintam/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}

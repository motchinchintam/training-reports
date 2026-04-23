import type React from 'react';
import { PROJECTS, INSIGHTS } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface HomeViewProps { onNavigate: (v: string) => void; }

const MOTTO = '"The world is a book, and those who do not travel read only one page."';

const STATS = [
  { num: '6+',   label: 'Yrs Exp'       },
  { num: '100+', label: 'Staff Trained'  },
  { num: '4K+',  label: 'Accounts'      },
  { num: '3',    label: 'Languages'     },
];

const CURRENTLY = [
  { icon: '🀄', label: 'Learning Mandarin' },
  { icon: '🇬🇧', label: 'Improving English' },
  { icon: '✈️', label: 'Planning to travel' },
];

const SOCIAL_STATIC = [
  { platform: 'instagram', image: '', link: 'https://www.instagram.com/motchinchintam/', likes: 47 },
  { platform: 'facebook',  image: '', link: 'https://www.facebook.com/motchinchintam',  likes: 62 },
  { platform: 'instagram', image: '', link: 'https://www.instagram.com/motchinchintam/', likes: 38 },
];

const SOCIAL_DATES = ['Apr 2026', 'Mar 2026', 'Mar 2026'];

function anim(d: string): React.CSSProperties {
  return { '--d': d } as React.CSSProperties;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const base = import.meta.env.BASE_URL;
  const { s } = useLang();

  const projects  = PROJECTS.slice(0, 3).map((p, i) => ({ ...p, ...s.data.projects[i] }));
  const insights  = INSIGHTS.map((ins, i) => ({ ...ins, ...s.data.insights[i] }));
  const strengths = s.data.strengths;

  return (
    <div className="pt-page">

      {/* ── Hero — App-style split layout ────────────────────────────────── */}
      <div className="lp-split home-hero-split">

        {/* LEFT — cream info panel */}
        <div className="lp-panel-left">

          {/* Identity */}
          <p className="lp-greeting lp-anim" style={anim('0ms')}>{s.home.greeting}</p>
          <h1 className="lp-name lp-anim"    style={anim('100ms')}>Quân</h1>
          <p className="lp-role lp-anim"     style={anim('200ms')}>
            HR &amp; Sales Training · Language Learner · Traveler
          </p>

          {/* Quote */}
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

          {/* CTA buttons */}
          <div className="lp-ctas lp-anim" style={anim('620ms')}>
            <button className="pt-btn-primary"      onClick={() => onNavigate('work')}>{s.common.viewWork}</button>
            <button className="home-btn-secondary"  onClick={() => onNavigate('contact')}>{s.common.contact}</button>
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

      {/* ── Selected Work ─────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <h2 className="pt-section-title">{s.home.selectedWork}</h2>
            <button className="pt-link-btn" onClick={() => onNavigate('work')}>{s.common.seeAll}</button>
          </div>
          <div className="pt-projects-grid">
            {projects.map(p => (
              <div key={p.id} className="pt-project-card" onClick={() => onNavigate('work')}>
                <div className="pt-project-tags">
                  {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
                </div>
                <h3 className="pt-project-title">{p.title}</h3>
                <p className="pt-project-context">{p.context}</p>
                <div className="pt-project-result">{p.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Snapshot ────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner pt-about-snap">
          <div className="pt-about-snap-text">
            <span className="pt-eyebrow">{s.home.aboutEyebrow}</span>
            <h2 className="pt-section-title">{s.home.aboutHeadline}</h2>
            <p className="pt-about-snap-body">{s.home.aboutBody}</p>
            <div className="pt-snap-stats">
              <div className="pt-snap-stat"><span className="pt-abs-num">6+</span><span className="pt-abs-label">{s.home.statsYrs}</span></div>
              <div className="pt-snap-stat"><span className="pt-abs-num">100+</span><span className="pt-abs-label">{s.home.statsTrained}</span></div>
              <div className="pt-snap-stat"><span className="pt-abs-num">4K+</span><span className="pt-abs-label">{s.home.statsAccounts}</span></div>
              <div className="pt-snap-stat"><span className="pt-abs-num">85%+</span><span className="pt-abs-label">{s.home.statsPass}</span></div>
            </div>
            <button className="pt-link-btn" onClick={() => onNavigate('about')}>{s.home.fullAbout}</button>
          </div>
          <div className="pt-about-snap-visual">
            <div className="pt-photo-collage">
              <img src={`${base}photo1.jpg`} alt="" className="pt-collage-main"   />
              <img src={`${base}photo2.jpg`} alt="" className="pt-collage-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths ────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">{s.home.coreStrengths}</h2>
          <p className="pt-section-sub">{s.home.strengthsSub}</p>
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

      {/* ── Photo strip ──────────────────────────────────────────────────── */}
      <div className="pt-photo-strip-wrap">
        <div className="pt-photo-strip">
          {['photo3', 'photo4', 'photo5', 'photo7'].map(p => (
            <img key={p} src={`${base}${p}.jpg`} alt="" className="pt-strip-photo" />
          ))}
        </div>
      </div>

      {/* ── Insights ─────────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <h2 className="pt-section-title">{s.insights.pageTitle}</h2>
            <button className="pt-link-btn" onClick={() => onNavigate('insights')}>{s.common.seeAll}</button>
          </div>
          <div className="pt-insights-grid">
            {insights.map(ins => (
              <div key={ins.id} className="pt-insight-card" onClick={() => onNavigate('insights')}>
                <div className="pt-insight-meta">
                  <span className="pt-tag">{ins.tag}</span>
                  <span className="pt-insight-time">{ins.readTime} · {ins.date}</span>
                </div>
                <h3 className="pt-insight-title">{ins.title}</h3>
                <p className="pt-insight-excerpt">{ins.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Feed ──────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <h2 className="pt-section-title">{s.home.fromMyFeed}</h2>
            <div className="pt-social-links">
              <a href="https://www.instagram.com/motchinchintam/" target="_blank" rel="noopener noreferrer" className="pt-social-pill pt-social-pill--ig">Instagram ↗</a>
              <a href="https://www.facebook.com/motchinchintam" target="_blank" rel="noopener noreferrer" className="pt-social-pill pt-social-pill--fb">Facebook ↗</a>
            </div>
          </div>
          <div className="pt-social-grid">
            {SOCIAL_STATIC.map((post, i) => (
              <a key={i} href={post.link} target="_blank" rel="noopener noreferrer" className="pt-social-card">
                <div className="pt-social-card-top">
                  <span className={`pt-social-badge pt-social-badge--${post.platform}`}>
                    {post.platform === 'instagram' ? '📸 Instagram' : '📘 Facebook'}
                  </span>
                  <span className="pt-social-date">{SOCIAL_DATES[i]}</span>
                </div>
                <p className="pt-social-caption">{s.home.socialCaptions[i]}</p>
                <div className="pt-social-card-footer">
                  <span className="pt-social-likes">♥ {post.likes}</span>
                  <span className="pt-social-cta">{s.common.read}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="pt-social-note">{s.home.socialNote}</p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="pt-cta-section">
        <div className="pt-section-inner pt-cta-inner">
          <p className="pt-cta-line">{s.common.interestedWorking}</p>
          <button className="pt-btn-primary" onClick={() => onNavigate('contact')}>{s.common.contact}</button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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

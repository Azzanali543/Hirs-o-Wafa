
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';

import { createRoot } from 'react-dom/client';

import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Play,
  X,
  Menu,
  Globe,
  Plus,
  Download,
  ArrowLeft,
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  characters,
  members,
  copy,
  config,
} from './data';

import './style.css';
import './palace.css';

import {
  StudioIntro,
  Locations,
  MediaSections,
  Synopsis,
  ScriptReader,
  Workflow,
} from './PalaceSections';

import { resumes } from './resumes';
import { useCinematicScroll } from './useCinematicScroll';

gsap.registerPlugin(ScrollTrigger);

const portraitFiles = {
  king: 'king-portrait.png',
  queen: 'queen-portrait.jpeg',
  rayyan: 'rayyan-portrait.png',
  zayan: 'zayan-portrait.png',
  sara: 'sara-portrait.png',
  kareem: 'kareem-portrait.png',
  hamza: 'hamza-portrait.png',
};

const img = (n) =>
  `/images/${portraitFiles[n] || n + '.webp'}`;

function App() {
  const [lang, setLang] = useState('en');

  const [page, setPage] = useState(
    location.hash.startsWith('#resumes') ? 'resumes' : 'home'
  );

  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(0);

  const root = useRef();
  const dialog = useRef();
  const lastFocus = useRef();
  const logoTarget = useRef();

  const t = copy[lang];
  const ur = lang === '';

  // Handle navigation changes
  useEffect(() => {
    const fn = () => {
      const next = location.hash.startsWith('#resumes')
        ? 'resumes'
        : 'home';

      if (next !== page) {
        stopAnimations();
        setPage(next);
      }

      setMenu(false);
    };

    window.addEventListener('hashchange', fn);

    return () => {
      window.removeEventListener('hashchange', fn);
    };
  }, [page]);

  // Update document language and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ur ? 'rtl' : 'ltr';

    document.title = ur
      ? 'حرص و وفا — مسٹیک اسٹوڈیو'
      : 'Hirs o Wafa — Between ambition & loyalty';
  }, [lang]);

  const stopAnimations = useCinematicScroll(root, page, lang);

  // Handle page scrolling
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });

    const id = requestAnimationFrame(() => {
      const hash = location.hash.slice(1);

      if (page === 'home' && hash) {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: 'instant' });
      }
    });

    return () => cancelAnimationFrame(id);
  }, [page]);

  // Modal accessibility and keyboard controls
  useEffect(() => {
    if (modal === null) return;

    lastFocus.current = document.activeElement;

    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    dialog.current?.querySelector('button')?.focus();

    const key = (e) => {
      if (e.key === 'Escape') {
        setModal(null);
      }

      if (e.key === 'Tab') {
        const a = [
          ...dialog.current.querySelectorAll('button, a[href]'),
        ];

        if (
          e.shiftKey &&
          document.activeElement === a[0]
        ) {
          e.preventDefault();
          a.at(-1)?.focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === a.at(-1)
        ) {
          e.preventDefault();
          a[0]?.focus();
        }
      }
    };

    document.addEventListener('keydown', key);

    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener('keydown', key);
      lastFocus.current?.focus();
    };
  }, [modal]);

  // YouTube video handler
  const watch = () => {
    if (config.youtubeUrl.includes('https://youtu.be/5fT9ymPvvh0?si=iaTMviAfUWp3HIUd')) {
      setModal('video');
    } else {
      window.open(
        config.youtubeUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  // Navigation helpers
  const resume = (i) => {
    if (page !== 'resumes') {
      stopAnimations();
    }

    setSelected(i);
    setMenu(false);

    location.hash = 'resumes';
    setPage('resumes');
  };

  const home = () => {
    if (page !== 'home') {
      stopAnimations();
    }

    location.hash = '';
    setPage('home');

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  // Reusable section heading
  const title = (label, a, b) => (
    <div className="section-heading reveal">
      <p className="eyebrow">{label}</p>

      <h2>
        {a}
        <br />
        <em>{b}</em>
      </h2>
    </div>
  );

  // Handle internal section links
  const handleSectionLink = (e) => {
    const a = e.target.closest('a[href^="#"]');

    if (!a) return;

    const id = a.getAttribute('href').slice(1);

    if (!id || id === 'resumes') return;

    e.preventDefault();

    history.pushState(null, '', '#' + id);

    requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      const el = document.getElementById(id);

      if (el) {
        const st = ScrollTrigger.getAll().find(
          (x) => x.trigger === el && x.pin
        );

        window.scrollTo({
          top: st
            ? st.start
            : window.scrollY +
              el.getBoundingClientRect().top -
              25,
          behavior: 'instant',
        });
      }
    });
  };

  return (
    <div ref={root} onClick={handleSectionLink}>
      <StudioIntro logoTarget={logoTarget} />

      <div className="scroll-progress" />

      {/* Navigation */}
      <header className="site-nav">
        <a href="#" className="brand" onClick={home}>
          <img
            ref={logoTarget}
            className="nav-studio-logo"
            src="/images/studio-logo.webp"
            alt="Mystique Studio"
          />

          <span className="brand-wordmark">
            {t.studio}
            <small>{t.studioNote}</small>
          </span>
        </a>

        <nav
          className={menu ? 'nav-links open' : 'nav-links'}
          aria-label={ur ? 'مرکزی فہرست' : 'Main navigation'}
        >
          {t.nav.map((x, i) => (
            <a
              key={x}
              href={'#' + ['story', 'court', 'watch', 'team'][i]}
              onClick={() => {
                if (page !== 'home') stopAnimations();

                setPage('home');
                setMenu(false);
              }}
            >
              {x}
            </a>
          ))}

          <details className="nav-discover">
            <summary>{ur ? 'مزید' : 'Explore'}</summary>

            <div>
              {[
                ['locations', ur ? 'مقامات' : 'Locations'],
                ['ost', ur ? 'موسیقی' : 'Soundtrack'],
                ['teaser', ur ? 'ٹیزر' : 'Teaser'],
                ['synopsis', ur ? 'خلاصہ' : 'Synopsis'],
                ['script', ur ? 'اسکرپٹ' : 'Urdu script'],
                ['workflow', ur ? 'تخلیقی سفر' : 'Our process'],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={'#' + id}
                  onClick={(e) => {
                    if (page !== 'home') stopAnimations();

                    setPage('home');
                    setMenu(false);

                    e.currentTarget
                      .closest('details')
                      .open = false;
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </details>

          <a href="#resumes" onClick={() => resume(0)}>
            {t.resumes}
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="language"
            onClick={() => {
              stopAnimations();
              setLang(ur ? 'en' : 'ur');
            }}
            aria-label={t.language}
          >
            <Globe size={15} />
            {ur ? 'English' : 'اردو'}
          </button>

          <button
            className="mobile-menu"
            aria-label={t.menu}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Home Page */}
      {page === 'home' ? (
        <main key="home">

          {/* Hero Section */}
          <section className="hero">
            <img
              className="hero-image"
              src={img('hero')}
              alt=""
            />

            <div className="hero-shade" />

            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-line" />
                {t.eyebrow}
              </p>

              <div className="urdu-title" lang="ur">
                حرص و وفا
              </div>

              <h1>{t.title}</h1>

              <p className="hero-tagline">
                {t.subtitle} <em>{t.subtitle2}</em>
              </p>

              <p className="hero-intro">{t.intro}</p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="button gold"
                  onClick={watch}
                >
                  <Play size={15} fill="currentColor" />
                  {t.watch}
                </button>

                <a className="button outline" href="#story">
                  {t.explore}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="hero-bottom">
              <a href="#story">
                <ArrowDown size={16} />
                {t.scroll}
              </a>

              <span>{t.credit}</span>
              <span>MYSTIQUE STUDIO</span>
            </div>
          </section>

          {/* Theme Strip */}
          <div className="theme-strip">
            <span>✧</span>
            {t.legacy}
            <span>✧</span>
            {t.legacy}
            <span>✧</span>
          </div>

          {/* Story Section */}
          <section
            id="story"
            className="story section-pad"
          >
            <div className="story-art reveal">
              <img
                src={img('feast')}
                alt={
                  ur
                    ? 'شاہی دسترخوان پر بادشاہ اور ملکہ'
                    : 'King and Queen at the royal banquet'
                }
                loading="lazy"
              />

              <span className="image-corner">✦</span>

              <div className="image-caption">
                {t.chapter} 01
                <span>
                  {ur
                    ? 'وراثت کا وزن'
                    : 'The weight of a legacy'}
                </span>
              </div>
            </div>

            <div>
              {title(
                t.storyLabel,
                t.storyTitle,
                t.storyItalic
              )}

              <div className="story-text reveal">
                <p>{t.story}</p>
                <p>{t.story2}</p>

                <div className="tags">
                  {t.tags.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="quote-band">
            <div className="reveal">
              <span className="ornament">✦</span>

              <blockquote aria-label={t.quote}>
                {t.quote.split(' ').map((word, i) => (
                  <span
                    className="quote-word"
                    aria-hidden="true"
                    key={i}
                  >
                    {word}{' '}
                  </span>
                ))}
              </blockquote>

              <p className="eyebrow">{t.quoteNote}</p>
            </div>
          </section>

          <Synopsis ur={ur} />

          <Locations ur={ur} />

          {/* Character Gallery */}
          <section
            id="court"
            className="court section-pad"
          >
            <div className="section-top">
              {title(
                t.courtLabel,
                t.courtTitle,
                t.courtItalic
              )}

              <p className="section-aside reveal">
                {t.courtIntro}
              </p>
            </div>

            <div className="gallery-toolbar">
              <span>
                {ur
                  ? 'کرداروں کے سفر کے لیے اسکرول کریں'
                  : 'SCROLL TO JOURNEY THROUGH THE CHARACTERS'}
              </span>

              <span>
                <b className="gallery-current">01</b> / 07
              </span>
            </div>

            <div className="gallery-window">
              <div className="character-grid">
                {characters.map((c, i) => (
                  <button
                    className="character-card"
                    dir={ur ? 'rtl' : 'ltr'}
                    key={c[0]}
                    onClick={() => setModal(i)}
                    aria-label={`${t.character}: ${c[ur ? 2 : 1]}`}
                  >
                    <div className={'portrait ' + c[0]}>
                      <img
                        src={img(c[0])}
                        alt={c[ur ? 2 : 1]}
                        loading="lazy"
                      />

                      <span className="character-number">
                        0{i + 1}
                      </span>

                      <span className="card-plus">
                        <Plus size={20} />
                      </span>
                    </div>

                    <p>{c[ur ? 4 : 3]}</p>
                    <h3>{c[ur ? 2 : 1]}</h3>
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-progress">
              <span className="gallery-progress-fill" />
            </div>
          </section>

          {/* Watch Section */}
          <section
            id="watch"
            className="watch section-pad"
          >
            <div className="section-top">
              {title(
                t.watchLabel,
                t.watchTitle,
                t.watchItalic
              )}

              <p className="section-aside reveal">
                {t.watchDesc}
              </p>
            </div>

            <button
              onClick={watch}
              className="film-thumbnail reveal"
              aria-label={t.watch}
            >
              <img
                src={img('siblings')}
                alt={
                  ur
                    ? 'حرص و وفا کا فلمی پوسٹر'
                    : 'Hirs o Wafa film thumbnail'
                }
                loading="lazy"
              />

              <span className="film-tint" />

              <span className="film-top">
                {t.credit}
                <span>{t.preview}</span>
              </span>

              <span className="play-circle">
                <Play size={32} fill="currentColor" />
              </span>

              <span className="film-bottom">
                <span className="film-title">
                  {t.title}
                </span>

                <span>
                  {t.play}
                  <ArrowUpRight size={17} />
                </span>
              </span>
            </button>

            <p className="placeholder-note">
              {t.placeholder}
            </p>
          </section>

          <MediaSections ur={ur} />

          <ScriptReader ur={ur} />

          <Workflow ur={ur} />

          {/* Reviews */}
          <section className="reviews section-pad">
            {title(
              t.reviewLabel,
              t.reviewTitle,
              t.reviewItalic
            )}

            <div className="review-grid">
              {t.reviews.map((r, i) => (
                <article
                  className="review reveal"
                  key={i}
                >
                  <span
                    className="stars"
                    aria-hidden="true"
                  >
                    ✦ ✦ ✦ ✦ ✦
                  </span>

                  <blockquote>
                    “{r[0]}”
                  </blockquote>

                  <div className="review-person">
                    <span>
                      {ur ? 'ر' : r[1][0]}
                    </span>

                    <p>
                      {r[1]}
                      <small>{r[2]}</small>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="placeholder-note">
              {t.reviewNote}
            </p>
          </section>

          {/* Garden Divider */}
          <section className="garden-divider">
            <img
              className="parallax-img"
              src={img('garden')}
              alt=""
              loading="lazy"
            />

            <div>
              <span>✦</span>
              <p>{t.footerLine}</p>
            </div>
          </section>

          {/* Team Section */}
          <section
            id="team"
            className="team section-pad"
          >
            <div className="section-top">
              {title(
                t.teamLabel,
                t.teamTitle,
                t.teamItalic
              )}

              <p className="section-aside reveal">
                {t.teamText}
              </p>
            </div>

            <div className="team-grid">
              {members.map((m, i) => (
                <article
                  className="team-card reveal"
                  key={m[0]}
                >
                  <div className="team-card-top">
                    <span className="member-initial">
                      {ur
                        ? m[1].slice(0, 1)
                        : m[0]
                            .split(' ')
                            .map((x) => x[0])
                            .slice(0, 2)
                            .join('')}
                    </span>

                    <span className="roll">
                      {t.roll}
                      <br />
                      {m[2]}
                    </span>
                  </div>

                  <h3>{m[ur ? 1 : 0]}</h3>

                  <p>{m[ur ? 4 : 3]}</p>

                  <button onClick={() => resume(i)}>
                    {t.viewResume}
                    <ArrowUpRight size={18} />
                  </button>
                </article>
              ))}
            </div>

            <p className="placeholder-note">
              {t.dummy}
            </p>
          </section>
        </main>
      ) : (

        /* Resume Page */
        <main
          key="resumes"
          className="resume-page section-pad"
        >
          <button className="back-link" onClick={home}>
            <ArrowLeft size={16} />
            {t.home}
          </button>

          {title(
            t.resumeLabel,
            t.resumeTitle,
            t.resumeItalic
          )}

          <p className="resume-intro">
            {t.resumeText}
          </p>

          <p className="placeholder-note">
            {t.dummy}
          </p>

          <div className="resume-layout">
            <aside
              className="resume-tabs"
              aria-label={t.resumes}
            >
              {members.map((m, i) => (
                <button
                  key={m[0]}
                  onClick={() => setSelected(i)}
                  className={
                    selected === i ? 'active' : ''
                  }
                  aria-pressed={selected === i}
                >
                  <span>0{i + 1}</span>
                  {m[ur ? 1 : 0]}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </aside>

            <article
              className="resume-image-card"
              key={selected}
              dir="ltr"
            >
              <div className="resume-image-toolbar">
                <h1 lang="en">
                  {members[selected][0]}
                </h1>

                <a
                  className="button gold"
                  href={resumes[selected].image}
                  download={resumes[selected].downloadName}
                >
                  <Download size={17} />
                  {ur
                    ? 'تعارف ڈاؤن لوڈ کریں'
                    : 'Download résumé'}
                </a>
              </div>

              <img
                className="resume-static-image"
                src={resumes[selected].image}
                alt={`${members[selected][0]} — sample résumé`}
                width="1240"
                height="1754"
              />

              <p className="resume-image-note">
                {ur
                  ? 'یہ ایک مستقل تصویر ہے۔ زبان بدلنے سے اس کا متن تبدیل نہیں ہوتا۔'
                  : 'This résumé is a static image. Its content stays the same in both languages.'}
              </p>
            </article>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-main">
          <a
            href="#"
            onClick={home}
            className="footer-title"
          >
            {t.title}
            <span>حرص و وفا</span>
          </a>

          <p>{t.footerLine}</p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            aria-label={t.top}
          >
            <ArrowUp />
          </button>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.footerNote}
          </span>

          <a
            href="#resumes"
            onClick={() => resume(0)}
          >
            {t.resumes}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      {/* Modal */}
      {modal !== null && (
        <div
          className="modal-backdrop"
          onClick={() => setModal(null)}
        >
          <div
            className={
              'modal ' +
              (modal === 'video' ? 'video-modal' : '')
            }
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModal(null)}
              aria-label={t.close}
            >
              <X />
            </button>

            {modal === 'video' ? (
              <>
                <span className="ornament">✦</span>

                <h2 id="modal-title">{t.yt}</h2>

                <p>{t.ytText}</p>

                <button
                  className="button gold"
                  onClick={() => setModal(null)}
                >
                  {t.okay}
                </button>
              </>
            ) : (
              <>
                <img
                  src={img(characters[modal][0])}
                  alt={characters[modal][ur ? 2 : 1]}
                />

                <div className="modal-copy">
                  <p className="eyebrow">
                    {characters[modal][ur ? 4 : 3]}
                  </p>

                  <h2 id="modal-title">
                    {characters[modal][ur ? 2 : 1]}
                  </h2>

                  <p>
                    {characters[modal][ur ? 6 : 5]}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

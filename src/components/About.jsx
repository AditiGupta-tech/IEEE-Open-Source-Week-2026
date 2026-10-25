import { Fragment, useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import '../styles/osw-shared.css';
import './About.css';

/* ---------- EDIT CONTENT HERE ---------- */
const MANIFESTO =
  'Open Source Week is a one-week celebration of collaboration, learning, and innovation. Join us for an immersive experience featuring hands-on workshops, inspiring talks from industry leaders, and opportunities to contribute to real open-source projects.';

const POINTS = [
  ['Learn', 'From first commit to merged pull request.'],
  ['Build', 'Contribute alongside peers and mentors.'],
  ['Connect', 'Meet maintainers and engineers.'],
];
/* --------------------------------------- */

const WORDS = MANIFESTO.split(' ');
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function About() {
  const textRef = useRef(null);
  // how many words are highlighted (all of them if the user prefers reduced motion)
  const [lit, setLit] = useState(() => (reducedMotion() ? WORDS.length : 0));
  const [ptsRef, ptsIn] = useReveal();

  // Words light up one by one as the paragraph scrolls into view
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = textRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.88 - r.top) / (r.height + window.innerHeight * 0.25);
      setLit(Math.max(0, Math.min(WORDS.length, Math.ceil(p * WORDS.length))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className="osw-sec about">
      <div className="osw-w about-grid">
        <div className="about-big0" aria-hidden="true">00</div>
        <div>
          <h2 className="osw-sr">About Open Source Week</h2>
          <p className="osw-k">About</p>
          <p className="about-mf" ref={textRef}>
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className={i < lit ? 'on' : undefined}>{w}</span>
              </Fragment>
            ))}
          </p>
          <div ref={ptsRef} className={`about-pts osw-rv${ptsIn ? ' in' : ''}`}>
            {POINTS.map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

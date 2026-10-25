import { useEffect, useMemo, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import '../styles/osw-shared.css';
import './FAQs.css';

/* ---------- EDIT CONTENT HERE ---------- */
const CATEGORIES = [
  ['all', 'All Queries'],
  ['general', 'General'],
  ['eligibility', 'Eligibility'],
  ['experience', 'Experience'],
  ['prizes', 'Swags & Perks'],
];

const FAQS = [
  {
    id: 'what',
    cat: 'general',
    q: 'What is Open Source Week?',
    a: 'Open Source Week is a premier 7-day technical festival hosted by IEEE IGDTUW, uniting students, industry mentors, and maintainers. It includes hands-on Git workshops, open-source project hacking, keynote fireside chats, and swags.',
  },
  {
    id: 'who',
    cat: 'eligibility',
    q: 'Who can participate in Open Source Week?',
    a: 'Any enrolled college student curious about open source, coding, and collaborative engineering can participate! Both solo contributors and collaborative squads from all branches and years are welcome.',
  },
  {
    id: 'experience',
    cat: 'experience',
    q: 'Do I need prior open-source experience to join?',
    a: 'Absolutely NOT! We have dedicated beginner-friendly tracks, including "Git & GitHub for Beginners" and "Creating Your First Open Source Pull Request". Mentors will guide you through every single step.',
  },
  {
    id: 'fee',
    cat: 'general',
    q: 'Is there any registration fee?',
    a: 'Registration is completely FREE of cost! You can register directly through the Unstop platform and join our Discord channel to connect with mentors and peers.',
  },
  {
    id: 'perks',
    cat: 'prizes',
    q: 'Will I get certificates and exclusive goodies?',
    a: 'Yes! All active participants who complete workshop tasks and submit valid pull requests receive an official Certificate of Participation from IEEE IGDTUW. Top contributors will win cash prizes, medals, and branded IEEE swags!',
  },
];

const LEAD = "Got queries? We've got answers. Explore everything you need to know about Open Source Week.";

const CONTACT = {
  email: 'igdtwieee@gmail.com',
  discordUrl: '', // TODO: paste the Discord invite link, the button appears automatically
};

// floating words in the background
const DOUBTS = [
  '?', '¿', 'How to submit PR?', 'Is it free?', 'Can I join solo?', 'Swags?',
  'First Year eligible?', 'No Git experience?', 'What if code breaks?',
  'Discord link?', 'Certificates?',
];
/* --------------------------------------- */

const COLORS = ['#22D3EE', '#2F5BFF', '#B4F1FB', '#8268F0'];

/** Floating questions that drift around and move away from the cursor. */
function DoubtsCanvas({ hostRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const cv = canvasRef.current;
    if (!host || !cv) return undefined;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -1000, y: -1000 };
    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = true;
    let nodes = [];

    const seed = () => {
      const count = W < 600 ? 12 : 24;
      nodes = Array.from({ length: count }, () => ({
        text: DOUBTS[(Math.random() * DOUBTS.length) | 0],
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 12 + Math.random() * 6,
        alpha: 0.08 + Math.random() * 0.14,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 10 || n.x > W - 10) n.vx *= -1;
          if (n.y < 10 || n.y > H - 10) n.vy *= -1;
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120 && d > 0) {
            const f = (120 - d) / 120;
            n.x += (dx / d) * f * 5;
            n.y += (dy / d) * f * 5;
          }
        }
        ctx.font = `500 ${n.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha;
        ctx.fillText(n.text, n.x, n.y);
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodes.length) seed();
      nodes.forEach((n) => {
        n.x = Math.min(n.x, W - 10);
        n.y = Math.min(n.y, H - 10);
      });
      if (reduce) draw();
    };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [hostRef]);

  return <canvas ref={canvasRef} className="faq-canvas" aria-hidden="true" />;
}

export default function FAQs() {
  const hostRef = useRef(null);
  const [cat, setCat] = useState('all');
  const [openId, setOpenId] = useState(FAQS[0].id); // first answer open, like the design
  const [headRef, headIn] = useReveal();

  const visible = useMemo(
    () => FAQS.filter((f) => cat === 'all' || f.cat === cat),
    [cat]
  );

  return (
    <section id="faq" className="osw-sec faq" ref={hostRef}>
      <DoubtsCanvas hostRef={hostRef} />

      <div className="osw-w faq-content">
        <div ref={headRef} className={`osw-rv${headIn ? ' in' : ''}`}>
          <p className="osw-k">FAQs</p>
          <h2 className="osw-h2 faq-h2">
            Ask<br />
            <span className="osw-out">anything.</span>
          </h2>
          <p className="faq-lead">{LEAD}</p>
        </div>

        <div className="faq-tabs" role="group" aria-label="Filter questions by category">
          {CATEGORIES.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="faq-tab"
              aria-pressed={cat === key}
              onClick={() => setCat(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {visible.map((f, i) => {
            const open = openId === f.id;
            return (
              <div key={f.id} className={`faq-item${open ? ' is-open' : ''}`}>
                <h3 className="faq-h3">
                  <button
                    type="button"
                    className="faq-q"
                    id={`faq-q-${f.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${f.id}`}
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{f.q}</span>
                    <span className="faq-ic" aria-hidden="true">+</span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${f.id}`}
                  className="faq-a"
                  role="region"
                  aria-labelledby={`faq-q-${f.id}`}
                >
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-ask">
          <div>
            <b>Have a question that&rsquo;s not answered here?</b>
            <p>Join the IEEE IGDTUW Discord server or reach out to our team directly.</p>
          </div>
          <div className="faq-ask-actions">
            {CONTACT.discordUrl && (
              <a
                className="osw-btn"
                href={CONTACT.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord
              </a>
            )}
            <a className="osw-btn osw-btn--f" href={`mailto:${CONTACT.email}`}>
              Email us &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const introRef = useRef(null);
  const skipRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cv = canvasRef.current;
    const glow = glowRef.current;
    const intro = introRef.current;
    const skip = skipRef.current;
    const title = titleRef.current;
    const tag = tagRef.current;
    const cx = cv.getContext("2d");

    let dead = false;
    let raf = 0;
    let rampRaf = 0;
    const timers = [];
    const later = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- warp starfield ---------- */
    let W = 0;
    let H = 0;
    let speed = 2;
    let target = 2;
    const colors = ["#22e4ff", "#8b5cff", "#ffffff", "#ff4fd8"];
    const stars = Array.from({ length: 380 }, () => ({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 2200,
      z: Math.random() * 1200 + 10,
      c: colors[(Math.random() * 4) | 0],
    }));

    const resize = () => {
      W = cv.width = hero.clientWidth;
      H = cv.height = hero.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    const frame = () => {
      if (dead) return;
      cx.fillStyle = "rgba(4,6,13," + (speed > 10 ? 0.28 : 0.5) + ")";
      cx.fillRect(0, 0, W, H);
      speed += (target - speed) * 0.04;
      for (const s of stars) {
        const px = (s.x / s.z) * 400 + W / 2;
        const py = (s.y / s.z) * 400 + H / 2;
        s.z -= speed;
        if (s.z < 5) {
          s.z = 1200;
          s.x = (Math.random() - 0.5) * 2200;
          s.y = (Math.random() - 0.5) * 2200;
          continue;
        }
        const nx = (s.x / s.z) * 400 + W / 2;
        const ny = (s.y / s.z) * 400 + H / 2;
        cx.strokeStyle = s.c;
        cx.globalAlpha = Math.min(1, 1.4 - s.z / 1000);
        cx.lineWidth = Math.max(0.6, (1200 - s.z) / 500);
        cx.beginPath();
        cx.moveTo(px, py);
        cx.lineTo(nx, ny);
        cx.stroke();
      }
      cx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    frame();

    /* ---------- intro ---------- */
    let started = false;

    intro.classList.remove("osw-out");
    hero.classList.add("osw-locked");
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* ---------- scrambling title ---------- */
    const scramble = (el) => {
      const text = el.dataset.t;
      const chars = "01<>/{}#$%&";
      let i = 0;
      const id = setInterval(() => {
        el.textContent = text
          .split("")
          .map((c, k) =>
            c === " " ? " " : k < i ? c : chars[(Math.random() * chars.length) | 0]
          )
          .join("");
        i += 0.7;
        if (i > text.length + 1) {
          el.textContent = text;
          clearInterval(id);
        }
      }, 35);
      timers.push(id);
    };

    /* ---------- typing line ---------- */
    const typeTag = () => {
      const words = ["DISCOVER", "DEVELOP", "DELIVER"];
      let i = 0;
      let j = 0;
      let deleting = false;
      const step = () => {
        if (dead) return;
        const word = words[i];
        if (!deleting) {
          tag.textContent = word.slice(0, ++j);
          if (j === word.length) {
            deleting = true;
            later(step, 1300);
            return;
          }
        } else {
          tag.textContent = word.slice(0, --j);
          if (!j) {
            deleting = false;
            i = (i + 1) % words.length;
          }
        }
        later(step, deleting ? 40 : 90);
      };
      step();
    };

    const enter = () => {
      if (started || dead) return;
      started = true;
      target = 2.4;
      intro.classList.add("osw-out");
      hero.classList.remove("osw-locked");
      document.body.style.overflow = oldOverflow;
      later(() => {
        scramble(title);
        typeTag();
      }, 500);
    };

    if (reduceMotion) {
      target = 1;
      enter();
    } else {
      target = 8;
      const t0 = performance.now();
      const ramp = () => {
        if (started || dead) return;
        const k = Math.min((performance.now() - t0) / 2800, 1);
        target = 8 + k * k * k * 90;
        if (k < 1) rampRaf = requestAnimationFrame(ramp);
      };
      ramp();
      later(enter, 2800);
    }

    skip.addEventListener("click", enter);

    /* ---------- cursor glow (inside hero only) ---------- */
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.opacity = 1;
      glow.style.left = e.clientX - r.left + "px";
      glow.style.top = e.clientY - r.top + "px";
    };
    hero.addEventListener("mousemove", onMove);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rampRaf);
      timers.forEach(clearTimeout);
      ro.disconnect();
      skip.removeEventListener("click", enter);
      hero.removeEventListener("mousemove", onMove);
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  return (
    <section className="osw-hero osw-locked" id="hero" ref={heroRef}>
      <canvas className="osw-fx" ref={canvasRef} />
      <div className="osw-glow" ref={glowRef} />

      <div className="osw-intro" ref={introRef}>
        <button className="osw-skip" ref={skipRef} type="button">
          Skip
        </button>
      </div>

      <div className="osw-inner">
        <div>
          <h1 ref={titleRef} data-t="OPEN SOURCE WEEK">
            OPEN SOURCE WEEK
          </h1>
          <div className="osw-tag osw-mono" ref={tagRef} />
          <a
            href="#registration"
            className="osw-btn"
            style={{ marginTop: 22 }}
          >
            REGISTER NOW
          </a>
          <div className="osw-blurb">
            <b style={{ color: "var(--osw-cyan)" }}>OPEN SOURCE WEEK</b> – Where
            Ideas Ignite and Innovation Thrives. A platform that empowers women
            to address real-life challenges head-on and showcase their
            creativity and ingenuity.
          </div>
          <div className="osw-org">
            Institute of Electrical and Electronics Engineers, Indira Gandhi
            Delhi Technical University for Women
          </div>
        </div>

        <div className="osw-orb">
          <i />
          <i />
          <i />
          <b>01</b>
        </div>
      </div>
    </section>
  );
}
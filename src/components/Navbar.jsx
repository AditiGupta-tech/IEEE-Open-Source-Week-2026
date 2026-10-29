import { useState } from "react";
import logo from "../assets/ieee-logo.png";

const LINKS = [
  ["About", "#about"],
  ["Highlights", "#highlights"],
  ["Themes", "#themes"],
  ["Timeline", "#timeline"],
  ["Events", "#events"],
  ["Speakers", "#speakers"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Primary">
      <div className="w">
        <a className="lg" href="#hero" aria-label="IEEE IGDTUW - Home">
          <img src={logo} alt="IEEE IGDTUW" />
        </a>
        <button
          className="bg"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
        <div
          className={"ls" + (open ? " o" : "")}
          id="ls"
          onClick={(e) => {
            if (e.target.tagName === "A") setOpen(false);
          }}
        >
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a className="btn" href="#register">Register</a>
        </div>
      </div>
    </nav>
  );
}

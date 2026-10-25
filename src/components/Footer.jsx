import '../styles/osw-shared.css';
import './Footer.css';

/* ---------- EDIT CONTENT HERE ---------- */
const YEAR = 2026;

// Keep these ids identical to the section ids in the other components
const NAV = [
  ['Home', '#hero'],
  ['About', '#about'],
  ['Timeline', '#timeline'],
  ['Registration', '#register'],
  ['Events', '#events'],
];

const SOCIALS = [
  { label: 'Official LinkedIn Community', url: '' }, // TODO: paste LinkedIn URL
  { label: 'Instagram @ieeeigdtuw', url: '' }, // TODO: paste Instagram URL
];

const EMAIL = 'igdtwieee@gmail.com';
/* --------------------------------------- */

export default function Footer() {
  return (
    <footer className="ft">
      <div className="osw-w">
        <div className="ft-grid">
          <div>
            <h3 className="ft-h">IEEE IGDTUW</h3>
            <address className="ft-addr">
              Indira Gandhi Delhi Technical University for Women,
              <br />
              New Church Rd, Opp. St James Church,
              <br />
              Kashmere Gate, Delhi 110006
            </address>
          </div>

          <nav aria-label="Footer">
            <h3 className="ft-h">Navigation Links</h3>
            <ul className="ft-list">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="ft-h">Get In Touch</h3>
            <ul className="ft-list">
              {SOCIALS.map(({ label, url }) => (
                <li key={label}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
              <li className="ft-mail">
                Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bar">
          <span>
            Developed by IEEE IGDTUW Technical Team · &copy; IEEE IGDTUW {YEAR} | All rights reserved.
          </span>
          <a href="#hero">Back to top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}

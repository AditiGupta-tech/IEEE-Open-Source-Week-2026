
import "./Prizes.css";

const prizes = [
  {
    id: "01",
    place: "1st Place",
    icon: "🏆",
    description: "Prize details to be confirmed.",
    className: "prizes-first",
  },
  {
    id: "02",
    place: "2nd Place",
    icon: "🥈",
    description: "Prize details to be confirmed.",
    className: "prizes-second",
  },
  {
    id: "03",
    place: "3rd Place",
    icon: "🥉",
    description: "Prize details to be confirmed.",
    className: "prizes-third",
  },
];

export default function Prizes() {
  return (
    <section id="prizes" className="osw-sec prizes-section">
      <div className="osw-w">
        <p className="osw-k">Recognition & Rewards</p>

        <h2 className="osw-h2">
          Grand Prizes <span className="osw-out">&amp; Swag</span>
        </h2>

        <p className="prizes-intro">
          Celebrate your contributions with exciting rewards and exclusive swag.
        </p>

        <div className="prizes-grid">
          {prizes.map((prize) => (
            <article
              className={`prize-card ${prize.className}`}
              key={prize.id}
            >
              <div className="prize-icon" aria-hidden="true">
                {prize.icon}
              </div>

              <h3>{prize.place}</h3>

              <p className="prize-description">
                {prize.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

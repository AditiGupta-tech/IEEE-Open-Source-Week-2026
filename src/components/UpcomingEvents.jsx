
import "./UpcomingEvents.css";

const events = [
  {
    id: "01",
    category: "Workshop",
    date: "Date TBA",
    title: "Event title one",
    description: "A short description of the event goes here.",
  },
  {
    id: "02",
    category: "Hackathon",
    date: "Date TBA",
    title: "Event title two",
    description: "A short description of the event goes here.",
  },
  {
    id: "03",
    category: "Talk",
    date: "Date TBA",
    title: "Event title three",
    description: "A short description of the event goes here.",
  },
];

export default function UpcomingEvents() {
  return (
    <section id="events" className="osw-sec upcoming-events">
      <div className="osw-w">
        <p className="osw-k">What's next</p>

        <h2 className="osw-h2">
          Upcoming <span className="osw-out">Events</span>
        </h2>

        <p className="upcoming-events-intro">
          Explore the events happening during Open Source Week.
        </p>

        <div className="upcoming-events-list">
          {events.map((event) => (
            <article className="upcoming-event-card" key={event.id}>
              <span className="upcoming-event-number">{event.id}</span>
              <p className="upcoming-event-meta">
                {event.category} · {event.date}
              </p>
              <h3>{event.title}</h3>
              <p className="upcoming-event-description">
                {event.description}
              </p>
              <span className="upcoming-event-link">
                Details coming soon
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


import About from './components/About';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import UpcomingEvents from './components/UpcomingEvents';
import Prizes from './components/Prizes';

// Temporary placeholders for sections teammates are building
const Stub = ({ id, label }) => (
  <section
    id={id}
    style={{
      minHeight: '60vh',
      display: 'grid',
      placeItems: 'center',
      color: '#8DAAFF',
      fontFamily: 'var(--mo)',
      fontSize: '12px',
    }}
  >
    {label}
  </section>
);

export default function App() {
  return (
    <>
      <main>
        <Stub id="hero" label="Hero (teammate)" />
        <About />
        <Stub id="timeline" label="Timeline (teammate)" />

        <UpcomingEvents />
        <Prizes />

        <Stub id="register" label="Registration (teammate)" />
        <FAQs />
      </main>

      <Footer />
    </>
  );
}

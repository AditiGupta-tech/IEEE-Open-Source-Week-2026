
import Hero from './components/Hero';
import About from './components/About';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import Timeline from './components/Timeline';
import Themes from './components/Themes';
import Speakers from './components/Speakers';
import UpcomingEvents from './components/UpcomingEvents';
import Prizes from './components/Prizes';
import Navbar from './components/Navbar';

import './styles/osw.css';

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
    <div className="osw">
      <Navbar />

      <main>
        <Hero />

        <About />

        <Timeline />

        <Themes />



        <Speakers />

        <UpcomingEvents />

        <Prizes />



        <FAQs />
      </main>

      <Footer />
    </div>
  );
}

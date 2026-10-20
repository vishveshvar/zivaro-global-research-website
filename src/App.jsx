import React, { useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Industries from './components/Industries';
import Methodology from './components/Methodology';
import Insights from './components/Insights';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollTrigger } from './utils/gsap';

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger when images load and layout stabilizes
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div id="smooth-wrapper" style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}>
      {/* 0. Custom Interactive Cursor */}
      <Cursor />

      {/* 1. Header with Scroll Progress & Auto-Hide */}
      <Navbar />

      <div id="smooth-content">
        <main id="main">
          {/* 2. Hero with Interactive Canvas Dots & 3D Live Intelligence Board */}
          <Hero />



          {/* 4. Research Capabilities — Scroll-Drawn Journey */}
          <Services />

          {/* 5. Industry Verticals — Expanding Panels & Marquee Ticker */}
          <Industries />

          {/* 6. Methodology Framework — 4-Stage Stacking Card Deck */}
          <Methodology />

          {/* 7. Editorial Insights & Selected Work — Draggable Carousel */}
          <Insights />

          {/* 8. Leadership Team — Founder-Led Directorship */}
          <Leadership />

          {/* 9. Direct Engagement & Inquiry Brief Form */}
          <Contact />
        </main>

        {/* 10. Global Footer & Regulatory Compliance */}
        <Footer />
      </div>
    </div>
  );
}

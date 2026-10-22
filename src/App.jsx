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
import { RouterProvider, useRouter } from './utils/router';

// Dedicated Pages
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ExpertisePage from './pages/ExpertisePage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';
import EnquirePage from './pages/EnquirePage';

function AppContent() {
  const { currentPath, navigate } = useRouter();

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

  useEffect(() => {
    // Intercept clicks on internal footer links for seamless SPA transitions
    const handleDocumentClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      // Handle footer and in-page anchor mappings
      const pageAnchorMap = {
        '#services': '/services',
        '#expertise': '/expertise',
        '#work': '/work',
        '#contact': '/contact',
        '#top': '/',
      };

      if (pageAnchorMap[href]) {
        e.preventDefault();
        navigate(pageAnchorMap[href]);
      } else if (href === '#process' || href === '#leadership') {
        e.preventDefault();
        if (currentPath === '/') {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/' + href);
        }
      } else if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [currentPath, navigate]);

  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'Zivaro Global Research — Strategic Market Intelligence & Advisory';
    }
  }, [currentPath]);

  // Page Component Mapping
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/expertise':
        return <ExpertisePage />;
      case '/work':
        return <WorkPage />;
      case '/contact':
        return <ContactPage />;
      case '/enquire':
        return <EnquirePage />;
      default:
        // Approved Homepage — 100% Unchanged
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div id="smooth-wrapper" style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}>
      {/* 0. Custom Interactive Cursor */}
      <Cursor />

      {/* 1. Header with Scroll Progress & Auto-Hide */}
      <Navbar />

      <div id="smooth-content">
        <main id="main">
          {renderCurrentPage()}
        </main>

        {/* 10. Global Footer & Regulatory Compliance */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'Leadership', href: '#leadership' },
  ];

  useEffect(() => {
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!header) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => {
        const y = s.scroll();
        header.classList.toggle('is-scrolled', y > 8);
        header.classList.toggle(
          'is-hidden',
          s.direction === 1 && y > 320 && !document.documentElement.classList.contains('menu-open')
        );
        if (progress) {
          gsap.set(progress, { scaleX: s.progress });
        }
      },
    });

    return () => st.kill();
  }, []);

  const toggleMobileMenu = () => {
    const next = !mobileMenuOpen;
    setMobileMenuOpen(next);
    document.documentElement.classList.toggle('menu-open', next);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.documentElement.classList.remove('menu-open');
  };

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="wrap bar">
          {/* Brand Logo */}
          <a 
            className="brand" 
            href="#top" 
            aria-label="Zivaro Global Research — Home"
            onClick={closeMenu}
          >
            <img 
              src="/assets/img/logo-dark-sm.png" 
              alt="Zivaro Global Research" 
              width="600" 
              height="186" 
              onError={(e) => {
                e.currentTarget.src = './assests/logo-dark.png';
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="nav" aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  className="btn btn-primary btn-sm" 
                  href="#contact" 
                  data-magnetic
                  onClick={closeMenu}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="menu-btn" 
            type="button" 
            aria-label="Menu" 
            aria-expanded={mobileMenuOpen} 
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            <span />
            <span />
          </button>
        </div>

        {/* Scroll Progress Line */}
        <div className="progress" aria-hidden="true">
          <i ref={progressRef} />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={closeMenu}>
            {link.name}
          </a>
        ))}
        <a className="btn btn-primary" href="#contact" onClick={closeMenu}>
          Contact Us
        </a>
      </div>
    </>
  );
}

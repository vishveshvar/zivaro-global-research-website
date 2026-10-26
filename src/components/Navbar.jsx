import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';
import { useRouter } from '../utils/router';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const { currentPath, navigate } = useRouter();

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Work', href: '/work' },
  ];

  useEffect(() => {
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      // Coordinated Page Entrance Sequence for Navbar
      if (!isReducedMotion()) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
          header,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          '.brand',
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.5 },
          '-=0.45'
        )
        .fromTo(
          '.nav li',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.45 },
          '-=0.35'
        );
      }

      // ScrollTrigger for sticky state & reading progress
      ScrollTrigger.create({
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
    }, headerRef);

    return () => ctx.revert();
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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    navigate(href);
  };

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="wrap bar">
          {/* Brand Logo */}
          <a 
            className="brand" 
            href="/" 
            aria-label="Zivaro Global Research — Home"
            onClick={(e) => handleNavClick(e, '/')}
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
                  <a 
                    href={link.href} 
                    className={currentPath === link.href ? 'is-active' : ''}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  className="btn btn-primary btn-sm" 
                  href="/contact" 
                  data-magnetic
                  onClick={(e) => handleNavClick(e, '/contact')}
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
          <a 
            key={link.name} 
            href={link.href} 
            className={currentPath === link.href ? 'is-active' : ''}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </a>
        ))}
        <a 
          className="btn btn-primary" 
          href="/contact" 
          onClick={(e) => handleNavClick(e, '/contact')}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}

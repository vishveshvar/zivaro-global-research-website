import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isReducedMotion, isFinePointer } from '../utils/gsap';
import BrandHealthCard from './BrandHealthCard';

const CYCLING_SECTORS = [
  'healthcare & life sciences',
  'consumer brands & retail',
  'B2B & technology markets',
  'cross-border intelligence',
];

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const boardRef = useRef(null);

  const [cycleIndex, setCycleIndex] = useState(0);
  const [cycleFading, setCycleFading] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) return;

    const timer = setInterval(() => {
      setCycleFading(true);
      setTimeout(() => {
        setCycleIndex((prev) => (prev + 1) % CYCLING_SECTORS.length);
        setCycleFading(false);
      }, 350);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const reduce = isReducedMotion();
    const fine = isFinePointer();

    // 1. CURSOR-REACTIVE DOT FIELD
    let ctx = canvas.getContext('2d');
    let W = 0, H = 0, gap = 26, cols = 0, rows = 0;
    let mx = -9999, my = -9999, tx = -9999, ty = -9999;
    let t0 = performance.now();
    let visible = true;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / gap) + 1;
      rows = Math.ceil(H / gap) + 1;
    };

    const draw = (now) => {
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
      mx += (tx - mx) * 0.14;
      my += (ty - my) * 0.14;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          const x = k * gap;
          const y = r * gap;
          const ddx = x - mx;
          const ddy = y - my;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          let p = Math.max(0, 1 - d / 190);
          p = p * p;

          if (p > 0.02) {
            ctx.fillStyle = `rgba(101,191,255,${(0.25 + 0.7 * p).toFixed(3)})`;
            const s = 1.4 + 2.8 * p;
            ctx.beginPath();
            ctx.arc(x - ddx * 0.06 * p, y - ddy * 0.06 * p, s, 0, 6.2832);
            ctx.fill();
          } else {
            const wave = reduce ? 0.5 : 0.5 + 0.5 * Math.sin((x * 0.55 + y) / 95 - t * 1.1);
            ctx.fillStyle = `rgba(7,27,51,${(0.06 + 0.08 * wave).toFixed(3)})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e) => {
      const b = canvas.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
    };

    const handleMouseLeave = () => {
      tx = -9999;
      ty = -9999;
    };

    if (fine) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
    }

    if (reduce) {
      draw(t0);
      visible = false;
    } else {
      raf = requestAnimationFrame(draw);
    }

    // 3. 3D PERSPECTIVE TILT ON BOARD
    const board = boardRef.current;
    if (board && fine && !reduce) {
      gsap.set(board, { transformPerspective: 1400 });
      const brx = gsap.quickTo(board, 'rotationX', { duration: 0.9, ease: 'power3' });
      const bry = gsap.quickTo(board, 'rotationY', { duration: 0.9, ease: 'power3' });
      const glowX = gsap.quickTo('.hero-glow', 'x', { duration: 1.4, ease: 'power3' });
      const glowY = gsap.quickTo('.hero-glow', 'y', { duration: 1.4, ease: 'power3' });

      const handleBoardMove = (e) => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        bry(px * 7);
        brx(-py * 5);
        glowX(px * 60);
        glowY(py * 40);
      };

      const handleBoardLeave = () => {
        brx(0);
        bry(0);
        glowX(0);
        glowY(0);
      };

      hero.addEventListener('mousemove', handleBoardMove);
      hero.addEventListener('mouseleave', handleBoardLeave);
    }

    // 4. HERO ENTRANCE TIMELINE
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (!reduce) {
      tl.fromTo('.hero-eyebrow-container', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo('.hero-h1', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
        .fromTo('.hero-lead-text', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-actions > *', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-stats > li', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7 }, '-=0.4')
        .to('.hl', { backgroundSize: '100% .14em', duration: 0.8, ease: 'power3.inOut' }, '-=0.5')
        .fromTo('.bcard-main', { opacity: 0, y: 44, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out' }, 0.45);

      gsap.to('.bcard-main', { y: -6, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.6 });
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (fine) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(raf);
      tl.kill();
    };
  }, []);



  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Interactive Cursor-Reactive Dot Field */}
      <canvas ref={canvasRef} className="hero-dots" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-grid">
        {/* Left: Typography & Strategic Action Cluster */}
        <div className="hero-copy">
          <div className="hero-eyebrow-container">
            <span className="eyebrow">
              Research for{' '}
              <span
                style={{
                  display: 'inline-block',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginLeft: '4px',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  opacity: cycleFading ? 0 : 1,
                  transform: cycleFading ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {CYCLING_SECTORS[cycleIndex]}
              </span>
            </span>
          </div>

          <h1 className="t-hero hero-h1">
            Understand the <span className="hl">Market</span>.
            Anticipate What's Next.
          </h1>

          <p className="lead hero-lead-text">
            We provide customized, full-spectrum market research services. We transform complex market dynamics into actionable intelligence, helping organizations decode behavior, evaluate opportunities, and make confident strategic decisions.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#services" data-magnetic>
              Explore Our Expertise{' '}
              <span className="arr">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </a>
            <a className="btn btn-secondary" href="#contact" data-magnetic>
              Let's Discuss Research
            </a>
          </div>

          {/* Verified Metrics Counter Strip */}
          <ul className="hero-stats">
            <li>
              <b>52+</b>
              <span>Happy Clients</span>
            </li>
            <li>
              <b>78+</b>
              <span>Projects Completed</span>
            </li>
            <li>
              <b>94%</b>
              <span>Research Excellence / Retention</span>
            </li>
          </ul>
        </div>

        {/* Right: Live Interactive Intelligence Board */}
        <div ref={boardRef} className="board">
          <BrandHealthCard />
        </div>
      </div>

      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        <i />
      </a>
    </section>
  );
}

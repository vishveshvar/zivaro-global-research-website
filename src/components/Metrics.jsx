import React, { useEffect, useRef } from 'react';
import { Award, BarChart2, TrendingUp, CheckCircle, Shield } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

export default function Metrics() {
  const sectionRef = useRef(null);
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Numerical Counting Up Animation
      const counterTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.metrics-numbers-row',
          start: 'top 85%',
        },
      });

      const targets = [
        { ref: num1Ref, end: 52, suffix: '+' },
        { ref: num2Ref, end: 78, suffix: '+' },
        { ref: num3Ref, end: 94, suffix: '%' },
      ];

      targets.forEach((t) => {
        const obj = { val: 0 };
        counterTl.to(
          obj,
          {
            val: t.end,
            duration: 1.6,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              if (t.ref.current) {
                t.ref.current.innerText = Math.floor(obj.val) + t.suffix;
              }
            },
          },
          0
        );
      });

      // Strategic Consulting Card Reveal
      gsap.fromTo(
        '.consulting-spread',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.consulting-spread',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="wrap">
        {/* Section Head matching reference */}
        <div className="section-head">
          <div>
            <span className="eyebrow" data-reveal>Company Positioning</span>
            <h2 className="t1">Research that moves beyond the obvious.</h2>
          </div>
          <p className="lead">
            We apply meticulous investigative standards to illuminate nuances standard research misses. Every engagement is rooted in methodological rigor, strategic foresight, and actionable empirical evidence.
          </p>
        </div>

        {/* Oversized Numerical Impact Metrics */}
        <div 
          className="metrics-numbers-row" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(20px, 3.5vw, 40px)',
            marginBottom: 'clamp(28px, 3.5vw, 44px)',
            paddingBottom: 'clamp(20px, 3vw, 32px)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {/* Metric 01 */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Client Trust
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)' }}>
                <Award style={{ width: '16px', height: '16px' }} />
              </div>
            </div>
            <div 
              ref={num1Ref}
              style={{ fontFamily: 'var(--font-head)', fontWeight: '800', fontSize: 'clamp(3rem, 5vw, 4.4rem)', color: 'var(--navy)', lineHeight: '1', letterSpacing: '-0.03em', marginBottom: '10px' }}
            >
              52+
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '6px' }}>
              Happy Clients
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.5' }}>
              Multinational corporations, regional leaders, and emerging enterprises trust our advisory across global territories.
            </p>
          </div>

          {/* Metric 02 */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Track Record
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)' }}>
                <BarChart2 style={{ width: '16px', height: '16px' }} />
              </div>
            </div>
            <div 
              ref={num2Ref}
              style={{ fontFamily: 'var(--font-head)', fontWeight: '800', fontSize: 'clamp(3rem, 5vw, 4.4rem)', color: 'var(--navy)', lineHeight: '1', letterSpacing: '-0.03em', marginBottom: '10px' }}
            >
              78+
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '6px' }}>
              Projects Completed
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.5' }}>
              Exhaustive qualitative, quantitative, and multi-country research programs delivered on schedule with audit-grade data.
            </p>
          </div>

          {/* Metric 03 */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Excellence Standard
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)' }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
              </div>
            </div>
            <div 
              ref={num3Ref}
              style={{ fontFamily: 'var(--font-head)', fontWeight: '800', fontSize: 'clamp(3rem, 5vw, 4.4rem)', color: 'var(--navy)', lineHeight: '1', letterSpacing: '-0.03em', marginBottom: '10px' }}
            >
              94%
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '6px' }}>
              Research Excellence &amp; Retention
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.5' }}>
              Consistently high satisfaction and repeat engagements powered by decisive, board-level strategic insight.
            </p>
          </div>
        </div>

        {/* Strategic Consulting Feature Spread */}
        <div 
          className="consulting-spread"
          style={{
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'var(--navy)',
            color: '#FFFFFF',
            boxShadow: '0 30px 60px -30px rgba(2,19,38,0.3)',
            border: '1px solid var(--line)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {/* Text Content */}
          <div style={{ padding: 'clamp(28px, 4.5vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--cyan)', marginBottom: '16px' }}>
              Strategic Advisory
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)', lineHeight: '1.15', marginBottom: '16px' }}>
              Consulting grounded in empirical certainty.
            </h3>
            <p style={{ color: 'var(--on-dark)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '28px', maxWidth: '48ch' }}>
              Our multidisciplinary analysts work in direct collaboration with executive leadership teams. We demystify unpredictable consumer patterns and market shifts to design resilient expansion models.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#FFFFFF' }}>
                <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--cyan)', flexShrink: 0 }} />
                <span>Custom tailored scope</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#FFFFFF' }}>
                <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--cyan)', flexShrink: 0 }} />
                <span>Executive briefing deck</span>
              </div>
            </div>
          </div>

          {/* Photographic Image with Hover Scale */}
          <div style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
            <img
              src="./assets/img/about-consulting-meeting.jpg"
              alt="Strategic Consulting Team in Collaboration"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(.22,1,.36,1)' }}
              onError={(e) => {
                e.currentTarget.src = './assests/about-consulting-meeting.jpg';
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

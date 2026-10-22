import React, { useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';
import { CheckCircle2, ShieldCheck, Globe, Zap, Users2, ArrowRight } from 'lucide-react';
import { handleCardMouseEnter, handleCardMouseMove, handleCardMouseLeave } from '../utils/cardHover';

export default function AboutPage() {
  const { navigate } = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = 'About Us — Zivaro Global Research';

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Mission section reveal
      gsap.fromTo(
        '.about-mission-copy > *',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-mission-copy',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-mission-img',
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-mission-img',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Value pillars staggered reveal
      const pillars = gsap.utils.toArray('.pillar-card');
      gsap.fromTo(
        pillars,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Dynamic Performance Indicator progress bars
      gsap.fromTo(
        '.indicator-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.indicators-box',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-about">
      <PageHeader
        eyebrow="Company Overview"
        title="About Zivaro Global Research"
        lead="Empowering global enterprises with quality-driven, data-backed intelligence and boundary-free strategic advisory."
        breadcrumb="About Us"
      />

      {/* Mission & Story Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: 'clamp(32px, 5vw, 64px)', 
              alignItems: 'center' 
            }}
          >
            <div className="about-mission-copy">
              <span className="eyebrow">Our Mission</span>
              <h2 className="t1" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '24px' }}>
                Transforming Market Research Through Intelligence &amp; Innovation
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                At <strong style={{ color: 'var(--navy)' }}>Zivaro Global Research Pvt Ltd</strong>, we are redefining how insights drive sustainable organizational growth. Established in Chennai, our mission is to empower enterprises with quality-driven, data-backed intelligence that fuels high-impact business decisions.
              </p>
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                We believe that market research should go far beyond standard numbers and tables — it should reveal latent opportunities, decode shifting human behavior, and inspire strategic innovation.
              </p>
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '32px' }}>
                Our team brings together seasoned analytical talent, proprietary research frameworks, and deep sector specializations across global business landscapes.
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--cyan-700)', flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ fontSize: '0.96rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--navy)' }}>B2B Market Intelligence:</strong> High-level industry intelligence for strategic execution.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--cyan-700)', flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ fontSize: '0.96rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--navy)' }}>Consumer &amp; B2C Dynamics:</strong> Deep behavioral sentiment, pain points, and preference tracking.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: 'var(--cyan-700)', flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ fontSize: '0.96rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--navy)' }}>Healthcare &amp; Life Sciences:</strong> Highly ethical and compliant studies across pharma and biotech.
                  </div>
                </div>
              </div>
            </div>

            <div className="about-mission-img">
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  padding: '16px', 
                  borderRadius: '24px', 
                  border: '1px solid var(--line)', 
                  boxShadow: 'var(--shadow)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src="/assets/img/about-consulting-meeting.jpg" 
                  alt="Research Analytics Team" 
                  style={{ borderRadius: '16px', width: '100%', height: 'auto', display: 'block' }}
                  onError={(e) => {
                    e.currentTarget.src = '/assests/about-consulting-meeting.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose Zivaro / Value Pillars */}
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Value Pillars</span>
              <h2 className="t1">Why Organizations Choose Zivaro</h2>
            </div>
            <p className="lead">
              Discover the foundational principles that set us apart as a dependable strategic research partner.
            </p>
          </div>

          <div 
            className="pillars-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '24px',
              marginTop: '36px' 
            }}
          >
            <div 
              className="pillar-card card-glow"
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                background: '#FFFFFF', 
                padding: '32px 28px', 
                borderRadius: '20px', 
                border: '1px solid var(--line)', 
                boxShadow: '0 12px 28px -12px rgba(7, 27, 51, 0.08)',
                transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
              }}
            >
              <div 
                className="pillar-icon"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'var(--tint)', 
                  display: 'grid', 
                  placeItems: 'center', 
                  color: 'var(--cyan-700)',
                  marginBottom: '20px',
                  transformOrigin: 'center center',
                }}
              >
                <ShieldCheck style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '12px' }}>
                Quality-Driven Insights
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Every finding is multi-stage validated, verified, and actionable to ensure outcomes drive tangible ROI.
              </p>
            </div>

            <div 
              className="pillar-card card-glow"
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                background: '#FFFFFF', 
                padding: '32px 28px', 
                borderRadius: '20px', 
                border: '1px solid var(--line)',
                boxShadow: '0 12px 28px -12px rgba(7, 27, 51, 0.08)',
                transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
              }}
            >
              <div 
                className="pillar-icon"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'var(--tint)', 
                  display: 'grid', 
                  placeItems: 'center', 
                  color: 'var(--cyan-700)',
                  marginBottom: '20px',
                  transformOrigin: 'center center',
                }}
              >
                <Globe style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '12px' }}>
                Boundary-Free Thinking
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We bring a global mindset to local challenges, offering fresh perspectives that transcend legacy boundaries.
              </p>
            </div>

            <div 
              className="pillar-card card-glow"
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                background: '#FFFFFF', 
                padding: '32px 28px', 
                borderRadius: '20px', 
                border: '1px solid var(--line)',
                boxShadow: '0 12px 28px -12px rgba(7, 27, 51, 0.08)',
                transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
              }}
            >
              <div 
                className="pillar-icon"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'var(--tint)', 
                  display: 'grid', 
                  placeItems: 'center', 
                  color: 'var(--cyan-700)',
                  marginBottom: '20px',
                  transformOrigin: 'center center',
                }}
              >
                <Zap style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '12px' }}>
                Technology-Enabled
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                From AI-assisted semantic data cleaning to real-time mobile respondent collection for superior agility.
              </p>
            </div>

            <div 
              className="pillar-card card-glow"
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                background: '#FFFFFF', 
                padding: '32px 28px', 
                borderRadius: '20px', 
                border: '1px solid var(--line)',
                boxShadow: '0 12px 28px -12px rgba(7, 27, 51, 0.08)',
                transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
              }}
            >
              <div 
                className="pillar-icon"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'var(--tint)', 
                  display: 'grid', 
                  placeItems: 'center', 
                  color: 'var(--cyan-700)',
                  marginBottom: '20px',
                  transformOrigin: 'center center',
                }}
              >
                <Users2 style={{ width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '12px' }}>
                Long-Term Partnerships
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We collaborate side-by-side with your leadership team, building strategic relationships well past project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Indicators Banner */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div 
            className="indicators-box"
            style={{ 
              background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%)', 
              borderRadius: '24px', 
              padding: 'clamp(36px, 5vw, 64px)', 
              color: '#FFFFFF',
              boxShadow: '0 24px 48px -16px rgba(7, 27, 51, 0.35)',
            }}
          >
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: 'clamp(32px, 5vw, 56px)', 
                alignItems: 'center' 
              }}
            >
              <div>
                <span 
                  className="eyebrow" 
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--cyan)' }}
                >
                  Measurable Impact
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#FFFFFF', marginBottom: '16px' }}>
                  Our Performance Indicators
                </h2>
                <p style={{ color: 'var(--on-dark)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px', maxWidth: '44ch' }}>
                  Our commitment to research excellence is reflected in rigorous analytical governance and long-term client retention.
                </p>
                <button
                  type="button"
                  className="btn btn-cyan btn-sm"
                  onClick={() => navigate('/contact')}
                >
                  <span>Connect With An Analyst</span>
                  <span className="arr">
                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </span>
                </button>
              </div>

              <div style={{ display: 'grid', gap: '22px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span>Research Excellence</span>
                    <span style={{ color: 'var(--cyan)' }}>94%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div className="indicator-bar-fill" style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, var(--cyan-700), var(--cyan))', borderRadius: '999px', transformOrigin: 'left' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span>Strategic Focus</span>
                    <span style={{ color: 'var(--cyan)' }}>90%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div className="indicator-bar-fill" style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, var(--cyan-700), var(--cyan))', borderRadius: '999px', transformOrigin: 'left' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span>Client-First Approach</span>
                    <span style={{ color: 'var(--cyan)' }}>100%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div className="indicator-bar-fill" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--cyan-700), var(--cyan))', borderRadius: '999px', transformOrigin: 'left' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span>Sector-Specific Expertise</span>
                    <span style={{ color: 'var(--cyan)' }}>92%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div className="indicator-bar-fill" style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, var(--cyan-700), var(--cyan))', borderRadius: '999px', transformOrigin: 'left' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

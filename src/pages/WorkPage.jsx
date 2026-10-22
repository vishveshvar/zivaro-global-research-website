import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';
import { ArrowRight, X, Clock, Calendar, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { handleCardMouseEnter, handleCardMouseMove, handleCardMouseLeave } from '../utils/cardHover';

export default function WorkPage() {
  const { navigate } = useRouter();
  const [selectedCase, setSelectedCase] = useState(null);
  const pageRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    document.title = 'Selected Work & Strategic Insights — Zivaro Global Research';

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for case study cards
      const cards = gsap.utils.toArray('.work-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // CTA Banner reveal
      gsap.fromTo(
        '.work-cta-banner',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-cta-banner',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Modal entrance animation
  useEffect(() => {
    if (!selectedCase || !modalRef.current || isReducedMotion()) return;
    const modalBox = modalRef.current.querySelector('.work-modal-box');
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    );
    if (modalBox) {
      gsap.fromTo(
        modalBox,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }
  }, [selectedCase]);

  const cases = [
    {
      id: 1,
      k: 'Healthcare & Life Sciences',
      title: 'Digital Health & Healthcare Delivery',
      summary: 'Evaluating systemic shifts in remote diagnostics, decentralized patient monitoring, and regulatory compliance hurdles facing institutional healthcare providers.',
      image: '/assets/img/insight-digital-health.jpg',
      fallbackImage: '/assests/insight-digital-health.jpg',
      num1: '68%',
      lbl1: 'Hospital networks reporting data silos',
      num2: '34%',
      lbl2: 'Faster trial recruitment cycles',
      date: 'Quarterly Perspective',
      readTime: '6 min read',
      fullContent: `Healthcare ecosystems worldwide are navigating unprecedented transformations. The convergence of clinical data architectures, AI-guided diagnostic pathways, and patient-centric monitoring has created new commercial frontiers for pharmaceutical manufacturers and healthcare systems.

Our field research across European and Asian metropolitan providers underscores three core strategic priorities:
1. Interoperability & Legacy Migration: Over 68% of enterprise hospital networks report data silos as the primary bottleneck to effective automated decision-support rollouts.
2. Value-Based Care Metrics: Reimbursement models are rapidly transitioning towards verifiable patient outcome indices rather than volume of procedures.
3. Decentralized Clinical Trials: Hybrid trial methodologies continue to slash recruitment cycles by up to 34%, while demanding unprecedented data integrity standards.`,
    },
    {
      id: 2,
      k: 'Global Trade & Operations',
      title: 'Global Supply Chain Evolution',
      summary: 'Mapping structural realignments, nearshoring dynamics, and inventory buffer strategies across key industrial freight and manufacturing corridors.',
      image: '/assets/img/insight-supply-chain.jpg',
      fallbackImage: '/assests/insight-supply-chain.jpg',
      num1: '+18d',
      lbl1: 'Expanded safety stock buffer',
      num2: '5 Hubs',
      lbl2: 'Nearshoring production corridors',
      date: 'Strategic Intelligence',
      readTime: '8 min read',
      fullContent: `The era of pure just-in-time logistics has given way to intentional resilience and multi-node redundancy. Corporate procurement officers face persistent geopolitical volatility, energy price fluctuations, and evolving customs tariffs.

Key empirical findings from our cross-border logistics study:
1. Nearshoring Feasibility: Regional production hubs in Southeast Asia and Central Europe are absorbing significant capital expenditure previously centralized in monolithic single-source facilities.
2. Buffer Capitalization: Tier-1 manufacturers have expanded safety stock provisions by an average of 18 days, accepting slight balance sheet drag to safeguard production continuity.
3. Predictive Fleet Telematics: Real-time maritime and overland tracking has shifted from a convenience to a mission-critical risk mitigation requirement for enterprise freight planners.`,
    },
    {
      id: 3,
      k: 'Consumer Analytics',
      title: 'Modern Consumer Behavior Paradigms',
      summary: 'Decoding changing discretionary expenditure patterns, omnichannel brand discovery friction, and generational loyalty fragmentation.',
      image: '/assets/img/insight-consumer-behavior.jpg',
      fallbackImage: '/assests/insight-consumer-behavior.jpg',
      num1: '42%',
      lbl1: 'In-store digital price checks',
      num2: '3x',
      lbl2: 'Volatility in brand affinity metrics',
      date: 'Behavioral Study',
      readTime: '5 min read',
      fullContent: `Modern consumer loyalty is increasingly volatile. The rapid maturation of social commerce, algorithmic curation, and hyper-personalized recommendations has truncated consumer consideration cycles.

Our multi-market consumer sentiment tracker reveals:
1. Value Verification vs. Brand Affinity: Modern shoppers conduct rapid price and sentiment checks on mobile devices inside physical retail stores before finalizing 42% of high-ticket purchases.
2. Experience Over Accumulation: Discretionary spend continues to skew decisively towards wellness, experiential hospitality, and sustainable consumables.
3. The Privacy-Personalization Paradox: Consumers actively demand contextual, personalized engagement while simultaneously displaying heightened sensitivity toward covert behavioral tracking.`,
    },
    {
      id: 4,
      k: 'Energy & Utilities',
      title: 'Energy Transition & Clean Infrastructure',
      summary: 'Analyzing enterprise capital allocation towards renewable microgrids, utility compliance mandates, and distributed energy resource adoption.',
      image: './assests/Energy-Utilities.jpg',
      num1: '2.4x',
      lbl1: 'Growth in grid-edge capital',
      num2: '85%',
      lbl2: 'Corporate ESG procurement targets',
      date: 'Executive Briefing',
      readTime: '7 min read',
      fullContent: `Decarbonization imperatives and electrification requirements have compelled global utilities and corporate energy buyers to re-engineer procurement models. The transition requires navigating complex subsidy regimes, interconnection bottlenecks, and localized tariff structures.

Strategic insights from our industrial energy practice:
1. Microgrid Resilience: Mission-critical facilities in data centers, logistics hubs, and manufacturing campuses are accelerating behind-the-meter generation investments to mitigate utility brownout risks.
2. Renewable PPA Sophistication: Corporate power purchase agreements (PPAs) now routinely integrate 24/7 carbon-free hourly matching mechanisms.
3. Battery Storage Economics: Fast-declining lithium-iron-phosphate (LFP) battery costs are driving widespread grid-scale arbitrage deployment across emerging Asian and Middle Eastern corridors.`,
    },
    {
      id: 5,
      k: 'Banking & Financial Services',
      title: 'Fintech Disruptions & Digital Banking Trust',
      summary: 'Examining consumer adoption curves for cross-border remittances, digital wallet security expectations, and institutional wealthtech integration.',
      image: './assests/Banking-Finance.jpeg',
      num1: '73%',
      lbl1: 'Mobile-first transaction preferences',
      num2: '4.8★',
      lbl2: 'Trust benchmark in verified security',
      date: 'Market Forecast',
      readTime: '6 min read',
      fullContent: `Digital banking platforms have transitioned from peripheral convenience channels into primary customer touchpoints. However, customer acquisition costs remain elevated, while regulatory compliance standards continue to tighten across jurisdictions.

Our banking practice highlights three essential imperatives:
1. Security as Brand Equity: Biometric authentication, zero-knowledge encryption, and instant fraud notifications serve as the primary drivers of consumer trust.
2. Frictionless Cross-Border Remittances: Digital corridor penetration in Southeast Asia, GCC, and Latin America continues to compress traditional remittance margins.
3. Embedded Finance: Non-banking consumer platforms are successfully embedding point-of-sale financing and micro-insurance products directly within checkout workflows.`,
    },
  ];

  return (
    <div ref={pageRef} className="page-work">
      <PageHeader
        eyebrow="Case Studies &amp; Research Briefings"
        title="Selected Work &amp; Strategic Insights"
        lead="Explore our proprietary market briefings, empirical sector studies, and actionable case summaries developed for enterprise decision-makers."
        breadcrumb="Work"
      />

      {/* Case Studies Grid */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Empirical Perspectives</span>
              <h2 className="t1">Evidence-Based Research Across High-Impact Domains</h2>
            </div>
            <p className="lead">
              Each research briefing represents synthesized primary data, econometric modeling, and executive-level strategic implications.
            </p>
          </div>

          <div 
            className="work-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
              gap: '32px',
              marginTop: '40px' 
            }}
          >
            {cases.map((cs) => (
              <article 
                key={cs.id}
                className="work-card card-glow"
                onMouseEnter={handleCardMouseEnter}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px -12px rgba(7, 27, 51, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img 
                      className="work-card-img"
                      src={cs.image} 
                      alt={cs.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: 'center center' }}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(7, 27, 51, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--cyan)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '8px',
                      }}
                    >
                      {cs.k}
                    </div>
                  </div>

                  <div style={{ padding: '28px 24px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar style={{ width: '14px', height: '14px' }} />
                        <span>{cs.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock style={{ width: '14px', height: '14px' }} />
                        <span>{cs.readTime}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.25 }}>
                      {cs.title}
                    </h3>

                    <p style={{ color: 'var(--text)', fontSize: '0.96rem', lineHeight: '1.65', marginBottom: '24px' }}>
                      {cs.summary}
                    </p>

                    <div 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '12px', 
                        padding: '16px', 
                        background: 'var(--soft)', 
                        borderRadius: '16px',
                        border: '1px solid var(--line)',
                        marginBottom: '20px' 
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-head)' }}>
                          {cs.num1}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: '1.3' }}>
                          {cs.lbl1}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-head)' }}>
                          {cs.num2}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: '1.3' }}>
                          {cs.lbl2}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedCase(cs)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Read Executive Summary</span>
                    <span className="arr">
                      <ChevronRight style={{ width: '16px', height: '16px' }} />
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section section-soft">
        <div className="wrap">
          <div 
            className="work-cta-banner"
            style={{ 
              background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%)', 
              borderRadius: '24px', 
              padding: 'clamp(36px, 5vw, 64px)', 
              color: '#FFFFFF',
              boxShadow: '0 24px 48px -16px rgba(7, 27, 51, 0.35)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span 
              className="eyebrow" 
              style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--cyan)', marginBottom: '16px' }}
            >
              Custom Intelligence Studies
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', maxWidth: '24ch' }}>
              Commission a Custom Case Study or Sector Briefing
            </h2>
            <p style={{ color: 'var(--on-dark)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '54ch' }}>
              We partner directly with corporate strategy directors, product managers, and investment teams to produce bespoke intelligence.
            </p>
            <button
              type="button"
              className="btn btn-cyan"
              onClick={() => navigate('/contact')}
            >
              <span>Request Custom Research Proposal</span>
              <span className="arr">
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal for Reading Full Insight Brief */}
      {selectedCase && (
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(2, 19, 38, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedCase(null)}
        >
          <div 
            className="work-modal-box"
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 30px 60px -20px rgba(2, 19, 38, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--soft)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--navy)',
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>

            <span className="eyebrow" style={{ marginBottom: '12px' }}>
              {selectedCase.k}
            </span>

            <h3 style={{ fontSize: '1.75rem', color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.25 }}>
              {selectedCase.title}
            </h3>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
              <span>{selectedCase.date}</span>
              <span>•</span>
              <span>{selectedCase.readTime}</span>
            </div>

            <div style={{ fontSize: '0.98rem', color: 'var(--text)', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '28px' }}>
              {selectedCase.fullContent}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedCase(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedCase(null);
                  navigate('/contact');
                }}
              >
                <span>Discuss This Research</span>
                <span className="arr">
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

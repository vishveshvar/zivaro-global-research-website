import React, { useEffect, useRef } from 'react';
import { useRouter } from '../utils/router';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';
import { 
  Compass, 
  BarChart3, 
  Smile, 
  Layers, 
  ShieldAlert, 
  DollarSign, 
  PieChart, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { handleCardMouseEnter, handleCardMouseMove, handleCardMouseLeave } from '../utils/cardHover';

export default function ServicesPage() {
  const { navigate } = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = 'Our Research Services — Zivaro Global Research';

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Coordinated entrance for top section heading
      gsap.fromTo(
        '.section-head > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
      );

      // Progressive ScrollTrigger reveals for service cards
      const cards = gsap.utils.toArray('.service-card-item');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      // CTA Banner ScrollTrigger reveal
      gsap.fromTo(
        '.custom-scope-cta',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.custom-scope-cta',
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      num: '01',
      title: 'Market Entry Studies',
      desc: 'Assess new markets, understand local regulations, and identify growth opportunities before entering a new region.',
      icon: Compass,
      points: [
        'Market sizing and growth forecasts',
        'Regulatory and compliance mapping',
        'Distribution channel viability',
      ],
    },
    {
      num: '02',
      title: 'Brand Awareness & Perception Analysis',
      desc: 'Discover how customers see your brand and how it compares with competitors.',
      icon: BarChart3,
      points: [
        'Brand recall and recognition tracking',
        'Customer sentiment and perception',
        'Competitive share of voice',
      ],
    },
    {
      num: '03',
      title: 'Consumer & Customer Satisfaction Surveys',
      desc: 'Understand customer experiences, identify pain points, and find ways to improve satisfaction and retention.',
      icon: Smile,
      points: [
        'CSAT and NPS measurement',
        'Customer churn analysis',
        'Journey and touchpoint improvement',
      ],
    },
    {
      num: '04',
      title: 'Product Concept & Usage Testing',
      desc: 'Test product ideas, prototypes, and packaging with real users before launch to improve product-market fit.',
      icon: Layers,
      points: [
        'In-home and usability testing',
        'Feature prioritization',
        'Packaging and design evaluation',
      ],
    },
    {
      num: '05',
      title: 'Competitive Intelligence Research',
      desc: 'Track competitor strategies, market share, and positioning to spot risks and stay ahead.',
      icon: ShieldAlert,
      points: [
        'Competitor benchmarking',
        'Go-to-market strategy reviews',
        'Threat and vulnerability assessment',
      ],
    },
    {
      num: '06',
      title: 'Pricing & Positioning Analysis',
      desc: 'Find the optimal price point for your products and services while protecting profitability and customer demand.',
      icon: DollarSign,
      points: [
        'Price sensitivity measurement',
        'Elasticity and margin modeling',
        'Tiered pricing and bundle optimization',
      ],
    },
    {
      num: '07',
      title: 'Data Analytics & Reporting',
      desc: 'Turn complex research and operational data into clear dashboards and actionable executive reports.',
      icon: PieChart,
      points: [
        'Statistical data synthesis',
        'Custom dashboards and visualization',
        'Predictive scenario models',
      ],
    },
    {
      num: '08',
      title: 'Tracking & Panel Research',
      desc: 'Monitor changes in consumer attitudes and market trends over time through verified respondent panels.',
      icon: Users,
      points: [
        'Verified respondent panels',
        'Ongoing sentiment and trend tracking',
        'Custom community research studies',
      ],
    },
  ];

  return (
    <div ref={pageRef} className="page-services">
      {/* Services Grid Section */}
      <section className="section" style={{ background: '#FFFFFF', paddingTop: 'calc(var(--head) + 48px)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Full-Spectrum Capabilities</span>
              <h1 className="t1">Engineered for Strategic Clarity</h1>
            </div>
            <p className="lead">
              Every research program is bespoke, rigorous, and guided by experienced senior directors committed to actionable business outcomes.
            </p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
              gap: '32px',
              marginTop: '40px' 
            }}
          >
            {services.map((item) => {
              const IconComp = item.icon;
              return (
                <article 
                  key={item.num}
                  className="service-card-item card-glow"
                  onMouseEnter={handleCardMouseEnter}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1px solid var(--line)',
                    padding: 'clamp(28px, 4vw, 36px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 12px 30px -12px rgba(7, 27, 51, 0.08)',
                    transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <div 
                        className="service-icon-wrap"
                        style={{ 
                          width: '54px', 
                          height: '54px', 
                          borderRadius: '16px', 
                          background: 'var(--tint)', 
                          display: 'grid', 
                          placeItems: 'center', 
                          color: 'var(--cyan-700)',
                          transformOrigin: 'center center',
                        }}
                      >
                        <IconComp style={{ width: '26px', height: '26px' }} />
                      </div>
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-head)', 
                          fontSize: '0.86rem', 
                          fontWeight: 700, 
                          color: 'var(--muted)',
                          letterSpacing: '0.05em' 
                        }}
                      >
                        {item.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '14px', lineHeight: 1.25 }}>
                      {item.title}
                    </h3>

                    <p style={{ color: 'var(--text)', fontSize: '0.98rem', lineHeight: '1.68', marginBottom: '24px' }}>
                      {item.desc}
                    </p>

                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginBottom: '28px' }}>
                      <ul style={{ display: 'grid', gap: '10px' }}>
                        {item.points.map((pt, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text)' }}>
                            <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--cyan-700)', flexShrink: 0 }} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigate('/contact')}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Inquire About This Service</span>
                      <span className="arr">
                        <ArrowRight style={{ width: '14px', height: '14px' }} />
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Scope CTA Banner */}
      <section className="section section-soft">
        <div className="wrap">
          <div 
            className="custom-scope-cta"
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
              Bespoke Research Design
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', maxWidth: '24ch' }}>
              Have a Custom Research Scope?
            </h2>
            <p style={{ color: 'var(--on-dark)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '54ch' }}>
              Our research consultants will design a bespoke methodology tailored precisely to your timeline, market parameters, and budget.
            </p>
            <button
              type="button"
              className="btn btn-cyan"
              onClick={() => navigate('/enquire')}
            >
              <span>Submit Research Requirements</span>
              <span className="arr">
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

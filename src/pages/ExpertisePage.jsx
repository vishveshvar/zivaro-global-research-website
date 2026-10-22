import React, { useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';
import { ArrowRight } from 'lucide-react';
import { handleCardMouseEnter, handleCardMouseMove, handleCardMouseLeave } from '../utils/cardHover';

export default function ExpertisePage() {
  const { navigate } = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = 'Industries We Serve — Zivaro Global Research';

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Coordinated entrance for section head
      gsap.fromTo(
        '.section-head > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
      );

      // Progressive ScrollTrigger reveals for industry cards
      const cards = gsap.utils.toArray('.industry-card-item');
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

      // CTA Banner reveal
      gsap.fromTo(
        '.expertise-cta',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.expertise-cta',
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const industries = [
    {
      num: '01',
      title: 'Banking & Finance',
      desc: 'Navigating evolving regulatory compliance, digital banking adoption, fintech disruptions, wealth management preferences, and risk modeling.',
      image: '/assets/img/Banking-Finance.jpeg',
      fallbackImage: '/assests/Banking-Finance.jpeg',
    },
    {
      num: '02',
      title: 'FMCG & Retail',
      desc: 'Decoding high-velocity shopper behavior, optimizing omnichannel shelves, brand perception, private-label competition, and packaging effectiveness.',
      image: '/assets/img/FMCG-Retail.jpg',
      fallbackImage: '/assests/FMCG-Retail.jpg',
    },
    {
      num: '03',
      title: 'Technology & Telecom',
      desc: 'Empowering enterprise SaaS, cloud infrastructure, AI adoption, 5G monetization, and developer ecosystem loyalty benchmarking.',
      image: '/assets/img/Technology-Telecommunications.jpeg',
      fallbackImage: '/assests/Technology-Telecommunications.jpeg',
    },
    {
      num: '04',
      title: 'Healthcare & Pharmaceuticals',
      desc: 'Rigorous, ethical studies across clinical specialists, Key Opinion Leaders (KOLs), patient journeys, and medical device usability.',
      image: '/assets/img/clinical research laboratory.jpg',
      fallbackImage: '/assests/clinical research laboratory.jpg',
    },
    {
      num: '05',
      title: 'Automobiles',
      desc: 'Shaping future mobility: electric vehicle (EV) charging infrastructure sentiment, connected vehicle interfaces, and autonomous tech adoption.',
      image: '/assets/img/Automobiles.jpeg',
      fallbackImage: '/assests/Automobiles.jpeg',
    },
    {
      num: '06',
      title: 'Education & E-Learning',
      desc: 'Analyzing hybrid student engagement, credentialing value, edtech platform retention, and corporate upskilling market dynamics.',
      image: '/assets/img/Education-E-Learning.jpg',
      fallbackImage: '/assests/Education-E-Learning.jpg',
    },
    {
      num: '07',
      title: 'Media & Entertainment',
      desc: 'Measuring streaming audience retention, content consumption habits, ad receptivity, and evolving gaming monetization strategies.',
      image: '/assets/img/Media-Entertainment.jpg',
      fallbackImage: '/assests/Media-Entertainment.jpg',
    },
    {
      num: '08',
      title: 'Energy & Utilities',
      desc: 'Informing the clean energy transition: renewable infrastructure attitudes, smart grid sentiment, and utility enterprise procurement trends.',
      image: '/assets/img/Energy-Utilities.jpg',
      fallbackImage: '/assests/Energy-Utilities.jpg',
    },
    {
      num: '09',
      title: 'Travel & Hospitality',
      desc: 'Unpacking post-pandemic guest expectations, loyalty program velocity, corporate travel budgeting, and destination marketing.',
      image: '/assets/img/Travel-Hospitality.jpeg',
      fallbackImage: '/assests/Travel-Hospitality.jpeg',
    },
    {
      num: '10',
      title: 'Cosmetics & Luxury Goods',
      desc: 'Understanding premium buyer psychology, clean beauty ingredient sentiment, prestige brand positioning, and cross-border luxury purchasing.',
      image: '/assets/img/Cosmetics-Luxury-Goods.jpg',
      fallbackImage: '/assests/Cosmetics-Luxury-Goods.jpg',
    },
    {
      num: '11',
      title: 'B2B Market Intelligence',
      desc: 'High-stake organizational procurement dynamics, enterprise buying centers, distributor ecosystems, and competitive supply networks.',
      image: '/assets/img/B2B-Market-Intelligence.jpg',
      fallbackImage: '/assests/B2B-Market-Intelligence.jpg',
    },
  ];

  return (
    <div ref={pageRef} className="page-expertise">
      <PageHeader
        eyebrow="Sectors &amp; Domains"
        title="Industries We Serve"
        lead="At Zivaro, we serve a broad spectrum of industries — each with distinct regulatory environments, consumer buying journeys, and innovation lifecycles."
        breadcrumb="Expertise"
      />

      {/* Industries Grid Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Sector Intelligence</span>
              <h2 className="t1">Deep Expertise Across Diverse Verticals</h2>
            </div>
            <p className="lead">
              Our multidisciplinary teams combine domain fluency, regulatory compliance protocols, and primary executive access within each vertical.
            </p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '30px',
              marginTop: '40px' 
            }}
          >
            {industries.map((ind) => (
              <article 
                key={ind.num}
                className="industry-card-item card-glow"
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
                  transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
                }}
              >
                <div 
                  style={{ 
                    position: 'relative', 
                    height: '210px', 
                    overflow: 'hidden',
                    background: 'var(--soft)',
                  }}
                >
                  <img 
                    className="industry-card-img"
                    src={ind.image} 
                    alt={`${ind.title} Market Research`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      display: 'block',
                      transformOrigin: 'center center',
                    }}
                    onError={(e) => {
                      if (ind.fallbackImage) {
                        e.currentTarget.src = ind.fallbackImage;
                      }
                    }}
                  />
                </div>

                <div 
                  style={{ 
                    padding: '28px 24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--navy)', marginBottom: '12px' }}>
                      {ind.title}
                    </h3>
                    <p style={{ color: 'var(--text)', fontSize: '0.96rem', lineHeight: '1.65', marginBottom: '20px' }}>
                      {ind.desc}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigate('/contact')}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Explore Practice Capabilities</span>
                      <span className="arr">
                        <ArrowRight style={{ width: '14px', height: '14px' }} />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="section section-soft">
        <div className="wrap">
          <div 
            className="expertise-cta"
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
              Industry Practice Groups
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', maxWidth: '24ch' }}>
              Partner With Dedicated Domain Specialists
            </h2>
            <p style={{ color: 'var(--on-dark)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '54ch' }}>
              Our sector-specific research teams bring firsthand operational understanding of your marketplace. Let's discuss your next study.
            </p>
            <button
              type="button"
              className="btn btn-cyan"
              onClick={() => navigate('/enquire')}
            >
              <span>Initiate a Strategic Dialogue</span>
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

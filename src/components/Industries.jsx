import React, { useState, useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../utils/gsap';

export default function Industries() {
  const [activePanel, setActivePanel] = useState(0);
  const marqueeRef = useRef(null);

  const practicePanels = [
    {
      num: '01',
      k: 'Life Sciences',
      title: 'Healthcare & Pharmaceuticals',
      headline: 'Across the Clinical & Care Pathway',
      description: 'Navigating clinical innovation, patient journey dynamics, healthcare regulatory pathways, and payer reimbursement environments.',
      image: './assests/clinical research laboratory.jpg',
      points: [
        'HCP panels & specialist physician recruitment',
        'Pharma, biotech and medical device commercialization',
        'Patient journey modeling & digital health integration',
      ],
    },
    {
      num: '02',
      k: 'Consumer Goods',
      title: 'FMCG & Retail',
      headline: 'Decoding the Omnichannel Buyer',
      description: 'Rapidly shifting point-of-sale paradigms, omnichannel consumer habits, category management, and private label penetration.',
      image: './assests/FMCG-Retail.jpg',
      points: [
        'Brand, advertising and concept testing',
        'Customer experience, loyalty and basket analytics',
        'E-commerce penetration and lifestyle shift trackers',
      ],
    },
    {
      num: '03',
      k: 'Enterprise & Trade',
      title: 'B2B Market Intelligence',
      headline: 'High-Stake Decision Makers, Reached',
      description: 'High-stake organizational procurement dynamics, enterprise buying centers, distributor ecosystems, and competitive supply networks.',
      image: './assests/B2B-Market-Intelligence.jpg',
      points: [
        'C-suite, functional heads and procurement directors',
        'Distributor and channel partner benchmarking',
        'Supply chain resilience and vulnerability mapping',
      ],
    },
    {
      num: '04',
      k: 'Fintech & BFSI',
      title: 'Banking & Financial Services',
      headline: 'Capital Dynamics & Digital Trust',
      description: 'Institutional fintech disruptions, retail banking evolution, wealth management behavioral trends, and cross-border payment flows.',
      image: './assests/Banking-Finance.jpeg',
      points: [
        'Retail banking NPS and churn predictors',
        'Cross-border payments and remittance behavior',
        'Wealth management and institutional asset allocation',
      ],
    },
    {
      num: '05',
      k: 'High-Tech',
      title: 'Technology & Telecommunications',
      headline: 'Cloud, Infrastructure & AI Adoption',
      description: 'Next-generation cloud infrastructure, enterprise SaaS adoption cycles, 5G monetization, and AI integration roadmaps.',
      image: './assests/Technology-Telecommunications.jpeg',
      points: [
        'Enterprise software evaluation and buying cycles',
        'Telecom infrastructure and 5G enterprise use cases',
        'Generative AI and automated workflow readiness',
      ],
    },
  ];

  const all11Sectors = [
    'Healthcare & Pharmaceuticals',
    'B2B Market Intelligence',
    'FMCG & Retail',
    'Banking & Financial Services',
    'Technology & Telecommunications',
    'Energy & Utilities',
    'Automobiles & Mobility',
    'Cosmetics & Luxury Goods',
    'Education & E-Learning',
    'Travel & Hospitality',
    'Media & Entertainment',
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || isReducedMotion()) return;

    const track = marquee.querySelector('.marquee-track');
    if (!track) return;

    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, duration: 42, ease: 'none', repeat: -1 }
    );

    const handleMouseEnter = () => gsap.to(tween, { timeScale: 0.25, duration: 0.5 });
    const handleMouseLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
      tween.kill();
    };
  }, []);

  return (
    <section className="section section-soft has-marquee" id="expertise">
      <div className="wrap">
        
        {/* Section Header */}
        <div className="section-head">
          <div>
            <span className="eyebrow">Expertise</span>
            <h2 className="t1">Sector-Specific Intelligence & Expertise</h2>
          </div>
          <p className="lead">
            We bring a global mindset to local challenges across key economic sectors. Specialized domain teams share the same quality checks, verified panels, and project directors.
          </p>
        </div>

        {/* Expanding Panels Accordion */}
        <div className="panels">
          {practicePanels.map((panel, idx) => {
            const isOpen = activePanel === idx;

            return (
              <article
                key={panel.num}
                className={`panel ${isOpen ? 'is-open' : ''}`}
                data-cursor="View"
                onClick={() => setActivePanel(idx)}
                onMouseEnter={() => setActivePanel(idx)}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  width="1200"
                  height="800"
                  loading="lazy"
                />

                {/* Collapsed Tab */}
                <span className="panel-tab">
                  <b>{panel.num}</b>
                  <span>{panel.title}</span>
                </span>

                {/* Expanded Body */}
                <div className="panel-body">
                  <p className="k">{panel.k}</p>
                  <h3>{panel.title}</h3>
                  <p>{panel.description}</p>
                  <ul>
                    {panel.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Infinite Horizontal Marquee Ticker covering all 11 sectors */}
      <div ref={marqueeRef} className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {all11Sectors.map((sector, sIdx) => (
            <span key={sIdx}>{sector}</span>
          ))}
          {all11Sectors.map((sector, sIdx) => (
            <span key={`dup-${sIdx}`}>{sector}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

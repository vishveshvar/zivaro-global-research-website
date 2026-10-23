import React from 'react';
import { StickyScroll } from './ui/sticky-scroll-reveal';

const SERVICES_DATA = [
  {
    title: 'Market Entry Studies',
    description: 'Assess new markets, understand local regulations, and identify growth opportunities before entering a new region.',
    image: '/assets/img/Market Entry Studies.jpg',
    alt: 'Market Entry Studies — Assessing new markets, regulations, and growth opportunities',
    background: '#FFFFFF', // Warm white
    panelBg: '#F8FAFC',
    accent: '#65BFFF',
  },
  {
    title: 'Brand Awareness & Perception',
    description: 'Discover how customers see your brand and how it compares with competitors.',
    image: '/assets/img/Brand Awareness.jpg',
    alt: 'Brand Awareness & Perception — Discovering customer brand perception and competitive benchmarks',
    background: '#EAF4FC', // Pale ice blue
    panelBg: '#E1EEF8',
    accent: '#071B33',
  },
  {
    title: 'Consumer Satisfaction',
    description: 'Understand customer experiences, identify pain points, and improve satisfaction and retention.',
    image: '/assets/img/Consumer Satisfaction.jpg',
    alt: 'Consumer Satisfaction — Analyzing customer journeys, pain points, and retention drivers',
    background: '#F1F5F9', // Subtle cool grey
    panelBg: '#E9EFF5',
    accent: '#65BFFF',
  },
  {
    title: 'Product Concept Testing',
    description: 'Test new ideas and understand customer needs before launch.',
    image: '/assets/img/Product Concept Testing.jpg',
    alt: 'Product Concept Testing — Validating new product concepts and customer needs before launch',
    background: '#F8FAFC', // Soft off-white
    panelBg: '#EDF2F7',
    accent: '#8293A8',
  },
  {
    title: 'Competitive Intelligence',
    description: 'Understand competitors, market trends, and opportunities to stand out.',
    image: '/assets/img/Competitive Intelligence.jpg',
    alt: 'Competitive Intelligence — Benchmarking competitors, market signals, and strategic positioning',
    background: '#F7F9FC', // Soft off-white
    panelBg: '#EEF2F6',
    accent: '#071B33',
  },
  {
    title: 'Pricing & Positioning',
    description: 'Evaluate pricing strategies and find the right position in your market.',
    image: '/assets/img/Pricing & Positioning.jpg',
    alt: 'Pricing & Positioning — Evaluating pricing elasticity and optimal market positioning',
    background: '#E6F2FB', // Pale ice blue
    panelBg: '#DCEBF7',
    accent: '#65BFFF',
  },
  {
    title: 'Data Analytics & Reporting',
    description: 'Turn research data into clear findings and practical business decisions.',
    image: '/assets/img/Data Analytics & Reporting.jpg',
    alt: 'Data Analytics & Reporting — Transforming research data into actionable findings and decisions',
    background: '#F1F5F9', // Subtle cool grey
    panelBg: '#EAEFF5',
    accent: '#071B33',
  },
  {
    title: 'Tracking & Panel Research',
    description: 'Track changing customer opinions, behaviours, and market trends over time.',
    image: '/assets/img/Tracking & Panel Research.jpg',
    alt: 'Tracking & Panel Research — Tracking longitudinal customer sentiment and panel trends over time',
    background: '#EAF4FC', // Pale ice blue
    panelBg: '#E0EEF8',
    accent: '#65BFFF',
  },
];

function ServiceVisualPanel({ item }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-2.5 sm:p-3 rounded-2xl overflow-hidden"
      style={{
        background: item.panelBg || '#FFFFFF',
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm">
        <img
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-102"
          loading="eager"
        />
      </div>
    </div>
  );
}

const content = SERVICES_DATA.map((item) => ({
  title: item.title,
  description: item.description,
  background: item.background,
  content: <ServiceVisualPanel item={item} />,
}));

export default function Services() {
  return (
    <section 
      className="section svc" 
      id="services"
      style={{
        background: 'var(--bg, #FFFFFF)',
        position: 'relative',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(40px, 5vw, 64px)',
      }}
    >
      <div className="wrap" style={{ width: '100%' }}>
        {/* Section Header */}
        <div className="section-head" style={{ marginBottom: 'clamp(20px, 3vw, 36px)' }}>
          <div>
            <span className="eyebrow">What We Do</span>
            <h2 className="t1">Our Research Capabilities</h2>
          </div>
        </div>

        {/* Aceternity UI Sticky Scroll Reveal Implementation */}
        <div className="w-full">
          <StickyScroll content={content} />
        </div>
      </div>
    </section>
  );
}

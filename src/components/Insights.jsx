import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, Clock, Calendar } from 'lucide-react';
import { gsap, ScrollTrigger, Draggable, isReducedMotion } from '../utils/gsap';

export default function Insights() {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const cases = [
    {
      id: 1,
      k: 'Healthcare & Life Sciences',
      title: 'Digital Health & Healthcare Delivery',
      summary: 'Evaluating systemic shifts in remote diagnostics, decentralized patient monitoring, and regulatory compliance hurdles facing institutional healthcare providers.',
      image: './assests/insight-digital-health.jpg',
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
      image: './assests/insight-supply-chain.jpg',
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
      image: './assests/insight-consumer-behavior.jpg',
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
      k: 'Enterprise & Infrastructure',
      title: 'B2B Enterprise Procurement & Resilience',
      summary: 'Investigating decision velocity, risk premiums, and multi-tier supplier qualification among multinational industrial buyers.',
      image: './assests/B2B-Market-Intelligence.jpg',
      num1: '850',
      lbl1: 'Procurement executives interviewed',
      num2: '24',
      lbl2: 'Global markets evaluated',
      date: 'Executive Briefing',
      readTime: '7 min read',
      fullContent: `Enterprise buyers are re-architecting procurement criteria to emphasize supply assurance over marginal unit discounts. Our multi-country survey of 850 procurement heads across automotive, chemical, and industrial technology verticals identifies key strategic pivots.`,
    },
  ];

  useEffect(() => {
    const carWrap = wrapRef.current;
    const car = trackRef.current;
    if (!car || !carWrap) return;

    const cards = Array.from(car.querySelectorAll('.case'));
    const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 400);
    const bounds = () => ({
      minX: Math.min(0, carWrap.clientWidth - car.scrollWidth),
      maxX: 0,
    });

    let dragInstance = null;
    if (Draggable) {
      dragInstance = Draggable.create(car, {
        type: 'x',
        bounds: bounds(),
        edgeResistance: 0.75,
        snap: {
          x: (v) => {
            const s = step();
            return Math.round(v / s) * s;
          },
        },
        cursor: 'grab',
        activeCursor: 'grabbing',
      })[0];
    }

    const go = (dir) => {
      if (!dragInstance) return;
      const b = bounds();
      const x = gsap.getProperty(car, 'x');
      const target = Math.max(b.minX, Math.min(b.maxX, Math.round((x + dir * -step()) / step()) * step()));
      gsap.to(car, {
        x: target,
        duration: 0.7,
        ease: 'power3.out',
        onUpdate: () => dragInstance.update(),
      });
    };

    const prevBtn = carWrap.parentElement.querySelector('.car-prev');
    const nextBtn = carWrap.parentElement.querySelector('.car-next');

    const handlePrev = () => go(-1);
    const handleNext = () => go(1);

    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);

    const handleResize = () => {
      if (dragInstance) dragInstance.applyBounds(bounds());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
      if (nextBtn) nextBtn.removeEventListener('click', handleNext);
      window.removeEventListener('resize', handleResize);
      if (dragInstance) dragInstance.kill();
    };
  }, []);

  return (
    <section className="section work" id="work">
      <div className="wrap">
        
        {/* Section Header with Navigation Controls */}
        <div className="section-head">
          <div>
            <span className="eyebrow">Editorial Perspectives</span>
            <h2 className="t1">Recent Studies, at Scale.</h2>
          </div>

          <div className="car-nav">
            <button className="car-prev" type="button" aria-label="Previous study">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="car-next" type="button" aria-label="Next study">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Draggable Carousel Track */}
      <div ref={wrapRef} className="carousel" data-cursor="Drag">
        <div ref={trackRef} className="car-track">
          {cases.map((item) => (
            <article 
              key={item.id} 
              className="case"
              onClick={() => setSelectedInsight(item)}
            >
              <div className="img">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  width="1000" 
                  height="500" 
                  loading="lazy" 
                  draggable="false" 
                />
              </div>
              <div className="body">
                <p className="k">{item.k}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="nums">
                  <div>
                    <span className="n">{item.num1}</span>
                    <span className="l">{item.lbl1}</span>
                  </div>
                  <div>
                    <span className="n">{item.num2}</span>
                    <span className="l">{item.lbl2}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>



      {/* Full Editorial Reader Modal */}
      {selectedInsight && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071B33]/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#071B33]/20 p-6 sm:p-10 relative animate-fadeIn">
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#071B33] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DCECF8] text-[#102B49] mb-4">
              {selectedInsight.k}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071B33] tracking-tight mb-4 leading-tight">
              {selectedInsight.title}
            </h3>

            <div className="flex items-center space-x-4 text-xs text-[#8293A8] pb-6 mb-6 border-b border-gray-100 font-medium">
              <span>{selectedInsight.date}</span>
              <span>•</span>
              <span>{selectedInsight.readTime}</span>
              <span>•</span>
              <span className="text-[#65BFFF] font-semibold">Zivaro Intelligence Briefing</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-64 bg-gray-100">
              <img
                src={selectedInsight.image}
                alt={selectedInsight.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm sm:text-base text-[#102B49]/90 leading-relaxed space-y-4 font-normal whitespace-pre-line">
              {selectedInsight.fullContent}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-[#8293A8]">
                Published by Zivaro Global Research Pvt Ltd
              </span>
              <button
                onClick={() => setSelectedInsight(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071B33] text-white hover:bg-[#102B49] transition-colors"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

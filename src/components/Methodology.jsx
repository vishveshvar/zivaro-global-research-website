import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

export default function Methodology() {
  const containerRef = useRef(null);

  const stages = [
    {
      num: 'Stage 01',
      title: 'Discover',
      description: 'Needs identification, scoping, and strategic framework development.',
      image: './assests/about-consulting-meeting.jpg',
      tags: ['Stakeholder alignment', 'Hypothesis formulation', 'Methodology design'],
      isDark: false,
    },
    {
      num: 'Stage 02',
      title: 'Investigate',
      description: 'Multi-methodology qualitative and quantitative data collection.',
      image: './assests/FMCG-Retail.jpg',
      tags: ['Primary executive interviews', 'Representative surveying', 'Secondary intelligence'],
      isDark: false,
    },
    {
      num: 'Stage 03',
      title: 'Interpret',
      description: 'Deep analytical synthesis, pattern discovery, and predictive modeling.',
      image: './assests/hero-editorial-architecture.jpg',
      tags: ['Statistical correlation', 'Market simulations', 'Structural trend validation'],
      isDark: false,
    },
    {
      num: 'Stage 04',
      title: 'Recommend',
      description: 'Actionable strategic roadmaps and executive business guidance.',
      image: './assests/Technology-Telecommunications.jpeg',
      tags: ['C-Suite readout', 'Prioritized roadmap', 'Governance metrics'],
      isDark: true,
    },
  ];

  useEffect(() => {
    if (isReducedMotion()) return;

    const wrap = containerRef.current;
    if (!wrap) return;

    const stack = wrap.querySelector('.stack');
    const stageEls = Array.from(wrap.querySelectorAll('.stack .stage'));
    if (!stack || stageEls.length < 2) return;

    const ctx = gsap.context(() => {
      const isWide = window.innerWidth >= 768;
      const BASE = isWide ? 92 : 80;
      const STEP = isWide ? 22 : 16;
      const SC = 0.045;
      const DIM = 0.14;
      const n = stageEls.length;
      const last = stageEls[n - 1];

      stack.classList.add('is-deck');
      const topOf = (i) => BASE + i * STEP;

      stageEls.forEach((st, i) => {
        gsap.set(st, { zIndex: i + 1 });
        if (i < n - 1) {
          ScrollTrigger.create({
            trigger: st,
            start: `top ${topOf(i)}px`,
            endTrigger: last,
            end: `top ${topOf(n - 1)}px`,
            pin: true,
            pinSpacing: false,
            refreshPriority: 1,
          });
        }

        gsap.from(st.querySelectorAll('.stage-text > *'), {
          y: 24,
          opacity: 0,
          stagger: 0.07,
          duration: 0.8,
          scrollTrigger: {
            trigger: st,
            start: 'top 80%',
            once: true,
          },
        });

        const img = st.querySelector('.stage-img');
        if (img) {
          gsap.from(img, {
            y: 40,
            scale: 0.96,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: st,
              start: 'top 85%',
              once: true,
            },
          });
        }
      });

      // Depth scaling and dimming as next cards arrive
      for (let j = 1; j < n; j++) {
        stageEls.slice(0, j).forEach((st, i) => {
          const d0 = j - 1 - i;
          const d1 = j - i;
          gsap.fromTo(
            st,
            { scale: 1 - d0 * SC, '--dim': Math.min(0.6, d0 * DIM) },
            {
              scale: 1 - d1 * SC,
              '--dim': Math.min(0.6, d1 * DIM),
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stageEls[j],
                start: 'top bottom',
                end: `top ${topOf(j)}px`,
                scrub: true,
              },
            }
          );
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-soft process" id="process" ref={containerRef}>
      <div className="wrap">
        
        {/* Section Header */}
        <div className="section-head">
          <div>
            <span className="eyebrow">How We Work</span>
            <h2 className="t1">The Research Journey</h2>
          </div>
        </div>

        {/* Stacking Card Deck */}
        <div className="stack">
          {stages.map((st, idx) => (
            <article 
              key={st.num} 
              className={`stage ${st.isDark ? 'stage-dark' : ''}`}
            >
              <div className="stage-text">
                <span className="num">{st.num}</span>
                <h3>{st.title}</h3>
                <p>{st.description}</p>
                <ul className="j-tags">
                  {st.tags.map((tag, tIdx) => (
                    <li key={tIdx}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="stage-img">
                <img 
                  src={st.image} 
                  alt={st.title} 
                  loading="lazy" 
                />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

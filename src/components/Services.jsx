import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

export default function Services() {
  const journeyWrapRef = useRef(null);

  const capabilities = [
    {
      num: '01',
      title: 'Market Entry Studies',
      description: 'Comprehensive analysis to guide successful market expansion and entry strategies.',
      image: './assests/B2B-Market-Intelligence.jpg',
      tags: ['Target feasibility', 'Barrier mapping', 'Vulnerability index'],
      side: 'left',
    },
    {
      num: '02',
      title: 'Brand Awareness & Perception',
      description: 'Measure and understand how your brand is perceived in the competitive marketplace.',
      image: './assests/hero-abstract-network.jpg',
      tags: ['Brand equity', 'Perception maps', 'Recall index'],
      side: 'right',
    },
    {
      num: '03',
      title: 'Consumer Behavior & Satisfaction',
      description: 'Gain valuable insights into customer experiences, journeys, and satisfaction levels.',
      image: './assests/insight-consumer-behavior.jpg',
      tags: ['Journey mapping', 'NPS & CSAT', 'Ethnography'],
      side: 'left',
    },
    {
      num: '04',
      title: 'Product & Concept Testing',
      description: 'Validate product concepts and optimize user experiences before market launch.',
      image: './assests/Technology-Telecommunications.jpeg',
      tags: ['Concept validation', 'Conjoint pricing', 'Usability'],
      side: 'right',
    },
    {
      num: '05',
      title: 'Competitive Intelligence',
      description: 'Stay ahead with comprehensive analysis of your global competitive landscape.',
      image: './assests/Banking-Finance.jpeg',
      tags: ['Competitor matrix', 'Gap analysis', 'Defense strategy'],
      side: 'left',
    },
    {
      num: '06',
      title: 'Data Analytics & Reporting',
      description: 'Transform raw data into actionable business intelligence with advanced analytics.',
      image: './assests/insight-digital-health.jpg',
      tags: ['Predictive models', 'Dashboards', 'Executive roadmaps'],
      side: 'right',
    },
  ];

  useEffect(() => {
    const wrap = journeyWrapRef.current;
    if (!wrap) return;

    const svg = wrap.querySelector('.journey-svg');
    const track = wrap.querySelector('.j-track');
    const draw = wrap.querySelector('.j-draw');
    const head = wrap.querySelector('.j-head');
    if (!svg || !track || !draw || !head) return;

    const items = Array.from(wrap.querySelectorAll('.j-item'));
    const nodes = items.map((it) => it.querySelector('.j-node'));

    const reduce = isReducedMotion();
    let L = 1;
    let thresholds = [];
    let st = null;

    // Direct render function driven by normalized scroll progress (0 to 1)
    const update = (progress) => {
      const p = Math.max(0, Math.min(1, progress));
      const drawn = L * p;
      draw.style.strokeDashoffset = `${L - drawn}`;

      try {
        const pt = draw.getPointAtLength(Math.min(L, Math.max(0, drawn)));
        head.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      } catch (e) {
        // fallback
      }

      items.forEach((it, i) => {
        const shouldBeLit = drawn >= (thresholds[i] ?? 0);
        it.classList.toggle('is-lit', shouldBeLit);
      });
    };

    const build = () => {
      const r = wrap.getBoundingClientRect();
      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      if (!W || !H) return;

      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      const pts = nodes.map((n) => {
        if (!n) return { x: W / 2, y: 0 };
        const b = n.getBoundingClientRect();
        return {
          x: b.left - r.left + b.width / 2,
          y: b.top - r.top + b.height / 2,
        };
      });

      if (pts.length === 0) return;

      let prev = { x: pts[0].x, y: 0 };
      let d = `M${prev.x} 0`;
      const lens = [];

      pts.forEach((p) => {
        const dy = p.y - prev.y;
        d += ` C${prev.x} ${prev.y + dy * 0.55} ${p.x} ${p.y - dy * 0.55} ${p.x} ${p.y}`;
        track.setAttribute('d', d);
        lens.push(track.getTotalLength());
        prev = p;
      });

      d += ` L${prev.x} ${H}`;
      track.setAttribute('d', d);
      draw.setAttribute('d', d);
      L = draw.getTotalLength();
      draw.style.strokeDasharray = `${L}`;

      // Progressive reveal thresholds:
      // Card 01 activates early as the section enters the viewport.
      // Subsequent cards activate ~25% into their connecting curve segment,
      // so cards reveal promptly as they enter view without requiring excessive scrolling.
      thresholds = lens.map((len, i) => {
        if (i === 0) {
          return Math.min(len * 0.2, 10);
        }
        const prevLen = lens[i - 1];
        return prevLen + (len - prevLen) * 0.25;
      });

      if (reduce) {
        update(1);
      } else if (st) {
        update(st.progress);
      }
    };

    // Use gsap.context for clean React lifecycle scoping and leak prevention
    const ctx = gsap.context(() => {
      build();

      if (!reduce) {
        st = ScrollTrigger.create({
          trigger: wrap,
          start: 'top 82%',
          end: 'bottom 75%',
          scrub: 0.25,
          onUpdate: (self) => {
            update(self.progress);
          },
        });

        // Initialize with current scroll progress
        update(st.progress);
      } else {
        update(1);
      }
    }, wrap);

    const onRefreshInit = () => {
      build();
    };

    const onResize = () => {
      build();
      ScrollTrigger.refresh();
    };

    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);
    window.addEventListener('resize', onResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        build();
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      window.removeEventListener('resize', onResize);
      if (st) st.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section className="section svc" id="services">
      <div className="wrap">

        {/* Section Header */}
        <div className="section-head">
          <div>
            <span className="eyebrow">What We Do</span>
            <h2 className="t1">Our Research Capabilities</h2>
          </div>
        </div>

        {/* Scroll-Drawn Journey Path Container */}
        <div ref={journeyWrapRef} className="journey">
          <svg className="journey-svg" aria-hidden="true">
            <path className="j-track" />
            <path className="j-draw" />
            <g className="j-head">
              <circle className="h2" r="16" />
              <circle className="h1" r="6" />
            </g>
          </svg>

          <ol className="j-list">
            {capabilities.map((svc) => (
              <li key={svc.num} className="j-item" data-side={svc.side}>
                <span className="j-node" aria-hidden="true">
                  <i />
                </span>

                <article className="j-card">
                  <div className="j-img">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      width="640"
                      height="800"
                      loading="lazy"
                    />
                  </div>
                  <div className="j-body">
                    <span className="num">{svc.num}</span>
                    <h3>{svc.title}</h3>
                    <p>{svc.description}</p>
                    <ul className="j-tags">
                      {svc.tags.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}

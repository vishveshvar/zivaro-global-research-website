import React, { useState, useEffect, useRef, useId } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

// Single source of truth for the Brand Health & Market Tracker demonstration data
const TRACKER_DATA = [
  { code: 'BLR', city: 'Bengaluru', value: 54 },
  { code: 'DXB', city: 'Dubai', value: 72 },
  { code: 'RUH', city: 'Riyadh', value: 61 },
  { code: 'LON', city: 'London', value: 66 },
  { code: 'SIN', city: 'Singapore', value: 58 },
  { code: 'NYC', city: 'New York', value: 70 },
];

const METRICS = [
  { label: 'Awareness', value: '72%', progress: 0.72 },
  { label: 'Consideration', value: '48%', progress: 0.48 },
  { label: 'NPS Index', value: '+41', progress: 0.41 },
];

// SVG ViewBox dimensions
const W = 440;
const H = 165;
const PX = 32;
const PY_TOP = 24;
const PY_BOTTOM = 142;

// Smooth cubic Bézier spline through points
function generateSmoothPath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export default function BrandHealthCard() {
  const cardRef = useRef(null);
  const pathRef = useRef(null);
  const areaClipRef = useRef(null);
  const autoCycleTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const clipId = useId().replace(/:/g, '_') + '_area_clip';
  const gradId = useId().replace(/:/g, '_') + '_area_grad';

  // Default active point: DXB (Dubai) with highest awareness (72%)
  const [activeIdx, setActiveIdx] = useState(1);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Synchronized geometry points
  const points = TRACKER_DATA.map((d, i) => {
    const x = PX + (i * (W - 2 * PX)) / (TRACKER_DATA.length - 1);
    const y = PY_BOTTOM - (d.value / 100) * (PY_BOTTOM - PY_TOP);
    return { ...d, x, y };
  });

  const linePathD = generateSmoothPath(points);
  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const areaPathD = `${linePathD} L ${lastPt.x.toFixed(2)} ${PY_BOTTOM} L ${firstPt.x.toFixed(2)} ${PY_BOTTOM} Z`;

  // Grid line Y coordinates (4 subtle horizontal dividers)
  const gridLines = [
    PY_TOP,
    PY_TOP + (PY_BOTTOM - PY_TOP) * 0.333,
    PY_TOP + (PY_BOTTOM - PY_TOP) * 0.666,
    PY_BOTTOM,
  ];

  // Auto-cycling when idle
  useEffect(() => {
    if (isUserInteracting) {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
      return;
    }

    autoCycleTimerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TRACKER_DATA.length);
    }, 3200);

    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
    };
  }, [isUserInteracting]);

  const handlePointSelect = (index) => {
    setActiveIdx(index);
    setIsUserInteracting(true);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handlePointSelect((index + 1) % TRACKER_DATA.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePointSelect((index - 1 + TRACKER_DATA.length) % TRACKER_DATA.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePointSelect(index);
    }
  };

  // GSAP Entrance and ScrollTrigger animation
  useEffect(() => {
    const card = cardRef.current;
    const path = pathRef.current;
    const clipRect = areaClipRef.current;
    if (!card || !path) return;

    const reduce = isReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        // Reduced motion: show final state immediately without transitions
        gsap.set(path, { strokeDashoffset: 0 });
        if (clipRect) gsap.set(clipRect, { attr: { width: W } });
        gsap.set('.chart-point-group', { scale: 1, opacity: 1 });
        gsap.set('.kpi-item', { opacity: 1, y: 0 });
        gsap.set('.kpi-bar-fill', { scaleX: 1 });
        return;
      }

      const totalLen = Math.ceil(path.getTotalLength()) || 500;
      gsap.set(path, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      if (clipRect) {
        gsap.set(clipRect, { attr: { width: 0 } });
      }

      gsap.set('.chart-point-group', { scale: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set('.kpi-item', { opacity: 0, y: 12 });
      gsap.set('.kpi-bar-fill', { scaleX: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      });

      // 1. Line draws from left to right
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.25,
        ease: 'power2.out',
      }, 0);

      // 2. Area fill reveals right behind the line
      if (clipRect) {
        tl.to(clipRect, {
          attr: { width: W },
          duration: 1.15,
          ease: 'power2.out',
        }, 0.15);
      }

      // 3. Data points scale and fade in sequentially
      tl.to('.chart-point-group', {
        scale: 1,
        opacity: 1,
        stagger: 0.09,
        duration: 0.45,
        ease: 'back.out(2)',
      }, 0.35);

      // 4. Supporting KPIs animate into view
      tl.to('.kpi-item', {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
      }, 0.7);

      // 5. Progress indicators animate
      tl.to('.kpi-bar-fill', {
        scaleX: 1,
        stagger: 0.08,
        duration: 0.65,
      }, 0.85);

      // Trigger animation once when card is in view
      ScrollTrigger.create({
        trigger: card,
        start: 'top 95%',
        once: true,
        onEnter: () => tl.play(),
      });
    }, card);

    return () => {
      ctx.revert();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const activePoint = points[activeIdx] || points[0];

  // Tooltip horizontal alignment class to prevent clipping at boundaries
  let tipAlignClass = 'tip-align-center';
  if (activeIdx === 0) {
    tipAlignClass = 'tip-align-left';
  } else if (activeIdx === points.length - 1) {
    tipAlignClass = 'tip-align-right';
  }

  return (
    <div ref={cardRef} className="bcard bcard-main">
      {/* Card Header with Status Badge */}
      <div className="bhead">
        <div>
          <b>Brand Health & Market Tracker</b>
          <small>Cross-Border Intelligence · Wave 4</small>
        </div>
        <span 
          className="live" 
          title="Simulated Continuous Market Intelligence Feed"
          aria-label="Continuous illustrative market intelligence feed"
        >
          <i aria-hidden="true" />
          Live Feed
        </span>
      </div>

      {/* Interactive Responsive SVG Chart */}
      <div 
        className="chart"
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={() => {
          if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
          resumeTimerRef.current = setTimeout(() => setIsUserInteracting(false), 3000);
        }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#65BFFF" stopOpacity="0.24" />
              <stop offset="85%" stopColor="#65BFFF" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#65BFFF" stopOpacity="0" />
            </linearGradient>

            <clipPath id={clipId}>
              <rect ref={areaClipRef} x="0" y="0" width={W} height={H} />
            </clipPath>
          </defs>

          {/* Thin subtle horizontal grid lines */}
          {gridLines.map((gy, gIdx) => (
            <line
              key={gIdx}
              className="chart-grid-line"
              x1={PX - 12}
              y1={gy.toFixed(2)}
              x2={W - PX + 12}
              y2={gy.toFixed(2)}
            />
          ))}

          {/* Soft blue gradient area fill */}
          <path
            className="chart-area"
            d={areaPathD}
            fill={`url(#${gradId})`}
            clipPath={`url(#${clipId})`}
          />

          {/* Smooth electric-blue chart line */}
          <path
            ref={pathRef}
            className="chart-line"
            d={linePathD}
          />

          {/* Vertical crosshair guide for selected point */}
          <line
            className="chart-crosshair"
            x1={activePoint.x}
            y1={PY_TOP}
            x2={activePoint.x}
            y2={PY_BOTTOM}
          />

          {/* Interactive Data Points */}
          {points.map((pt, i) => {
            const isActive = activeIdx === i;
            return (
              <g
                key={pt.code}
                className={`chart-point-group ${isActive ? 'is-active' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${pt.city}: ${pt.value}% awareness`}
                aria-pressed={isActive}
                onClick={() => handlePointSelect(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onMouseEnter={() => handlePointSelect(i)}
                onFocus={() => handlePointSelect(i)}
              >
                {/* Enlarged transparent hit area for responsive touch & mouse targets */}
                <circle cx={pt.x} cy={pt.y} r={18} fill="transparent" />

                {/* Subtle active pulse aura */}
                {isActive && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={9}
                    className="point-pulse"
                    fill="rgba(101, 191, 255, 0.28)"
                  />
                )}

                {/* Crisp circular data point with white center and blue outline */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 5.5 : 4}
                  className="chart-dot"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip clamped within chart container */}
        <div
          className={`tip ${tipAlignClass}`}
          style={{
            left: `${(activePoint.x / W) * 100}%`,
            top: `${(activePoint.y / H) * 100}%`,
          }}
          role="status"
          aria-live="polite"
        >
          <b>{activePoint.value}%</b>
          <span>Awareness · {activePoint.city}</span>
        </div>
      </div>

      {/* Location Labels perfectly synchronized with data point X coordinates */}
      <div className="xlabels" aria-hidden="true">
        {points.map((pt, i) => (
          <span
            key={pt.code}
            className={`xlabel ${activeIdx === i ? 'is-active' : ''}`}
            style={{ left: `${(pt.x / W) * 100}%` }}
            onClick={() => handlePointSelect(i)}
          >
            {pt.code}
          </span>
        ))}
      </div>

      {/* Supporting Metrics with subtle blue progress indicators */}
      <div className="kpis">
        {METRICS.map((m) => (
          <div key={m.label} className="kpi-item">
            <span>{m.label}</span>
            <b>{m.value}</b>
            <div className="kpi-bar">
              <span
                className="kpi-bar-fill"
                style={{ '--v': m.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

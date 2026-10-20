import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion, isFinePointer } from '../utils/gsap';

export default function Reach() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);

  const HUBS = [
    { n: 'Bengaluru', lat: 12.97, lon: 77.59 },
    { n: 'Abu Dhabi', lat: 24.45, lon: 54.65 },
  ];

  const CITIES = [
    { n: 'New York', lat: 40.71, lon: -74.01, r: 'na' },
    { n: 'Toronto', lat: 43.65, lon: -79.38, r: 'na' },
    { n: 'Chicago', lat: 41.88, lon: -87.63, r: 'na' },
    { n: 'San Francisco', lat: 37.77, lon: -122.42, r: 'na' },
    { n: 'Mexico City', lat: 19.43, lon: -99.13, r: 'na' },
    { n: 'São Paulo', lat: -23.55, lon: -46.63, r: 'latam' },
    { n: 'Buenos Aires', lat: -34.6, lon: -58.38, r: 'latam' },
    { n: 'Bogotá', lat: 4.71, lon: -74.07, r: 'latam' },
    { n: 'Lima', lat: -12.05, lon: -77.04, r: 'latam' },
    { n: 'Santiago', lat: -33.45, lon: -70.67, r: 'latam' },
    { n: 'Riyadh', lat: 24.71, lon: 46.68, r: 'mena' },
    { n: 'Jeddah', lat: 21.49, lon: 39.19, r: 'mena' },
    { n: 'Doha', lat: 25.29, lon: 51.53, r: 'mena' },
    { n: 'Cairo', lat: 30.04, lon: 31.24, r: 'mena' },
    { n: 'Casablanca', lat: 33.57, lon: -7.59, r: 'mena' },
    { n: 'Istanbul', lat: 41.01, lon: 28.98, r: 'mena' },
    { n: 'London', lat: 51.51, lon: -0.13, r: 'eu' },
    { n: 'Paris', lat: 48.86, lon: 2.35, r: 'eu' },
    { n: 'Berlin', lat: 52.52, lon: 13.4, r: 'eu' },
    { n: 'Madrid', lat: 40.42, lon: -3.7, r: 'eu' },
    { n: 'Milan', lat: 45.46, lon: 9.19, r: 'eu' },
    { n: 'Warsaw', lat: 52.23, lon: 21.01, r: 'eu' },
    { n: 'Singapore', lat: 1.35, lon: 103.82, r: 'apac' },
    { n: 'Jakarta', lat: -6.21, lon: 106.85, r: 'apac' },
    { n: 'Manila', lat: 14.6, lon: 120.98, r: 'apac' },
    { n: 'Tokyo', lat: 35.68, lon: 139.69, r: 'apac' },
    { n: 'Seoul', lat: 37.57, lon: 126.98, r: 'apac' },
    { n: 'Sydney', lat: -33.87, lon: 151.21, r: 'apac' },
    { n: 'Mumbai', lat: 19.08, lon: 72.88, r: 'apac' },
    { n: 'Delhi', lat: 28.61, lon: 77.21, r: 'apac' },
  ].map((c) => ({
    ...c,
    hub: c.lon > 65 ? HUBS[0] : HUBS[1],
  }));

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext('2d');
    const LAT_TOP = 76;
    const LAT_BOT = -56;
    const LAT_SPAN = LAT_TOP - LAT_BOT;

    let W = 0, H = 0, sc = 1, ox = 0, oy = 0;
    let mx = -9000, my = -9000, tx = -9000, ty = -9000;
    let t0 = performance.now();
    let visible = true;
    let raf = 0;

    const reduce = isReducedMotion();
    const fine = isFinePointer();
    const state = { p: reduce ? 1 : 0 };

    const X = (lon) => ox + (lon + 180) * sc;
    const Y = (lat) => oy + (LAT_TOP - lat) * sc;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sc = Math.max(W / 360, H / LAT_SPAN);
      ox = W / 2 - (W < 760 ? 45 + 180 : 180) * sc;
      oy = (H - LAT_SPAN * sc) / 2;
    };

    // Procedural world land dots covering major continents
    const dots = [];
    const continentBoxes = [
      // North America
      { minLat: 15, maxLat: 70, minLon: -160, maxLon: -55 },
      // South America
      { minLat: -54, maxLat: 12, minLon: -80, maxLon: -35 },
      // Europe
      { minLat: 36, maxLat: 70, minLon: -10, maxLon: 40 },
      // Africa
      { minLat: -34, maxLat: 37, minLon: -17, maxLon: 51 },
      // Asia
      { minLat: 10, maxLat: 72, minLon: 40, maxLon: 145 },
      // India
      { minLat: 8, maxLat: 36, minLon: 68, maxLon: 92 },
      // Australia
      { minLat: -42, maxLat: -11, minLon: 113, maxLon: 153 },
      // UK & Scandinavia
      { minLat: 50, maxLat: 68, minLon: -5, maxLon: 25 },
    ];

    const step = 2.8;
    for (let lat = LAT_TOP - 1; lat > LAT_BOT; lat -= step) {
      for (let lon = -179; lon < 180; lon += step) {
        const inLand = continentBoxes.some(
          (b) => lat >= b.minLat && lat <= b.maxLat && lon >= b.minLon && lon <= b.maxLon
        );
        // Exclude big ocean areas
        const isAtlantic = lat < 55 && lat > 0 && lon > -45 && lon < -15;
        const isPacific = lat < 50 && lat > -40 && lon > -160 && lon < -90;
        const isIndianOcean = lat < 0 && lat > -50 && lon > 50 && lon < 110;

        if (inLand && !isAtlantic && !isPacific && !isIndianOcean) {
          dots.push({ lat, lon });
        }
      }
    }

    const arcPts = (a, b, n) => {
      const ax = X(a.lon), ay = Y(a.lat), bx = X(b.lon), by = Y(b.lat);
      const mxp = (ax + bx) / 2, myp = (ay + by) / 2;
      const dist = Math.hypot(bx - ax, by - ay);
      const cx = mxp, cy = myp - dist * 0.22;
      const out = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, u = 1 - t;
        out.push([
          u * u * ax + 2 * u * t * cx + t * t * bx,
          u * u * ay + 2 * u * t * cy + t * t * by,
        ]);
      }
      return out;
    };

    const label = (txt, x, y, color) => {
      ctx.font = '600 11px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(255,255,255,.95)';
      ctx.strokeText(txt, x, y);
      ctx.fillStyle = color;
      ctx.fillText(txt, x, y);
    };

    const draw = (now) => {
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
      mx += (tx - mx) * 0.14;
      my += (ty - my) * 0.14;
      const t = (now - t0) / 1000;
      const P = state.p;

      ctx.clearRect(0, 0, W, H);
      const r = Math.max(1.1, sc * 0.42);

      // Draw background land dots
      for (let i = 0, n = dots.length; i < n; i++) {
        const x = X(dots[i].lon), y = Y(dots[i].lat);
        if (x < -4 || x > W + 4 || y < -4 || y > H + 4) continue;
        const dd = Math.hypot(x - mx, y - my);
        let k = Math.max(0, 1 - dd / 130);
        k *= k;

        if (k > 0.02) {
          ctx.fillStyle = `rgba(101,191,255,${(0.3 + 0.6 * k).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(x, y, r + 1.6 * k, 0, 6.2832);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(7,27,51,.14)';
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }

      ctx.lineCap = 'round';

      // Draw flight/data routes to cities
      CITIES.forEach((ct, i) => {
        const k = Math.max(0, Math.min(1, (P - i * 0.012) / 0.6));
        if (k <= 0) return;

        const active = activeRegion === null ? null : activeRegion === ct.r;
        const pts = arcPts(ct.hub, ct, 36);
        const nn = Math.floor(k * 36);

        ctx.strokeStyle = `rgba(101,191,255,${active === null ? 0.35 : active ? 0.95 : 0.08})`;
        ctx.lineWidth = active ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let j = 1; j <= nn; j++) {
          ctx.lineTo(pts[j][0], pts[j][1]);
        }
        ctx.stroke();

        if (k >= 1) {
          const x = X(ct.lon), y = Y(ct.lat);
          if (active) {
            const ph = (t * 0.7 + i * 0.13) % 1;
            ctx.strokeStyle = `rgba(101,191,255,${((1 - ph) * 0.7).toFixed(2)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, 4 + ph * 12, 0, 6.2832);
            ctx.stroke();
          }

          ctx.fillStyle = active === false ? 'rgba(7,27,51,.25)' : '#071B33';
          ctx.beginPath();
          ctx.arc(x, y, active ? 3.6 : 2.6, 0, 6.2832);
          ctx.fill();

          if (active) {
            label(ct.n, x + 8, y, '#071B33');
          }
        }
      });

      // Draw Hubs: Bengaluru & Abu Dhabi
      HUBS.forEach((h, i) => {
        const x = X(h.lon), y = Y(h.lat);
        const ph = (t * 0.55 + i * 0.5) % 1;
        ctx.strokeStyle = `rgba(101,191,255,${((1 - ph) * 0.8).toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, 5 + ph * 18, 0, 6.2832);
        ctx.stroke();

        ctx.fillStyle = '#65BFFF';
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 6.2832);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, 6.2832);
        ctx.fill();

        label(h.n, x + 10, y + (i === 0 ? 9 : -9), '#0582B5');
      });
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (fine) {
      c.addEventListener('mousemove', (e) => {
        const b = c.getBoundingClientRect();
        tx = e.clientX - b.left;
        ty = e.clientY - b.top;
      });
      c.addEventListener('mouseleave', () => {
        tx = -9000;
        ty = -9000;
      });
    }

    if (!reduce) {
      gsap.to(state, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.8,
        },
      });
    }

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [activeRegion]);

  return (
    <section className="section reach" id="reach" ref={containerRef}>
      <div className="wrap">
        
        {/* Reach Header */}
        <div className="reach-head">
          <div>
            <span className="eyebrow">Reach</span>
            <div className="big">
              <span>45+</span>
              <small>markets, one standard</small>
            </div>
          </div>

          <div>
            <p className="lead">
              Proprietary panels and trusted research networks across five regions, run from hubs in Bengaluru and Abu Dhabi. In India, fieldwork spans metros to tier-4 districts, GPS-verified.
            </p>

            {/* Region Filter Buttons */}
            <div className="regions">
              <span className="pill hub">Bengaluru</span>
              <span className="pill hub">Abu Dhabi</span>
              <button
                className={`pill ${activeRegion === 'na' ? 'is-active' : ''}`}
                type="button"
                onMouseEnter={() => setActiveRegion('na')}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === 'na' ? null : 'na')}
              >
                North America
              </button>
              <button
                className={`pill ${activeRegion === 'latam' ? 'is-active' : ''}`}
                type="button"
                onMouseEnter={() => setActiveRegion('latam')}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === 'latam' ? null : 'latam')}
              >
                LATAM
              </button>
              <button
                className={`pill ${activeRegion === 'mena' ? 'is-active' : ''}`}
                type="button"
                onMouseEnter={() => setActiveRegion('mena')}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === 'mena' ? null : 'mena')}
              >
                MENA
              </button>
              <button
                className={`pill ${activeRegion === 'eu' ? 'is-active' : ''}`}
                type="button"
                onMouseEnter={() => setActiveRegion('eu')}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === 'eu' ? null : 'eu')}
              >
                Europe
              </button>
              <button
                className={`pill ${activeRegion === 'apac' ? 'is-active' : ''}`}
                type="button"
                onMouseEnter={() => setActiveRegion('apac')}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === 'apac' ? null : 'apac')}
              >
                APAC
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Canvas Map */}
        <div className="map">
          <canvas
            ref={canvasRef}
            className="map-canvas"
            aria-label="Interactive world map showing Zivaro hubs in Bengaluru and Abu Dhabi and routes to global markets across five regions"
            role="img"
          />

          <div className="map-legend" aria-hidden="true">
            <span>
              <i className="l-hub" /> Hubs (Bengaluru & Abu Dhabi)
            </span>
            <span>
              <i className="l-mkt" /> Verified Markets
            </span>
            <span className="map-hint">Hover a region pill to trace global routes</span>
          </div>

          <div className="map-stat">
            <b>250+</b>
            <span>Districts covered in verified fieldwork</span>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import { gsap, isReducedMotion, isFinePointer } from '../utils/gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion() || !isFinePointer()) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const handleMouseMove = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle interactive hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], [data-magnetic], input, textarea, select');
      if (target) {
        root.classList.add('cursor-hover');
        if (target.dataset.cursor) {
          ring.dataset.label = target.dataset.cursor;
          root.classList.add('cursor-label');
        }
      } else {
        root.classList.remove('cursor-hover', 'cursor-label');
        ring.dataset.label = '';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Magnetic buttons
    const handleMagneticMove = (e) => {
      const btn = e.target.closest('[data-magnetic]');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.32;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
      gsap.to(btn, { x, y, duration: 0.5, ease: 'power3.out' });
    };

    const handleMagneticLeave = (e) => {
      const btn = e.target.closest('[data-magnetic]');
      if (!btn) return;
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };

    document.addEventListener('mousemove', handleMagneticMove);
    document.addEventListener('mouseout', handleMagneticLeave);

    return () => {
      root.classList.remove('has-cursor', 'cursor-hover', 'cursor-label');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousemove', handleMagneticMove);
      document.removeEventListener('mouseout', handleMagneticLeave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-label="" />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { useRouter } from '../utils/router';
import { gsap, isReducedMotion } from '../utils/gsap';

export default function PageHeader({ eyebrow, title, lead, breadcrumb }) {
  const { navigate } = useRouter();
  const headerRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.wrap > *'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.65, ease: 'power3.out' }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div 
      ref={headerRef}
      className="page-intro" 
      style={{
        paddingTop: 'calc(var(--head) + 44px)',
        paddingBottom: '52px',
        background: 'linear-gradient(180deg, var(--soft) 0%, #FFFFFF 100%)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <nav 
          aria-label="Breadcrumb" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            marginBottom: '20px',
            fontFamily: 'var(--font-head)',
          }}
        >
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={{ 
              color: 'var(--cyan-700)', 
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
          >
            Home
          </a>
          <span style={{ color: 'var(--line)', userSelect: 'none' }}>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 500 }}>
            {breadcrumb || title}
          </span>
        </nav>

        {eyebrow && (
          <span className="eyebrow" style={{ marginBottom: '16px' }}>
            {eyebrow}
          </span>
        )}

        <h1 
          className="t1" 
          style={{ 
            color: 'var(--navy)', 
            marginBottom: lead ? '16px' : '0',
            maxWidth: '22ch',
          }}
        >
          {title}
        </h1>

        {lead && (
          <p className="lead" style={{ color: 'var(--text)', maxWidth: '62ch' }}>
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}

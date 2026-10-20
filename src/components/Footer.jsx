import React, { useState, useEffect } from 'react';
import { ArrowUp, X, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [legalModal, setLegalModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && legalModal) {
        setLegalModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [legalModal]);

  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--line)', background: '#FFFFFF', padding: '64px 0 36px' }}>
      <div className="wrap">
        {/* Top Editorial Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px', paddingBottom: '48px', borderBottom: '1px solid var(--line)' }}>
          {/* Brand Col */}
          <div>
            <a href="#top" aria-label="Zivaro Global Research" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img
                src="./assets/img/logo-dark-sm.png"
                alt="Zivaro Global Research"
                width="600"
                height="186"
                style={{ height: '32px', width: 'auto' }}
                onError={(e) => {
                  e.currentTarget.src = './assests/logo-dark-sm.png';
                }}
              />
            </a>
            <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6', maxWidth: '36ch', marginBottom: '20px' }}>
              A specialized corporate market intelligence firm delivering verified primary research, competitive forensics, and strategic growth frameworks to global leadership teams.
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ width: '14px', height: '14px', color: 'var(--cyan)' }} />
                <span>Chennai, India (HQ) · Bengaluru · Abu Dhabi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail style={{ width: '14px', height: '14px', color: 'var(--cyan)' }} />
                <a href="mailto:sales@zivaroresearch.com" style={{ color: 'var(--navy)', fontWeight: '600' }}>
                  sales@zivaroresearch.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone style={{ width: '14px', height: '14px', color: 'var(--cyan)' }} />
                <a href="tel:+919962341868" style={{ color: 'var(--navy)', fontWeight: '600' }}>
                  +91 9962341868
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{ fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '16px' }}>
              Navigation
            </h4>
            <ul style={{ display: 'grid', gap: '10px', fontSize: '0.9rem', color: 'var(--text)' }}>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Capabilities &amp; Services</a></li>
              <li><a href="#expertise" style={{ transition: 'color 0.2s' }}>Industry Verticals</a></li>
              <li><a href="#process" style={{ transition: 'color 0.2s' }}>Methodology Framework</a></li>
              <li><a href="#work" style={{ transition: 'color 0.2s' }}>Case Studies &amp; Insights</a></li>
              <li><a href="#leadership" style={{ transition: 'color 0.2s' }}>Leadership Team</a></li>
              <li><a href="#contact" style={{ transition: 'color 0.2s' }}>Direct Briefing</a></li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 style={{ fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '16px' }}>
              Research Practice Areas
            </h4>
            <ul style={{ display: 'grid', gap: '10px', fontSize: '0.9rem', color: 'var(--text)' }}>
              <li>Market Entry Studies</li>
              <li>Brand Awareness &amp; Perception</li>
              <li>Consumer Behavior &amp; Satisfaction</li>
              <li>Product &amp; Concept Testing</li>
              <li>Competitive Intelligence</li>
              <li>Data Analytics &amp; Reporting</li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 style={{ fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '16px' }}>
              Governance &amp; Privacy
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              All methodologies comply with strict ESOMAR ethics, GDPR/CCPA standards, and rigorous GPS &amp; digital respondent validation.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                style={{ fontSize: '0.84rem', color: 'var(--cyan-700)', textDecoration: 'underline' }}
              >
                Privacy Policy
              </button>
              <span style={{ color: 'var(--line)' }}>•</span>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                style={{ fontSize: '0.84rem', color: 'var(--cyan-700)', textDecoration: 'underline' }}
              >
                Terms of Use
              </button>
            </div>
            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                onClick={scrollToTop}
                className="btn btn-secondary btn-sm"
                data-magnetic
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Back to top</span>
                <ArrowUp style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row" style={{ paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Zivaro Global Research Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            Quality-driven insights. Boundary-free thinking.
          </div>
          <div>
            <a
              href="https://www.linkedin.com/company/zivaro-global-research/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textDecoration: 'underline' }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Compliance Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(2, 19, 38, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setLegalModal(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 30px 60px -20px rgba(2, 19, 38, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--soft)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--navy)',
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-700)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              <ShieldCheck style={{ width: '16px', height: '16px' }} />
              <span>Zivaro Global Research Corporate Compliance</span>
            </div>

            <h3 style={{ fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '16px' }}>
              {legalModal === 'privacy' ? 'Privacy Policy & Data Ethics' : 'Terms of Use & Engagement'}
            </h3>

            <div style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.7', display: 'grid', gap: '14px' }}>
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Zivaro Global Research Pvt Ltd maintains rigorous international compliance frameworks governing the privacy, security, and anonymity of all research participants and corporate clients.
                  </p>
                  <p>
                    <strong>1. Information Collection &amp; Use:</strong> Field data collected through quantitative CATI, CAWI, and CAPI instruments is anonymized, encrypted, and isolated from personally identifiable records.
                  </p>
                  <p>
                    <strong>2. Research Integrity:</strong> All research protocols strictly observe ESOMAR guidelines, the ICC/ESOMAR International Code on Market, Opinion and Social Research, and local jurisdictional data security regulations.
                  </p>
                  <p>
                    <strong>3. Data Retention:</strong> Project datasets and audit verification logs are preserved securely for the contracted duration before systematic scrubbing.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    These Terms of Use govern the engagement standards, intellectual property rights, and analytical representations provided by Zivaro Global Research Pvt Ltd.
                  </p>
                  <p>
                    <strong>1. Intellectual Property:</strong> Custom research briefings, primary datasets, and proprietary dashboards commissioned by clients remain the confidential work product of the contracting entity upon settlement.
                  </p>
                  <p>
                    <strong>2. Independent Advisory:</strong> Analytical forecasts, market projections, and strategic recommendations are developed with professional diligence based on empirical sample verification.
                  </p>
                </>
              )}
            </div>

            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--line)', textAlign: 'right' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setLegalModal(null)}
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

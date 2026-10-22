import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { ShieldCheck, MapPin, Building, Award, ArrowRight } from 'lucide-react';

export default function LeadershipPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    document.title = 'Executive Leadership — Zivaro Global Research';
  }, []);

  const leaders = [
    {
      name: 'Anil V B',
      role: 'Co-Founder & Director · Bengaluru',
      desc: 'Leads global client partnerships, strategic accounts, and fieldwork operations across B2B, consumer markets, and healthcare.',
      prev: 'Borderless Access · Market Xcel · Greenland Market Research',
      image: './assets/img/founder-anil.jpg',
      fallbackImage: './assests/founder-anil.jpg',
      specialties: ['B2B Market Intelligence', 'Fieldwork Governance', 'Strategic Account Advisory'],
    },
    {
      name: 'Manzoor Rahman',
      role: 'Co-Founder & Director · Dubai',
      desc: 'Healthcare and life sciences specialist. Spearheads multi-country intelligence programs across MENA, Europe, North America, and APAC.',
      prev: 'Krea · Market Xcel · Greenland Market Research · CSS Corp',
      image: './assets/img/founder-manzoor.jpg',
      fallbackImage: './assests/founder-manzoor.jpg',
      specialties: ['Healthcare & Life Sciences', 'Cross-Border MENA / APAC Studies', 'KOL & Physician Panels'],
    },
  ];

  return (
    <div className="page-leadership">
      <PageHeader
        eyebrow="Governance &amp; Directorship"
        title="Executive Leadership"
        lead="Founder-led on every engagement. Two co-founders, dual strategic hubs in Bengaluru and Dubai, and one operating standard: senior director involvement on every study from inception to executive readout."
        breadcrumb="Leadership"
      />

      {/* Leadership Showcase Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Direct Engagement</span>
              <h2 className="t1">Founder-Led, On Every Engagement</h2>
            </div>
            <p className="lead">
              Our founding directors bring decades of market research leadership across global agencies, ensuring institutional-grade research design and executive clarity.
            </p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
              gap: 'clamp(28px, 4vw, 48px)',
              marginTop: '40px' 
            }}
          >
            {leaders.map((ldr) => (
              <article 
                key={ldr.name}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  boxShadow: '0 16px 36px -12px rgba(7, 27, 51, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '360px', overflow: 'hidden', background: 'var(--soft)' }}>
                  <img 
                    src={ldr.image} 
                    alt={`${ldr.name}, ${ldr.role}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      if (ldr.fallbackImage) {
                        e.currentTarget.src = ldr.fallbackImage;
                      }
                    }}
                  />
                </div>

                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                  <div>
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '6px' }}>
                      {ldr.name}
                    </h3>
                    <p style={{ color: 'var(--cyan-700)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px' }}>
                      {ldr.role}
                    </p>
                    <p style={{ color: 'var(--text)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '20px' }}>
                      {ldr.desc}
                    </p>

                    <div style={{ padding: '14px 16px', background: 'var(--soft)', borderRadius: '14px', border: '1px solid var(--line)', marginBottom: '20px', fontSize: '0.86rem' }}>
                      <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Prior Advisory Background</strong>
                      <span style={{ color: 'var(--text)' }}>{ldr.prev}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {ldr.specialties.map((sp, idx) => (
                        <span 
                          key={idx} 
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            padding: '4px 10px',
                            background: 'var(--tint)',
                            color: 'var(--cyan-700)',
                            borderRadius: '999px',
                          }}
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigate('/contact')}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Connect with Director</span>
                      <span className="arr">
                        <ArrowRight style={{ width: '14px', height: '14px' }} />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Directorship Guarantee & Strategic Hubs */}
      <section className="section section-soft">
        <div className="wrap">
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: '24px', 
              border: '1px solid var(--line)', 
              padding: 'clamp(32px, 4vw, 52px)',
              boxShadow: 'var(--shadow)',
              marginBottom: '48px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
              <div 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'var(--tint)', 
                  display: 'grid', 
                  placeItems: 'center', 
                  color: 'var(--cyan-700)',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '8px' }}>
                  The Zivaro Senior Involvement Guarantee
                </h3>
                <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '72ch' }}>
                  Unlike conventional market research agencies where business development leads sell a project and hand it off to junior associates, our founding partners lead the research design, oversee quality control during data collection, and personally present the executive findings to your board.
                </p>
              </div>
            </div>
          </div>

          <div className="section-head">
            <div>
              <span className="eyebrow">Global Operations</span>
              <h2 className="t1">Strategic Hubs &amp; Directorship</h2>
            </div>
            <p className="lead">
              Our regional presence provides direct market access across emerging and developed commercial centers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '36px' }}>
            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--cyan-700)', marginBottom: '14px' }}>
                <Building style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Corporate HQ</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '8px' }}>Chennai, India</h4>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Central analytical coordination, primary methodologies governance, global operations management, and corporate reporting.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--cyan-700)', marginBottom: '14px' }}>
                <MapPin style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Field Operations</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '8px' }}>Bengaluru, India</h4>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Tech ecosystem intelligence, rapid consumer surveying, panel validation frameworks, and pan-India fieldwork direction.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--cyan-700)', marginBottom: '14px' }}>
                <Award style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>International Client Hub</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '8px' }}>Dubai &amp; Abu Dhabi, UAE</h4>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Middle East &amp; North Africa cross-border client accounts, healthcare KOL panels, sovereign fund briefings, and executive liaisons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

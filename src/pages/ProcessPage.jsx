import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { 
  Search, 
  Layers, 
  Cpu, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  FileCheck2,
  Lock,
  Workflow
} from 'lucide-react';

export default function ProcessPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    document.title = 'Research Methodology & Process — Zivaro Global Research';
  }, []);

  const stages = [
    {
      num: 'Stage 01',
      title: 'Discover',
      tagline: 'Needs identification, scoping, and strategic framework development.',
      icon: Search,
      deliverables: 'Methodology Brief & Sampling Protocol',
      points: [
        'Stakeholder alignment & strategic objective calibration',
        'Hypothesis formulation & decision boundary definition',
        'Custom methodology design (qualitative, quantitative, or hybrid)',
        'Target sample definition, feasibility assessment & quota setting',
      ],
      image: './assests/about-consulting-meeting.jpg',
    },
    {
      num: 'Stage 02',
      title: 'Investigate',
      tagline: 'Multi-methodology qualitative and quantitative data collection.',
      icon: Layers,
      deliverables: 'Verified Primary Datasets & Fieldwork Logs',
      points: [
        'Primary executive interviews (IDIs) & specialized C-suite access',
        'High-integrity representative surveying across CATI, CAWI, and CAPI instruments',
        'Rigorous GPS and digital timestamp respondent verification',
        'In-depth secondary intelligence & competitive document auditing',
      ],
      image: './assests/FMCG-Retail.jpg',
    },
    {
      num: 'Stage 03',
      title: 'Interpret',
      tagline: 'Deep analytical synthesis, pattern discovery, and predictive modeling.',
      icon: Cpu,
      deliverables: 'Statistical Models & Correlation Matrix',
      points: [
        'Multi-source statistical correlation & data cleaning with semantic validation',
        'Market simulation models, Conjoint/MaxDiff, and Van Westendorp pricing curves',
        'Structural trend validation, anomaly detection & driver analysis',
        'Cross-tabulation and sub-demographic behavioral segmentation',
      ],
      image: './assests/hero-editorial-architecture.jpg',
    },
    {
      num: 'Stage 04',
      title: 'Recommend',
      tagline: 'Actionable strategic roadmaps and executive business guidance.',
      icon: Award,
      deliverables: 'Board Briefing Deck & Interactive BI Dashboards',
      points: [
        'Board-ready executive briefings & interactive BI dashboard deployment',
        'Prioritized commercial roadmaps with risk mitigation matrices',
        'Clear, defensible ROI projections and operational go-to-market milestones',
        'Post-delivery advisory and longitudinal KPI governance',
      ],
      image: './assests/Technology-Telecommunications.jpeg',
    },
  ];

  return (
    <div className="page-process">
      <PageHeader
        eyebrow="Research Architecture"
        title="Our Research Process &amp; Methodology"
        lead="Every Zivaro engagement follows an exhaustive 4-stage analytical lifecycle, combining primary fieldwork rigor with advanced quantitative validation and board-level strategic advisory."
        breadcrumb="Process"
      />

      {/* 4 Stages Detailed Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Rigorous Governance</span>
              <h2 className="t1">Methodical Governance from Discovery to Executive Action</h2>
            </div>
            <p className="lead">
              Our systematic framework ensures transparency, reproducibility, and uncompromised analytical integrity across every study phase.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '36px', marginTop: '40px' }}>
            {stages.map((stg) => {
              const IconComp = stg.icon;
              return (
                <div 
                  key={stg.num}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1px solid var(--line)',
                    padding: 'clamp(28px, 4vw, 44px)',
                    boxShadow: '0 12px 32px -12px rgba(7, 27, 51, 0.08)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: ' clamp(24px, 4vw, 48px)',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <div 
                        style={{ 
                          width: '46px', 
                          height: '46px', 
                          borderRadius: '12px', 
                          background: 'var(--tint)', 
                          display: 'grid', 
                          placeItems: 'center', 
                          color: 'var(--cyan-700)' 
                        }}
                      >
                        <IconComp style={{ width: '22px', height: '22px' }} />
                      </div>
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-head)', 
                          fontSize: '0.86rem', 
                          fontWeight: 700, 
                          color: 'var(--cyan-700)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {stg.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--navy)', marginBottom: '10px' }}>
                      {stg.title}
                    </h3>

                    <p style={{ color: 'var(--text)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px', fontWeight: 500 }}>
                      {stg.tagline}
                    </p>

                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontWeight: 700, marginBottom: '12px' }}>
                        Core Activities &amp; Validation Protocols
                      </div>
                      <ul style={{ display: 'grid', gap: '10px' }}>
                        {stg.points.map((pt, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.94rem', color: 'var(--text)' }}>
                            <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--cyan-700)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 14px', 
                        background: 'var(--soft)', 
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        fontSize: '0.86rem',
                        color: 'var(--navy)',
                        fontWeight: 600,
                      }}
                    >
                      <FileCheck2 style={{ width: '16px', height: '16px', color: 'var(--cyan-700)' }} />
                      <span>Deliverable: {stg.deliverables}</span>
                    </div>
                  </div>

                  <div>
                    <div 
                      style={{ 
                        borderRadius: '20px', 
                        overflow: 'hidden', 
                        boxShadow: '0 16px 36px -12px rgba(7, 27, 51, 0.15)',
                        border: '1px solid var(--line)',
                        height: '280px',
                      }}
                    >
                      <img 
                        src={stg.image} 
                        alt={`${stg.title} Phase`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Standards Section */}
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Quality Standards</span>
              <h2 className="t1">Ethical Frameworks &amp; Analytical Governance</h2>
            </div>
            <p className="lead">
              Our research operations observe strict international compliance codes, protecting participant rights and guaranteeing data authenticity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '36px' }}>
            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)', marginBottom: '18px' }}>
                <ShieldCheck style={{ width: '22px', height: '22px' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '10px' }}>ESOMAR Code Compliant</h3>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                100% adherence to the ICC/ESOMAR International Code on Market, Opinion and Social Research and Data Analytics.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)', marginBottom: '18px' }}>
                <Lock style={{ width: '22px', height: '22px' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '10px' }}>GDPR &amp; CCPA Data Ethics</h3>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Strict participant consent, data encryption, pseudonymization, and secure retention protocols across all studies.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px 28px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--tint)', display: 'grid', placeItems: 'center', color: 'var(--cyan-700)', marginBottom: '18px' }}>
                <Workflow style={{ width: '22px', height: '22px' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '10px' }}>Triple-Check Audit Trail</h3>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Automated logic checks, GPS-verified fieldwork timestamps, and independent back-checks on at least 20% of sample records.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/contact')}
            >
              <span>Commission a Verified Study</span>
              <span className="arr">
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

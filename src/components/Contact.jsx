import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Linkedin, CheckCircle2, Send } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

export default function Contact() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    sector: 'Healthcare & Pharmaceuticals',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) {
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 88%',
            once: true,
          },
        });

        tl.fromTo(
          ctaRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
        )
        .fromTo(
          '.meta > div',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.form .field',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = `Research brief from ${formData.name || 'website'} - ${formData.organization || 'General'}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Organization: ${formData.organization}`,
      `Sector: ${formData.sector}`,
      '',
      'The Brief:',
      formData.message,
    ].join('\n');

    // Mailto fallback
    window.location.href = `mailto:sales@zivaroresearch.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="section" id="contact" ref={sectionRef} style={{ paddingTop: 'clamp(24px, 3.5vw, 44px)' }}>
      <div className="wrap">
        <div 
          className="cta" 
          ref={ctaRef}
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(7, 27, 51, 0.6) 0%, rgba(7, 27, 51, 0.82) 100%), url("/assests/blur-gradients.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.1)', color: '#65BFFF' }}>
              Direct Engagement
            </span>
            <h2 className="t1" style={{ color: '#FFFFFF', marginTop: '12px', marginBottom: '14px' }}>
              Let's find the clarity your business needs.
            </h2>
            <p style={{ color: '#B8C4D4', maxWidth: '44ch', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Reach out to partner with our global insights team and build a strategy backed by evidence. Tell us your target audience, markets, and timeline, and a director will respond with feasibility and a tailored proposal.
            </p>

            <div className="meta" style={{ marginTop: '28px', display: 'grid', gap: '16px' }}>
              <div>
                <b>Corporate Inquiries &amp; Briefs</b>
                <a href="mailto:sales@zivaroresearch.com" style={{ color: '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
                  sales@zivaroresearch.com
                </a>
              </div>
              <div>
                <b>Direct Telephone</b>
                <a href="tel:+919962341868" style={{ color: '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
                  +91 9962341868
                </a>
              </div>
              <div>
                <b>Registered Headquarters</b>
                <span style={{ display: 'block', color: '#DCECF8', fontSize: '0.92rem', marginTop: '3px' }}>
                  Zivaro Global Research Pvt Ltd, Chennai, Tamil Nadu 600118, India
                </span>
              </div>
              <div>
                <b>Operational Hubs</b>
                <span style={{ display: 'block', color: '#DCECF8', fontSize: '0.92rem', marginTop: '3px' }}>
                  Bengaluru, India · Abu Dhabi, UAE
                </span>
              </div>
              <div>
                <b>LinkedIn</b>
                <a 
                  href="https://www.linkedin.com/company/zivaro-global-research/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#65BFFF', borderBottom: '1px solid rgba(101,191,255,0.4)' }}
                >
                  Zivaro Global Research
                </a>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '36px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.14)' }}>
                <CheckCircle2 style={{ width: '48px', height: '48px', color: '#65BFFF', margin: '0 auto 16px' }} />
                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Brief Received Successfully
                </h3>
                <p style={{ color: '#B8C4D4', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  Thank you for submitting your research parameters. Your email app has been opened with your inquiry formatted, and our sector directors will review your timeline and feasibility.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      organization: '',
                      sector: 'Healthcare & Pharmaceuticals',
                      message: '',
                    });
                  }}
                >
                  Send Another Brief
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="f-name">Full Name</label>
                </div>

                <div className="field">
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Corporate Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="f-email">Corporate Email</label>
                </div>

                <div className="field">
                  <input
                    id="f-org"
                    name="organization"
                    type="text"
                    placeholder="Organization / Company"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="f-org">Organization / Company</label>
                </div>

                <div className="field">
                  <select
                    id="f-sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      borderRadius: '14px',
                      padding: '22px 16px 10px',
                      color: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  >
                    <option value="Healthcare & Pharmaceuticals" style={{ background: '#071B33', color: '#fff' }}>Healthcare &amp; Pharmaceuticals</option>
                    <option value="B2B Market Intelligence" style={{ background: '#071B33', color: '#fff' }}>B2B Market Intelligence</option>
                    <option value="FMCG & Retail" style={{ background: '#071B33', color: '#fff' }}>FMCG &amp; Retail</option>
                    <option value="Banking & Financial Services" style={{ background: '#071B33', color: '#fff' }}>Banking &amp; Financial Services</option>
                    <option value="Technology & Telecommunications" style={{ background: '#071B33', color: '#fff' }}>Technology &amp; Telecommunications</option>
                    <option value="Energy & Utilities" style={{ background: '#071B33', color: '#fff' }}>Energy &amp; Utilities</option>
                    <option value="Automotive & Transport" style={{ background: '#071B33', color: '#fff' }}>Automotive &amp; Transport</option>
                    <option value="Education & E-Learning" style={{ background: '#071B33', color: '#fff' }}>Education &amp; E-Learning</option>
                    <option value="Cosmetics & Luxury Goods" style={{ background: '#071B33', color: '#fff' }}>Cosmetics &amp; Luxury Goods</option>
                    <option value="Travel & Hospitality" style={{ background: '#071B33', color: '#fff' }}>Travel &amp; Hospitality</option>
                    <option value="Media & Entertainment" style={{ background: '#071B33', color: '#fff' }}>Media &amp; Entertainment</option>
                  </select>
                  <label htmlFor="f-sector" style={{ transform: 'translateY(-10px) scale(0.78)', color: 'var(--cyan)' }}>
                    Primary Industry Vertical
                  </label>
                </div>

                <div className="field">
                  <textarea
                    id="f-msg"
                    name="message"
                    placeholder="Project Brief"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="f-msg">The brief: audience, target markets, research scope, and timeline</label>
                </div>

                <div className="hp" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label>Leave this empty <input type="text" name="website" tabIndex="-1" autoComplete="off" /></label>
                </div>

                <div className="form-foot">
                  <button className="btn btn-cyan" type="submit" data-magnetic disabled={submitting}>
                    <span>{submitting ? 'Preparing Brief...' : 'Send Brief'}</span>
                    <span className="arr">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5"/>
                      </svg>
                    </span>
                  </button>
                  <p className="form-note">
                    Direct handoff to senior partners. Feasibility and quotes dispatched within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

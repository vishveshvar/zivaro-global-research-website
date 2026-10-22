import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us — Zivaro Global Research';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = `Inquiry: ${formData.service || 'Research Project'} - ${formData.firstName} ${formData.lastName}`;
    const body = [
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Service of Interest: ${formData.service || 'Not specified'}`,
      '',
      'Message / Brief:',
      formData.message,
    ].join('\n');

    // Mailto fallback
    window.location.href = `mailto:sales@zivaroresearch.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="page-contact">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        lead="Whether you are exploring a new market, validating an upcoming product concept, or looking for continuous customer sentiment tracking, our research directors are ready to assist."
        breadcrumb="Contact"
      />

      {/* Main Contact Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: 'clamp(36px, 5vw, 64px)',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Direct Channels & Information */}
            <div>
              <span className="eyebrow">Let's Connect</span>
              <h2 className="t1" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '20px' }}>
                Let's Talk About Your Next Strategic Move
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '36px' }}>
                Reach out to our global analytics practice. We respond promptly with feasibility guidance, methodology options, and timeline forecasts.
              </p>

              {/* Location Card */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  marginBottom: '28px',
                  padding: '20px',
                  background: 'var(--soft)',
                  borderRadius: '16px',
                  border: '1px solid var(--line)',
                }}
              >
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '12px', 
                    background: 'var(--tint)', 
                    display: 'grid', 
                    placeItems: 'center', 
                    color: 'var(--cyan-700)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '4px' }}>
                    Corporate Headquarters
                  </div>
                  <div style={{ fontSize: '0.98rem', color: 'var(--navy)', fontWeight: 600, lineHeight: '1.5' }}>
                    Zivaro Global Research Pvt Ltd<br />
                    <span style={{ fontWeight: 400, color: 'var(--text)' }}>
                      9/4 Rettaimalai Srinivasan Street, Erukkanchery,<br />
                      Moolakadai, Chennai, Tamil Nadu - 600118
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  marginBottom: '28px',
                  padding: '20px',
                  background: 'var(--soft)',
                  borderRadius: '16px',
                  border: '1px solid var(--line)',
                }}
              >
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '12px', 
                    background: 'var(--tint)', 
                    display: 'grid', 
                    placeItems: 'center', 
                    color: 'var(--cyan-700)',
                    flexShrink: 0,
                  }}
                >
                  <Mail style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '4px' }}>
                    Email Channels
                  </div>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <a 
                      href="mailto:sales@zivaroresearch.com" 
                      style={{ fontSize: '0.98rem', color: 'var(--cyan-700)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      sales@zivaroresearch.com
                    </a>
                    <a 
                      href="mailto:official.zivaroresearch@yahoo.com" 
                      style={{ fontSize: '0.92rem', color: 'var(--text)' }}
                    >
                      official.zivaroresearch@yahoo.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  marginBottom: '32px',
                  padding: '20px',
                  background: 'var(--soft)',
                  borderRadius: '16px',
                  border: '1px solid var(--line)',
                }}
              >
                <div 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '12px', 
                    background: 'var(--tint)', 
                    display: 'grid', 
                    placeItems: 'center', 
                    color: 'var(--cyan-700)',
                    flexShrink: 0,
                  }}
                >
                  <Phone style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '4px' }}>
                    Direct Telephone Lines
                  </div>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <a href="tel:+919962341868" style={{ fontSize: '0.98rem', color: 'var(--navy)', fontWeight: 600 }}>
                      +91 99623 41868
                    </a>
                    <a href="tel:+919663292292" style={{ fontSize: '0.98rem', color: 'var(--navy)', fontWeight: 600 }}>
                      +91 96632 92292
                    </a>
                  </div>
                </div>
              </div>

              {/* Swift Response Promise */}
              <div 
                style={{ 
                  padding: '20px', 
                  background: 'var(--tint)', 
                  borderRadius: '16px', 
                  borderLeft: '4px solid var(--cyan-700)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <Clock style={{ width: '20px', height: '20px', color: 'var(--cyan-700)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
                    Swift Response Promise
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    All project requests and RFPs are acknowledged within 24 business hours by an industry analyst.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div>
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '24px', 
                  padding: 'clamp(28px, 4vw, 40px)', 
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h3 style={{ fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '8px' }}>
                  Send an Inquiry
                </h3>
                <p style={{ color: 'var(--text)', fontSize: '0.95rem', marginBottom: '28px' }}>
                  Fill in your details below and our sector specialists will connect with you promptly.
                </p>

                {submitted ? (
                  <div 
                    style={{ 
                      padding: '36px 24px', 
                      textAlign: 'center', 
                      background: 'var(--soft)', 
                      borderRadius: '16px',
                      border: '1px solid var(--line)' 
                    }}
                  >
                    <CheckCircle2 style={{ width: '48px', height: '48px', color: 'var(--cyan-700)', margin: '0 auto 16px' }} />
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '8px' }}>
                      Inquiry Dispatched
                    </h4>
                    <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      Thank you. Your inquiry parameters have been prepared and your email client opened. Our research team will review and respond within 24 business hours.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          service: '',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                      <div>
                        <label 
                          htmlFor="firstName" 
                          style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                        >
                          First Name <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="e.g. John"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--line)',
                            background: 'var(--soft)',
                            fontSize: '0.95rem',
                            color: 'var(--navy)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="lastName" 
                          style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="e.g. Doe"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--line)',
                            background: 'var(--soft)',
                            fontSize: '0.95rem',
                            color: 'var(--navy)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                      <div>
                        <label 
                          htmlFor="email" 
                          style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                        >
                          Email Address <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--line)',
                            background: 'var(--soft)',
                            fontSize: '0.95rem',
                            color: 'var(--navy)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="phone" 
                          style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                        >
                          Phone Number <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99999 99999"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--line)',
                            background: 'var(--soft)',
                            fontSize: '0.95rem',
                            color: 'var(--navy)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label 
                        htmlFor="service" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--line)',
                          background: 'var(--soft)',
                          fontSize: '0.95rem',
                          color: 'var(--navy)',
                          outline: 'none',
                        }}
                      >
                        <option value="">Select a research service...</option>
                        <option value="Market Entry Studies">Market Entry Studies</option>
                        <option value="Brand Awareness & Perception">Brand Awareness &amp; Perception</option>
                        <option value="Consumer & Customer Satisfaction">Consumer &amp; Customer Satisfaction</option>
                        <option value="Product Concept & Usage Testing">Product Concept &amp; Usage Testing</option>
                        <option value="Competitive Intelligence Research">Competitive Intelligence Research</option>
                        <option value="Pricing & Positioning Analysis">Pricing &amp; Positioning Analysis</option>
                        <option value="Data Analytics & Reporting">Data Analytics &amp; Reporting</option>
                        <option value="Tracking & Panel Research">Tracking &amp; Panel Research</option>
                        <option value="Other Bespoke Scope">Other Bespoke Scope</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="message" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Your Message / Brief <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your objectives, target geography, or sample requirements..."
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--line)',
                          background: 'var(--soft)',
                          fontSize: '0.95rem',
                          color: 'var(--navy)',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                      <span className="arr">
                        <Send style={{ width: '16px', height: '16px' }} />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

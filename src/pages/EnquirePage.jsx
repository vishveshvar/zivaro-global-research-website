import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { useRouter } from '../utils/router';
import { gsap, isReducedMotion } from '../utils/gsap';
import { Send, CheckCircle2, UserCheck, Briefcase } from 'lucide-react';

export default function EnquirePage() {
  const [activeTab, setActiveTab] = useState('client'); // 'client' | 'researcher'
  const formCardRef = useRef(null);

  // Client Form State
  const [clientData, setClientData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    service: '',
    industry: '',
    scope: '',
  });
  const [clientSubmitted, setClientSubmitted] = useState(false);

  // Researcher Form State
  const [researcherData, setResearcherData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: 'Female',
    ageGroup: '',
    role: '',
    education: '',
    occupation: '',
    experience: '',
    hasCar: 'Yes',
    hasLicense: 'Yes',
  });
  const [researcherSubmitted, setResearcherSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Enquire & Join — Zivaro Global Research';
  }, []);

  useEffect(() => {
    if (!formCardRef.current || isReducedMotion()) return;
    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeTab]);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResearcherChange = (e) => {
    const { name, value } = e.target;
    setResearcherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    const subject = `Project Enquiry: ${clientData.service || 'Research Project'} - ${clientData.org}`;
    const body = [
      `Primary Contact: ${clientData.name}`,
      `Organization: ${clientData.org}`,
      `Email: ${clientData.email}`,
      `Phone: ${clientData.phone}`,
      `Service: ${clientData.service}`,
      `Sector: ${clientData.industry}`,
      '',
      'Scope Overview:',
      clientData.scope,
    ].join('\n');

    window.location.href = `mailto:sales@zivaroresearch.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setClientSubmitted(true);
  };

  const handleResearcherSubmit = (e) => {
    e.preventDefault();
    const subject = `Panel Application: ${researcherData.role || 'Panelist'} - ${researcherData.firstName} ${researcherData.lastName}`;
    const body = [
      `Name: ${researcherData.firstName} ${researcherData.lastName}`,
      `Email: ${researcherData.email}`,
      `Mobile: ${researcherData.mobile}`,
      `Gender: ${researcherData.gender}`,
      `Age Bracket: ${researcherData.ageGroup}`,
      `Interested Role: ${researcherData.role}`,
      `Education: ${researcherData.education}`,
      `Occupation: ${researcherData.occupation}`,
      `MR Experience: ${researcherData.experience}`,
      `Car Access: ${researcherData.hasCar}`,
      `Driving License: ${researcherData.hasLicense}`,
    ].join('\n');

    window.location.href = `mailto:sales@zivaroresearch.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setResearcherSubmitted(true);
  };

  return (
    <div className="page-enquire">
      <PageHeader
        eyebrow="Intake &amp; Registration"
        title="Enquire With Zivaro Global Research"
        lead="Every successful business decision begins with the right insight. Share your requirements with us or join our growing verified research respondent panel."
        breadcrumb="Enquire &amp; Join"
      />

      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="wrap" style={{ maxWidth: '920px' }}>
          {/* Tab Selector Buttons */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              marginBottom: '36px', 
              borderBottom: '2px solid var(--line)', 
              paddingBottom: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: activeTab === 'client' ? 'var(--cyan-700)' : 'var(--muted)',
                background: activeTab === 'client' ? 'var(--tint)' : 'transparent',
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s',
              }}
            >
              <Briefcase style={{ width: '18px', height: '18px' }} />
              <span>1. Client Project Enquiry</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('researcher')}
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: activeTab === 'researcher' ? 'var(--cyan-700)' : 'var(--muted)',
                background: activeTab === 'researcher' ? 'var(--tint)' : 'transparent',
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s',
              }}
            >
              <UserCheck style={{ width: '18px', height: '18px' }} />
              <span>2. Researcher &amp; Panelist Application</span>
            </button>
          </div>

          {/* Tab 1: Client Project Enquiry */}
          {activeTab === 'client' && (
            <div 
              ref={formCardRef}
              style={{ 
                background: '#FFFFFF', 
                borderRadius: '24px', 
                padding: 'clamp(28px, 4vw, 44px)', 
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h3 style={{ fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '8px' }}>
                Client Project Enquiry
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.96rem', marginBottom: '32px' }}>
                Provide your organizational details below to request a study proposal or custom research quote.
              </p>

              {clientSubmitted ? (
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
                    Project Enquiry Prepared
                  </h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Thank you. Your project brief has been formatted and opened in your email client. A research director will review your requirements within 24 business hours.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setClientSubmitted(false);
                      setClientData({
                        name: '',
                        org: '',
                        email: '',
                        phone: '',
                        service: '',
                        industry: '',
                        scope: '',
                      });
                    }}
                  >
                    Submit Another Project Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleClientSubmit} style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="clientName" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Full Name / Primary Contact <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="clientName"
                        name="name"
                        type="text"
                        required
                        value={clientData.name}
                        onChange={handleClientChange}
                        placeholder="Your name"
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
                        htmlFor="clientOrg" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Organization / Company Name <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="clientOrg"
                        name="org"
                        type="text"
                        required
                        value={clientData.org}
                        onChange={handleClientChange}
                        placeholder="Company Ltd."
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="clientEmail" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Corporate Email Address <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="clientEmail"
                        name="email"
                        type="email"
                        required
                        value={clientData.email}
                        onChange={handleClientChange}
                        placeholder="contact@company.com"
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
                        htmlFor="clientPhone" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Contact Phone Number <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="clientPhone"
                        name="phone"
                        type="tel"
                        required
                        value={clientData.phone}
                        onChange={handleClientChange}
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="clientService" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Core Service Needed <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="clientService"
                        name="service"
                        required
                        value={clientData.service}
                        onChange={handleClientChange}
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
                        <option value="">Select a service...</option>
                        <option value="Market Entry Studies">Market Entry Studies</option>
                        <option value="Brand Awareness & Perception">Brand Awareness &amp; Perception Analysis</option>
                        <option value="Consumer & Customer Satisfaction">Consumer &amp; Customer Satisfaction Surveys</option>
                        <option value="Product Concept & Usage Testing">Product Concept &amp; Usage Testing</option>
                        <option value="Competitive Intelligence Research">Competitive Intelligence Research</option>
                        <option value="Pricing & Positioning Analysis">Pricing &amp; Positioning Analysis</option>
                        <option value="Data Analytics & Reporting">Data Analytics &amp; Reporting</option>
                        <option value="Tracking & Panel Research">Tracking &amp; Panel Research</option>
                        <option value="Custom Scope">Custom Multiphase Scope</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="clientIndustry" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Target Sector / Industry <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="clientIndustry"
                        name="industry"
                        required
                        value={clientData.industry}
                        onChange={handleClientChange}
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
                        <option value="">Select industry vertical...</option>
                        <option value="Banking & Finance">Banking &amp; Finance</option>
                        <option value="FMCG & Retail">FMCG &amp; Retail</option>
                        <option value="Technology & Telecom">Technology &amp; Telecom</option>
                        <option value="Healthcare & Pharma">Healthcare &amp; Pharmaceuticals</option>
                        <option value="Automobiles">Automobiles &amp; Mobility</option>
                        <option value="Education & E-Learning">Education &amp; E-Learning</option>
                        <option value="Media & Entertainment">Media &amp; Entertainment</option>
                        <option value="Energy & Utilities">Energy &amp; Utilities</option>
                        <option value="Travel & Hospitality">Travel &amp; Hospitality</option>
                        <option value="Cosmetics & Luxury">Cosmetics &amp; Luxury Goods</option>
                        <option value="Other">Other Sector</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="clientScope" 
                      style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                    >
                      Project Objectives &amp; Scope Overview <span style={{ color: '#E11D48' }}>*</span>
                    </label>
                    <textarea
                      id="clientScope"
                      name="scope"
                      rows={4}
                      required
                      value={clientData.scope}
                      onChange={handleClientChange}
                      placeholder="Describe the business decisions this research will inform, target geography, timeline, or specific methodology preferences..."
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
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Submit Project Enquiry</span>
                    <span className="arr">
                      <Send style={{ width: '16px', height: '16px' }} />
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Tab 2: Researcher & Panelist Application */}
          {activeTab === 'researcher' && (
            <div 
              ref={formCardRef}
              style={{ 
                background: '#FFFFFF', 
                borderRadius: '24px', 
                padding: 'clamp(28px, 4vw, 44px)', 
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h3 style={{ fontSize: '1.6rem', color: 'var(--navy)', marginBottom: '8px' }}>
                Researcher &amp; Panelist Registration
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.96rem', marginBottom: '32px' }}>
                Participation in our market research projects is voluntary, and eligible participants are fairly compensated for their contributions.
              </p>

              {researcherSubmitted ? (
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
                    Application Submitted
                  </h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Thank you for applying to join our research respondent &amp; field network. Your details have been dispatched to our panel operations team for profile matching.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setResearcherSubmitted(false);
                      setResearcherData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobile: '',
                        gender: 'Female',
                        ageGroup: '',
                        role: '',
                        education: '',
                        occupation: '',
                        experience: '',
                        hasCar: 'Yes',
                        hasLicense: 'Yes',
                      });
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResearcherSubmit} style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="rFirstName" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        First Name <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="rFirstName"
                        name="firstName"
                        type="text"
                        required
                        value={researcherData.firstName}
                        onChange={handleResearcherChange}
                        placeholder="First name"
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
                        htmlFor="rLastName" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Last Name <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="rLastName"
                        name="lastName"
                        type="text"
                        required
                        value={researcherData.lastName}
                        onChange={handleResearcherChange}
                        placeholder="Last name"
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="rEmail" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Email Address <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="rEmail"
                        name="email"
                        type="email"
                        required
                        value={researcherData.email}
                        onChange={handleResearcherChange}
                        placeholder="your.email@example.com"
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
                        htmlFor="rMobile" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Mobile Number <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        id="rMobile"
                        name="mobile"
                        type="tel"
                        required
                        value={researcherData.mobile}
                        onChange={handleResearcherChange}
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>
                        Gender <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        {['Female', 'Male', 'Other'].map((g) => (
                          <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', color: 'var(--text)', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={researcherData.gender === g}
                              onChange={handleResearcherChange}
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label 
                        htmlFor="rAgeGroup" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Age Group <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="rAgeGroup"
                        name="ageGroup"
                        required
                        value={researcherData.ageGroup}
                        onChange={handleResearcherChange}
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
                        <option value="">Select Age Bracket...</option>
                        <option value="18-22">18 - 22 Years</option>
                        <option value="23-30">23 - 30 Years</option>
                        <option value="31-40">31 - 40 Years</option>
                        <option value="40+">40 Years &amp; Above</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="rInterest" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Interested Role <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="rInterest"
                        name="role"
                        required
                        value={researcherData.role}
                        onChange={handleResearcherChange}
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
                        <option value="">Select Role...</option>
                        <option value="Field Researcher">Field Researcher</option>
                        <option value="Interviewer">Interviewer</option>
                        <option value="Mystery Shopper">Mystery Shopper</option>
                        <option value="Survey Respondent">Survey Respondent</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="rEducation" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Education Level <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="rEducation"
                        name="education"
                        required
                        value={researcherData.education}
                        onChange={handleResearcherChange}
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
                        <option value="">Select Education...</option>
                        <option value="School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Masters">Masters / Post Graduate</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label 
                        htmlFor="rOccupation" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Occupation <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="rOccupation"
                        name="occupation"
                        required
                        value={researcherData.occupation}
                        onChange={handleResearcherChange}
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
                        <option value="">Select Current Occupation...</option>
                        <option value="Student">Student</option>
                        <option value="Homemaker">Homemaker</option>
                        <option value="IT / Software">IT / Software</option>
                        <option value="Sales / Marketing">Sales / Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Teaching / Academia">Teaching / Academia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="rExperience" 
                        style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}
                      >
                        Experience in Market Research <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <select
                        id="rExperience"
                        name="experience"
                        required
                        value={researcherData.experience}
                        onChange={handleResearcherChange}
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
                        <option value="">Select Experience Level...</option>
                        <option value="New">New to Market Research</option>
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="3-4 Years">3 - 4 Years</option>
                        <option value="5-7 Years">5 - 7 Years</option>
                        <option value="7-10 Years">7 - 10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>
                        Do you own or have access to a car?
                      </label>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        {['Yes', 'No'].map((c) => (
                          <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', color: 'var(--text)', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="hasCar"
                              value={c}
                              checked={researcherData.hasCar === c}
                              onChange={handleResearcherChange}
                            />
                            <span>{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>
                        Do you possess a valid driving license?
                      </label>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        {['Yes', 'No'].map((lic) => (
                          <label key={lic} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', color: 'var(--text)', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="hasLicense"
                              value={lic}
                              checked={researcherData.hasLicense === lic}
                              onChange={handleResearcherChange}
                            />
                            <span>{lic}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Submit Panel Application</span>
                    <span className="arr">
                      <Send style={{ width: '16px', height: '16px' }} />
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

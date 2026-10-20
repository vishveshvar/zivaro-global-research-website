import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

export default function Leadership() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Reveal wipes on founder portraits
      gsap.utils.toArray('[data-wipe]').forEach((el) => {
        const img = el.querySelector('img');
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.25,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.22 },
            {
              scale: 1,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });

      // Reveal text
      gsap.fromTo(
        '.person-body',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.people',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="leadership" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow" data-reveal>Executive Leadership</span>
            <h2 className="t1">Founder-led, on every engagement.</h2>
          </div>
          <p className="lead">
            Two co-founders, dual strategic hubs in Bengaluru and Dubai, and one operating standard: senior director involvement on every study from inception to executive readout.
          </p>
        </div>

        <div className="people">
          {/* Anil V B */}
          <article className="person">
            <div className="img" data-wipe>
              <img
                src="./assets/img/founder-anil.jpg"
                alt="Anil V B, Co-Founder and Director"
                width="800"
                height="800"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = './assests/founder-anil.jpg';
                }}
              />
            </div>
            <div className="person-body">
              <h3>Anil V B</h3>
              <p className="role">Co-Founder &amp; Director · Bengaluru</p>
              <p>
                Leads global client partnerships, strategic accounts, and fieldwork operations across B2B, consumer markets, and healthcare.
              </p>
              <p className="prev">
                <b>Previously</b> Borderless Access · Market Xcel · Greenland Market Research
              </p>
            </div>
          </article>

          {/* Manzoor Rahman */}
          <article className="person">
            <div className="img" data-wipe>
              <img
                src="./assets/img/founder-manzoor.jpg"
                alt="Manzoor Rahman, Co-Founder and Director"
                width="400"
                height="400"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = './assests/founder-manzoor.jpg';
                }}
              />
            </div>
            <div className="person-body">
              <h3>Manzoor Rahman</h3>
              <p className="role">Co-Founder &amp; Director · Dubai</p>
              <p>
                Healthcare and life sciences specialist. Spearheads multi-country intelligence programs across MENA, Europe, North America, and APAC.
              </p>
              <p className="prev">
                <b>Previously</b> Krea · Market Xcel · Greenland Market Research · CSS Corp
              </p>
            </div>
          </article>
        </div>

        <p className="lead-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6zM9 12l2 2 4-4"/>
          </svg>
          Senior-level involvement is guaranteed on every project.
        </p>
      </div>
    </section>
  );
}

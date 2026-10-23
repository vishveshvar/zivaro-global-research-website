import React, { useEffect, useRef } from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { gsap, ScrollTrigger, isReducedMotion } from '../utils/gsap';

const TESTIMONIALS = [
  {
    quote:
      "Zivaro Global Research helped us decode complex market trends with unmatched clarity. Their analytical depth and practical recommendations guided our expansion strategy across three new regions.",
    name: "Rahul Menon",
    title: "Strategy Head, IntegroTech Pvt. Ltd.",
    initials: "RM",
  },
  {
    quote:
      "We've worked with multiple research partners, but Zivaro stands out for their quality and responsiveness. Their consumer study reshaped our product positioning and helped achieve a 20% increase in market penetration.",
    name: "Priya Nair",
    title: "Brand Manager, FreshEdge Foods",
    initials: "PN",
  },
  {
    quote:
      "The Zivaro team's understanding of healthcare research is exceptional. Their data accuracy and ethical approach gave us clear visibility into patient and doctor sentiment, refining our launch communication.",
    name: "Dr. Karthik Raj",
    title: "Senior Marketing Analyst, MedVita Lifesciences",
    initials: "KR",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduce = isReducedMotion();
    if (reduce) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Slow, staggered reveal for Eyebrow -> Heading -> Description (~200ms stagger)
      gsap.fromTo(
        '.testimonial-reveal-item',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // 2. Gentle entrance for the moving cards track
      gsap.fromTo(
        '.testimonials-track-wrap',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.45,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="section section-testimonials"
      id="testimonials"
      ref={sectionRef}
      style={{
        background: '#F7F9FC',
        position: 'relative',
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
        overflow: 'hidden',
      }}
    >
      {/* Scoped CSS for seamless marquee loop and reduced motion */}
      <style>{`
        @keyframes infinite-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 1rem));
          }
        }
        .infinite-marquee-scroll {
          animation: infinite-marquee var(--animation-duration, 52s) var(--animation-direction, reverse) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .infinite-marquee-scroll {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="wrap">
        {/* Section Header with Staggered Entrance */}
        <div
          className="section-head"
          style={{
            textAlign: 'center',
            margin: '0 auto clamp(36px, 4.5vw, 56px)',
            maxWidth: '720px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            className="eyebrow testimonial-reveal-item"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            CLIENT TESTIMONIALS
          </span>

          <h2
            className="t1 testimonial-reveal-item"
            style={{
              marginTop: '12px',
              color: '#071B33',
              letterSpacing: '-0.025em',
            }}
          >
            What Our Clients Say
          </h2>

          <p
            className="lead testimonial-reveal-item"
            style={{
              marginTop: '16px',
              color: '#4F5B6B',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.6,
            }}
          >
            Trusted by organizations worldwide for reliable insights, strategic clarity, and measurable business growth.
          </p>
        </div>
      </div>

      {/* Infinite Moving Cards Marquee */}
      <div className="testimonials-track-wrap w-full">
        <InfiniteMovingCards items={TESTIMONIALS} direction="right" speed="slow" />
      </div>
    </section>
  );
}

import { gsap, isReducedMotion, isFinePointer } from './gsap';

/**
 * Handle mouse movement over a card for pointer-tracking border light and subtle 3D tilt.
 */
export function handleCardMouseMove(e) {
  if (isReducedMotion() || !isFinePointer()) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty('--mx', `${x.toFixed(1)}px`);
  card.style.setProperty('--my', `${y.toFixed(1)}px`);
  card.style.setProperty('--glow-opacity', '1');

  // Subtle 3D tilt calculation based on card center
  const px = x / rect.width - 0.5;
  const py = y / rect.height - 0.5;

  const tiltY = px * 5;  // max +/- 2.5 deg
  const tiltX = -py * 4; // max +/- 2.0 deg

  gsap.to(card, {
    rotationY: tiltY,
    rotationX: tiltX,
    y: -6,
    duration: 0.28,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

/**
 * Handle mouse entering a card: set perspective, elevate card, activate glow and micro-interactions.
 */
export function handleCardMouseEnter(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty('--mx', `${x.toFixed(1)}px`);
  card.style.setProperty('--my', `${y.toFixed(1)}px`);
  card.style.setProperty('--glow-opacity', '1');

  if (isReducedMotion() || !isFinePointer()) {
    gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    return;
  }

  gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
  gsap.to(card, {
    y: -6,
    duration: 0.35,
    ease: 'power2.out',
    overwrite: 'auto',
  });

  // Micro-interaction on card icon
  const icon = card.querySelector('.service-icon-wrap, .pillar-icon');
  if (icon) {
    gsap.to(icon, { scale: 1.12, y: -2, duration: 0.35, ease: 'back.out(1.6)', overwrite: 'auto' });
  }

  // Micro-interaction on card image
  const img = card.querySelector('.work-card-img, .industry-card-img');
  if (img) {
    gsap.to(img, { scale: 1.05, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  }

  // Micro-interaction on arrow indicator
  const arr = card.querySelector('.arr');
  if (arr) {
    gsap.to(arr, { x: 5, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
  }
}

/**
 * Handle mouse leaving a card: smoothly reset tilt, position, glow, and micro-interactions.
 */
export function handleCardMouseLeave(e) {
  const card = e.currentTarget;
  card.style.setProperty('--glow-opacity', '0');

  gsap.to(card, {
    rotationX: 0,
    rotationY: 0,
    y: 0,
    duration: 0.45,
    ease: 'power2.out',
    overwrite: 'auto',
  });

  const icon = card.querySelector('.service-icon-wrap, .pillar-icon');
  if (icon) {
    gsap.to(icon, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }

  const img = card.querySelector('.work-card-img, .industry-card-img');
  if (img) {
    gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  }

  const arr = card.querySelector('.arr');
  if (arr) {
    gsap.to(arr, { x: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  }
}

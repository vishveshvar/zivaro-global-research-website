import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isFinePointer = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

export { gsap, ScrollTrigger, Draggable };

import { gsap } from 'gsap';

interface FloatingAnimationOptions {
  xRange?: number;
  yRange?: number;
  rotationRange?: number;
  scaleRange?: number;
  duration?: number;
  ease?: string;
  delay?: number; // Add delay property
}

export function createFloatingAnimation(element: HTMLElement, options: FloatingAnimationOptions = {}) {
  const defaults: Required<FloatingAnimationOptions> = { // Ensure all defaults are present
    xRange: 20,
    yRange: 15,
    rotationRange: 10,
    scaleRange: 0.05,
    duration: 5,
    ease: "sine.inOut",
    delay: 0, // Ensure delay is also defaulted
  };
  const settings = { ...defaults, ...options };

  // Create a timeline for the floating animation
  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  // Animate to random end points
  tl.to(element, {
    x: `+=${Math.random() * settings.xRange * 2 - settings.xRange}`,
    y: `+=${Math.random() * settings.yRange * 2 - settings.yRange}`,
    rotation: `+=${Math.random() * settings.rotationRange * 2 - settings.rotationRange}`,
    scale: 1 + Math.random() * settings.scaleRange * 2 - settings.scaleRange,
    duration: settings.duration,
    ease: settings.ease
  });

  return tl;
}

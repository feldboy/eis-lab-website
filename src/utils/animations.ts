import { gsap } from 'gsap';

interface FloatingAnimationOptions {
  xRange?: number;
  yRange?: number;
  rotationRange?: number;
  scaleRange?: number;
  duration?: number;
  ease?: string;
  delay?: number;
}

export function createFloatingAnimation(element: HTMLElement, options: FloatingAnimationOptions = {}) {
  const defaults: Required<FloatingAnimationOptions> = {
    xRange: 15, // Reduced from 20 for smoother performance
    yRange: 10, // Reduced from 15 for smoother performance
    rotationRange: 8, // Reduced from 10 for smoother performance
    scaleRange: 0.03, // Reduced from 0.05 for smoother performance
    duration: 6, // Increased from 5 for smoother motion
    ease: "sine.inOut",
    delay: 0,
  };
  const settings = { ...defaults, ...options };

  // Performance optimizations
  gsap.set(element, {
    force3D: true,
    backfaceVisibility: 'hidden',
    willChange: 'transform'
  });

  // Create optimized timeline for floating animation
  const tl = gsap.timeline({ 
    repeat: -1, 
    yoyo: true,
    ease: settings.ease
  });

  // Use relative values for better performance
  tl.to(element, {
    x: `+=${Math.random() * settings.xRange * 2 - settings.xRange}`,
    y: `+=${Math.random() * settings.yRange * 2 - settings.yRange}`,
    rotation: `+=${Math.random() * settings.rotationRange * 2 - settings.rotationRange}`,
    scale: 1 + Math.random() * settings.scaleRange * 2 - settings.scaleRange,
    duration: settings.duration,
    ease: settings.ease,
    force3D: true, // Force GPU acceleration
    transformOrigin: "center center"
  });

  return tl;
}

// New utility for batch animations to improve performance
export function createBatchAnimation(elements: HTMLElement[], animation: any, staggerOptions: any = {}) {
  const defaults = {
    amount: 0.1,
    from: "start",
    ease: "power2.out"
  };
  const settings = { ...defaults, ...staggerOptions };

  return gsap.to(elements, {
    ...animation,
    stagger: settings,
    force3D: true,
    ease: animation.ease || settings.ease
  });
}

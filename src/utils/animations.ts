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
  // Check if we're on the client side
  if (typeof window === 'undefined' || !element) return null;
  
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
export function createBatchAnimation(
  elements: HTMLElement[], 
  animation: Record<string, unknown>, 
  staggerOptions: Record<string, unknown> = {}
) {
  const defaults = {
    amount: 0.1,
    from: "start" as const,
    ease: "power2.out"
  };
  const settings = { ...defaults, ...staggerOptions };

  return gsap.to(elements, {
    ...animation,
    stagger: settings,
    force3D: true,
    ease: (animation.ease as string) || settings.ease
  });
}

// Page transition animations for Framer Motion
export const pageTransitions = {
  fadeSlide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  },
  
  rotate: {
    initial: { opacity: 0, rotateX: -15 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 15 },
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
  }
};

// Text animation utilities
interface TextRevealOptions {
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
}

export function createTextRevealAnimation(element: HTMLElement, options: TextRevealOptions = {}) {
  const defaults = {
    duration: 1,
    ease: "power2.out",
    stagger: 0.05,
    delay: 0
  };
  const settings = { ...defaults, ...options };

  // Split text into characters/words (manual implementation)
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words.map(word => 
    `<span class="word">${word.split('').map(char => 
      `<span class="char">${char}</span>`
    ).join('')}</span>`
  ).join(' ');

  const chars = element.querySelectorAll('.char');
  
  gsap.fromTo(chars, 
    { 
      opacity: 0, 
      y: 50,
      rotationX: -90
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: settings.duration,
      ease: settings.ease,
      stagger: settings.stagger,
      delay: settings.delay,
      transformOrigin: "center bottom"
    }
  );

  return gsap.timeline();
}

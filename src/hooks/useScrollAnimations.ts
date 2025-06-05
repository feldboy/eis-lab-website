import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSmoothReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up', distance: number = 50) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const element = ref.current;
    const fromVars: Record<string, number | string> = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    gsap.fromTo(element, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, distance]);

  return ref;
}

export function useParallaxScroll(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const element = ref.current;

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
}

interface AnimationProps {
  from?: Record<string, number | string>;
  to?: Record<string, number | string>;
  duration?: number;
  stagger?: number;
}

interface ScrollTriggerOptions {
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean;
  [key: string]: unknown;
}

export function useBatchScrollAnimation(
  selectors: string | string[], 
  animationProps: AnimationProps = {}, 
  scrollTriggerOptions: ScrollTriggerOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
    const elements = container.querySelectorAll(selectorArray.join(', '));
    
    const fromProps = animationProps.from || { opacity: 0, y: 50 };
    const toProps = animationProps.to || { opacity: 1, y: 0 };
    
    gsap.fromTo(elements, fromProps, {
      ...toProps,
      duration: animationProps.duration || 0.6,
      stagger: animationProps.stagger || 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...scrollTriggerOptions
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [selectors, animationProps, scrollTriggerOptions]);

  return containerRef;
}
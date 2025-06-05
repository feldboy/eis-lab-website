'use client';

import React, { useEffect, useRef } from 'react';

// Locomotive Scroll integration
interface LocomotiveScrollOptions {
  smooth?: boolean;
  multiplier?: number;
  class?: string;
  [key: string]: unknown;
}

interface LocomotiveScrollWrapperProps {
  children: React.ReactNode;
  options?: LocomotiveScrollOptions;
}

const LocomotiveScrollWrapper: React.FC<LocomotiveScrollWrapperProps> = ({ 
  children, 
  options = {} 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locomotiveScrollRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const initLocomotiveScroll = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        locomotiveScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current || undefined,
          smooth: true,
          multiplier: 1,
          class: 'is-reveal',
          ...options,
        });
      } catch (error) {
        console.warn('Locomotive Scroll failed to initialize:', error);
      }
    };

    initLocomotiveScroll();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [options]);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default LocomotiveScrollWrapper;

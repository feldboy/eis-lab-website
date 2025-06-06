'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { createFloatingAnimation } from '../utils/animations';

interface FloatingElementProps {
  $size?: string;
  $color?: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $zIndex?: number;
}

const FloatingElement = styled.div<FloatingElementProps>`
  position: absolute;
  width: ${props => props.$size || '60px'};
  height: ${props => props.$size || '60px'};
  border-radius: 50%;
  background-color: ${props => props.$color || 'var(--color-salmon-pink)'};
  top: ${props => props.$top || 'auto'};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  bottom: ${props => props.$bottom || 'auto'};
  z-index: ${props => props.$zIndex || -1};
  opacity: 0.8;
  filter: blur(0.5px);
  will-change: transform;
  pointer-events: none;

  /* Ice cream scoop gradient effects */
  &.scoop-vanilla {
    background: linear-gradient(135deg, #FFF8DC 0%, #F5F5DC 100%);
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
  }

  &.scoop-strawberry {
    background: linear-gradient(135deg, var(--color-salmon-pink) 0%, #FFB6C1 100%);
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
  }

  &.scoop-chocolate {
    background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
  }

  &.scoop-mint {
    background: linear-gradient(135deg, #98FB98 0%, #90EE90 100%);
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    width: ${props => props.$size ? `calc(${props.$size} * 0.7)` : '42px'};
    height: ${props => props.$size ? `calc(${props.$size} * 0.7)` : '42px'};
  }

  @media (max-width: 480px) {
    width: ${props => props.$size ? `calc(${props.$size} * 0.5)` : '30px'};
    height: ${props => props.$size ? `calc(${props.$size} * 0.5)` : '30px'};
  }
`;

const FloatingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ count = 8, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [elementData, setElementData] = useState<Array<{
    position: { top: string; left: string };
    scoopType: string;
    size: string;
    zIndex: number;
  }>>([]);

  const scoopTypes = useMemo(() => 
    ['scoop-vanilla', 'scoop-strawberry', 'scoop-chocolate', 'scoop-mint'], 
    []
  );

  useEffect(() => {
    setIsClient(true);
    
    // Generate deterministic random-like values based on index
    const generateDeterministicData = (index: number) => {
      // Simple pseudo-random generator using index
      const seed = index * 2654435761;
      const rand1 = ((seed >>> 0) % 1000) / 1000;
      const rand2 = (((seed * 16807) >>> 0) % 1000) / 1000;
      const rand3 = (((seed * 48271) >>> 0) % 1000) / 1000;
      const rand4 = (((seed * 69621) >>> 0) % 1000) / 1000;
      
      return {
        position: {
          top: `${rand1 * 80 + 10}%`,
          left: `${rand2 * 80 + 10}%`,
        },
        scoopType: scoopTypes[index % scoopTypes.length],
        size: `${40 + rand3 * 40}px`,
        zIndex: Math.floor(rand4 * 3) - 1, // Changed to range from -1 to 1
      };
    };
    
    // Generate element data once on client
    const data = Array.from({ length: count }, (_, index) => 
      generateDeterministicData(index)
    );
    setElementData(data);
  }, [count, scoopTypes]);

  useEffect(() => {
    if (!isClient) return;
    
    const elements = elementsRef.current;
    elements.forEach((element) => {
      if (element) {
        createFloatingAnimation(element, {
          xRange: 25,
          yRange: 20,
          rotationRange: 15,
          scaleRange: 0.1,
          duration: 8 + (element.dataset.index ? parseInt(element.dataset.index) * 0.1 : 0), // Deterministic duration
          delay: element.dataset.index ? parseInt(element.dataset.index) * 0.2 : 0, // Deterministic delay
        });
      }
    });

    // Add scroll-based fade out animation
    import('gsap').then(({ gsap }) => {
      import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "+=300px",
              scrub: 1,
            }
          });
        }
      });
    });

    // Cleanup function
    return () => {
      elements.forEach(element => {
        if (element) {
          // Kill all GSAP animations on this element
          import('gsap').then(({ gsap }) => {
            gsap.killTweensOf(element);
          });
        }
      });
    };
  }, [isClient, elementData]);

  // Don't render anything until client-side
  if (!isClient) {
    return <FloatingContainer ref={containerRef} className={className} />;
  }

  return (
    <FloatingContainer ref={containerRef} className={className}>
      {elementData.map((data, index) => (
        <FloatingElement
          key={index}
          ref={(el) => {
            if (el) {
              elementsRef.current[index] = el;
              el.dataset.index = index.toString();
            }
          }}
          className={data.scoopType}
          $size={data.size}
          $top={data.position.top}
          $left={data.position.left}
          $zIndex={data.zIndex}
        />
      ))}
    </FloatingContainer>
  );
};

export default FloatingElements;
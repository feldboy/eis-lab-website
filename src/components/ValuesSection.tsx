'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ValuesContainer = styled.section`
  padding: 6rem 2rem;
  background: var(--color-white);
  position: relative;
  overflow: hidden;
`;

const ValueSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 4rem;

  &:nth-child(even) {
    background: var(--gradient-primary);
    color: var(--color-white);
    border-radius: 50px;
    margin: 4rem 0;
    padding: 4rem 2rem;
  }

  &:nth-child(odd) {
    background: var(--color-white);
    color: var(--color-navy);
  }
`;

const CurvedTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  max-width: 800px;
  line-height: 1.1;
  position: relative;
  /* Performance optimizations */
  will-change: transform;
  backface-visibility: hidden;

  .curved-text {
    display: block;
    transform-origin: center;
    /* Use CSS animations for simpler effects */
    animation: subtle-curve 8s ease-in-out infinite;
    will-change: transform;
    backface-visibility: hidden;
  }

  @keyframes subtle-curve {
    0%, 100% { 
      transform: perspective(600px) rotateX(0deg) translateZ(0); 
    }
    50% { 
      transform: perspective(600px) rotateX(3deg) translateZ(0); 
    }
  }
`;

const FloatingIceCreamIcon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: 20%;
  right: 15%;
  /* Use CSS animations for better performance */
  animation: float-gentle 6s ease-in-out infinite;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0); /* Force hardware acceleration */

  &.strawberry { background: var(--color-salmon-pink); }
  &.vanilla { background: var(--color-yellow); }
  &.mint { background: #90EE90; }
  &.chocolate { background: #8B4513; }

  @keyframes float-gentle {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) translateZ(0); 
    }
    50% { 
      transform: translateY(-12px) rotate(8deg) translateZ(0); 
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    right: 10%;
  }
`;

const AboutButton = styled.button`
  background: var(--color-white);
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  padding: 1rem 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background: var(--color-navy);
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  &.white-version {
    background: transparent;
    color: var(--color-white);
    border-color: var(--color-white);

    &:hover {
      background: var(--color-white);
      color: var(--color-navy);
    }
  }
`;

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use batch processing for better performance
      ScrollTrigger.batch('.value-section', {
        onEnter: (elements) => {
          elements.forEach((section) => {
            const tl = gsap.timeline();
            
            // Optimize by setting initial states
            const title = section.querySelector('.curved-title');
            const icon = section.querySelector('.floating-icon');
            const button = section.querySelector('.about-btn');
            
            if (title) {
              gsap.set(title, { opacity: 0, y: 80 });
              tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                force3D: true
              });
            }

            if (icon) {
              gsap.set(icon, { opacity: 0, scale: 0 });
              tl.to(icon, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.4)',
                force3D: true
              }, "-=0.6");
            }

            if (button) {
              gsap.set(button, { opacity: 0, y: 20 });
              tl.to(button, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                force3D: true
              }, "-=0.4");
            }
          });
        },
        start: 'top 85%',
        end: 'bottom 15%',
        once: true // Only trigger once for better performance
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ValuesContainer ref={sectionRef}>
      {/* Section 1: How Ice Cream Should Be Today */}
      <ValueSection className="value-section">
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <CurvedTitle className="curved-title">
            <span className="curved-text">HOW ICE CREAM</span>
            <span className="curved-text">SHOULD BE TODAY</span>
          </CurvedTitle>
          <FloatingIceCreamIcon className="floating-icon vanilla" />
        </div>
      </ValueSection>

      {/* Section 2: Production is Environmentally Friendly */}
      <ValueSection className="value-section">
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <CurvedTitle className="curved-title">
            <span className="curved-text">OUR PRODUCTION IS</span>
            <span className="curved-text">ENVIRONMENTALLY FRIENDLY</span>
          </CurvedTitle>
          <FloatingIceCreamIcon className="floating-icon mint" />
          <AboutButton className="about-btn white-version">ABOUT US</AboutButton>
        </div>
      </ValueSection>

      {/* Section 3: High Quality Ingredients */}
      <ValueSection className="value-section">
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <CurvedTitle className="curved-title">
            <span className="curved-text">EVERY CUP IS MADE FROM</span>
            <span className="curved-text">HIGH-QUALITY INGREDIENTS</span>
          </CurvedTitle>
          <FloatingIceCreamIcon className="floating-icon chocolate" />
        </div>
      </ValueSection>

      {/* Section 4: A Delight for Everyone */}
      <ValueSection className="value-section">
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <CurvedTitle className="curved-title">
            <span className="curved-text">A DELIGHT</span>
            <span className="curved-text">FOR EVERYONE</span>
          </CurvedTitle>
          <FloatingIceCreamIcon className="floating-icon strawberry" />
          <AboutButton className="about-btn">ABOUT US</AboutButton>
        </div>
      </ValueSection>
    </ValuesContainer>
  );
}

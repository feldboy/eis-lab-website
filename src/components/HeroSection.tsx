'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { createFloatingAnimation } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-white);
  color: var(--color-navy);
  padding: 2rem;
  overflow: hidden;
  position: relative;
  margin-top: 80px; /* Account for fixed header */
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
  
  &.floating-1 {
    width: 120px;
    height: 120px;
    background-color: var(--color-salmon-pink);
    top: 20%;
    right: 15%;
  }
  
  &.floating-2 {
    width: 80px;
    height: 80px;
    background-color: var(--color-yellow);
    bottom: 30%;
    left: 10%;
  }
`;

const PinkCircle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: var(--color-salmon-pink);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateX(150px);
  opacity: 0.9;
  z-index: 1;
`;

const ProductImage = styled.div`
  position: absolute;
  width: 150px;
  height: 200px;
  background: linear-gradient(45deg, var(--color-light-blue), var(--color-salmon-pink));
  border-radius: 15px;
  opacity: 0.8;
  
  &.product-1 {
    top: 15%;
    left: 5%;
    transform: rotate(-15deg);
  }
  
  &.product-2 {
    bottom: 20%;
    right: 5%;
    transform: rotate(10deg);
  }
  
  &.product-3 {
    top: 60%;
    right: 20%;
    transform: rotate(-5deg);
    background: linear-gradient(45deg, var(--color-yellow), var(--color-purple));
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  margin-bottom: 2rem;
  color: var(--color-navy);
  text-align: center;
  max-width: 1000px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: var(--color-navy);
  max-width: 600px;
  line-height: 1.6;
`;

const CallToAction = styled.button`
  background-color: var(--color-salmon-pink);
  color: var(--color-white);
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6675a; /* Darker salmon pink */
  }
`;

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floating1Ref = useRef<HTMLDivElement>(null);
  const floating2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial fade-in animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
    );
    gsap.fromTo(buttonRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
    );

    // Floating elements animation using the utility function
    if (floating1Ref.current) {
      createFloatingAnimation(floating1Ref.current, {
        xRange: 200,
        yRange: 100,
        rotationRange: 360,
        scaleRange: 0.2,
        duration: 10,
      });
    }
    if (floating2Ref.current) {
      createFloatingAnimation(floating2Ref.current, {
        xRange: 200,
        yRange: 100,
        rotationRange: 360,
        scaleRange: 0.2,
        duration: 12,
        delay: 1, // Add a slight delay for variation
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <HeroContainer ref={containerRef}>
      {/* Product Images */}
      <ProductImage className="product-1" />
      <ProductImage className="product-2" />
      <ProductImage className="product-3" />
      
      {/* Pink Circle Element */}
      <PinkCircle />
      
      {/* Floating Elements */}
      <FloatingElement ref={floating1Ref} className="floating-1" />
      <FloatingElement ref={floating2Ref} className="floating-2" />
      
      <HeroTitle ref={titleRef}>
        BECOME PART<br />
        OF THE<br />
        EISLAB FAMILY
      </HeroTitle>
      <HeroSubtitle ref={subtitleRef}>
        You want to open your own ice cream shop and rely on an innovative, proven concept? Become part of a brand that redefines ice cream and delights customers.
      </HeroSubtitle>
      <CallToAction ref={buttonRef}>Join Now</CallToAction>
    </HeroContainer>
  );
};

export default HeroSection;

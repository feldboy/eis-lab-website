'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-white) 0%, #f8f9ff 100%);
  color: var(--color-navy);
  position: relative;
  overflow: hidden;
  padding: 0;
  /* Performance optimizations */
  will-change: auto;
  contain: layout style paint;
  transform: translateZ(0); /* Force hardware acceleration */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
`;

const TextContent = styled.div`
  z-index: 2;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 2rem;
    text-align: center;
  }
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  margin: 0 0 2rem 0;
  color: var(--color-navy);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

  span {
    display: block;
    
    &.highlight {
      color: var(--color-primary-purple);
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: var(--color-navy);
  opacity: 0.8;
  max-width: 500px;
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, var(--color-primary-purple), var(--color-secondary-purple));
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  max-width: 200px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
    background: linear-gradient(135deg, var(--color-secondary-purple), var(--color-primary-purple));
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-image: url('/ice-cream-hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 968px) {
    height: 50vh;
    order: -1;
  }
`;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for better performance
      const tl = gsap.timeline();
      
      // Set initial states for better performance
      gsap.set('.hero-title', { opacity: 0, y: 100 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 50 });
      gsap.set('.hero-image', { opacity: 0, scale: 1.1 });
      gsap.set('.hero-button', { opacity: 0, y: 30 });

      // Optimized entrance animation with reduced calculations
      tl.to('.hero-title', {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power2.out',
        force3D: true
      })
      .to('.hero-subtitle', {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        force3D: true
      }, "-=0.6")
      .to('.hero-button', {
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power2.out',
        force3D: true
      }, "-=0.4")
      .to('.hero-image', {
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: 'power2.out',
        force3D: true
      }, "-=0.8");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      <ContentWrapper>
        <TextContent>
          <MainTitle className="hero-title">
            <span>WHERE EVERY</span>
            <span className="highlight">SPOON 🥄 IS</span>
            <span>A JOYFUL</span>
            <span className="highlight">JOURNEY</span>
          </MainTitle>
          <Subtitle className="hero-subtitle">
            EISLAB - an unparalleled ice cream experience. 
            Always sustainable, always premium. Follow us 
            on social media to learn more!
          </Subtitle>
          <ContactButton className="hero-button" onClick={scrollToContact}>
            Contact Us
          </ContactButton>
        </TextContent>

        <ImageSection className="hero-image" />
      </ContentWrapper>
    </HeroContainer>
  );
}

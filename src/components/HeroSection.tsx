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
  background: var(--gradient-secondary);
  color: var(--color-navy);
  position: relative;
  overflow: hidden;
  padding: 2rem;
  /* Performance optimizations */
  will-change: auto;
  contain: layout style paint;
  transform: translateZ(0); /* Force hardware acceleration */

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  width: 100%;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  z-index: 2;
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

const LanguageSelector = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;

  button {
    background: var(--color-white);
    color: var(--color-navy);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
  }
`;

const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IceCreamTray = styled.div`
  width: 450px;
  height: 320px;
  background: linear-gradient(135deg, #FF4500, #FF6347, #FF4500);
  border-radius: 25px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.2rem;
  padding: 2.5rem;
  box-shadow: 
    0 25px 50px rgba(255, 69, 0, 0.3),
    0 15px 35px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.2);
  transform: perspective(800px) rotateY(-8deg) rotateX(5deg);
  /* Performance optimizations */
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    border-radius: 20px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 320px;
    height: 240px;
    gap: 0.8rem;
    padding: 1.8rem;
    transform: perspective(600px) rotateY(-5deg) rotateX(3deg);
  }
`;

const IceCreamCup = styled.div`
  background: var(--color-white);
  border-radius: 50%;
  position: relative;
  box-shadow: 
    0 12px 24px rgba(0,0,0,0.15),
    0 6px 12px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.8);
  border: 2px solid rgba(255,255,255,0.9);
  overflow: hidden;
  /* Performance optimizations */
  will-change: transform;
  backface-visibility: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 45%;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    will-change: transform;
    backface-visibility: hidden;
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 15%;
    width: 25%;
    height: 25%;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
    z-index: 3;
  }
  
  /* Enhanced ice cream flavors with more realistic colors */
  &.flavor-1::before { 
    background: linear-gradient(135deg, #8B0000, #DC143C);
    box-shadow: inset 0 -3px 6px rgba(0,0,0,0.2);
  }
  &.flavor-2::before { 
    background: linear-gradient(135deg, #F5F5DC, #FFFAF0);
    box-shadow: inset 0 -3px 6px rgba(139,69,19,0.1);
  }
  &.flavor-3::before { 
    background: linear-gradient(135deg, #3F2415, #8B4513);
    box-shadow: inset 0 -3px 6px rgba(0,0,0,0.3);
  }
  &.flavor-4::before { 
    background: linear-gradient(135deg, #87CEEB, #B0E0E6);
    box-shadow: inset 0 -3px 6px rgba(0,0,139,0.2);
  }
  &.flavor-5::before { 
    background: linear-gradient(135deg, #228B22, #90EE90);
    box-shadow: inset 0 -3px 6px rgba(0,100,0,0.2);
  }
  &.flavor-6::before { 
    background: linear-gradient(135deg, #FF8C00, #FFA500);
    box-shadow: inset 0 -3px 6px rgba(255,69,0,0.3);
  }
  
  /* Add wafer stick for some flavors */
  &.flavor-1::after {
    width: 4px;
    height: 35%;
    background: linear-gradient(to bottom, #D2B48C, #F4A460);
    border-radius: 2px;
    top: -20%;
    left: 70%;
    transform: rotate(25deg);
  }
  
  &.flavor-4::after {
    width: 8px;
    height: 20%;
    background: linear-gradient(45deg, #FFD700, #F0E68C);
    border-radius: 2px;
    top: 5%;
    left: 60%;
    transform: rotate(-15deg);
  }
`;

const FloatingIceCream = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  
  &.float-1 {
    top: 10%;
    right: 10%;
    background: var(--color-salmon-pink);
    animation: float 6s ease-in-out infinite;
  }
  
  &.float-2 {
    bottom: 20%;
    left: 15%;
    background: var(--color-yellow);
    animation: float 4s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

const HandElement = styled.div`
  position: absolute;
  width: 120px;
  height: 80px;
  background: linear-gradient(135deg, #FDBCB4, #F8B195);
  border-radius: 50px 50px 30px 30px;
  transform-origin: bottom center;
  
  &::before {
    content: '';
    position: absolute;
    width: 25px;
    height: 35px;
    background: linear-gradient(135deg, #FDBCB4, #F8B195);
    border-radius: 15px;
    top: 15px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 25px;
    background: linear-gradient(135deg, #FDBCB4, #F8B195);
    border-radius: 10px;
    top: 10px;
  }
  
  &.hand-1 {
    top: -15%;
    right: 15%;
    transform: rotate(-25deg);
    animation: hand-reach 4s ease-in-out infinite;
    
    &::before {
      right: -15px;
      transform: rotate(15deg);
    }
    
    &::after {
      right: -8px;
      transform: rotate(25deg);
    }
  }
  
  &.hand-2 {
    bottom: -10%;
    left: 10%;
    transform: rotate(35deg);
    animation: hand-reach 3s ease-in-out infinite reverse;
    
    &::before {
      left: -15px;
      transform: rotate(-15deg);
    }
    
    &::after {
      left: -8px;
      transform: rotate(-25deg);
    }
  }

  @keyframes hand-reach {
    0%, 100% { transform: translateY(0px) rotate(var(--base-rotation, 0deg)); }
    50% { transform: translateY(-8px) rotate(calc(var(--base-rotation, 0deg) + 5deg)); }
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 50px;
    
    &::before {
      width: 18px;
      height: 25px;
    }
    
    &::after {
      width: 12px;
      height: 18px;
    }
  }
`;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for better performance
      const tl = gsap.timeline();
      
      // Set initial states for better performance
      gsap.set('.hero-title', { opacity: 0, y: 100 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 50 });
      gsap.set('.ice-cream-tray', { opacity: 0, scale: 0.8, rotateY: -45 });
      gsap.set('.ice-cream-cup', { opacity: 0, scale: 0 });
      gsap.set('.hand-1, .hand-2', { opacity: 0, scale: 0.5 });

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
      .to('.ice-cream-tray', {
        opacity: 1, 
        scale: 1, 
        rotateY: -8, 
        rotateX: 5,
        duration: 1.2, 
        ease: 'power2.out',
        force3D: true
      }, "-=0.3")
      .to('.ice-cream-cup', {
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        ease: 'back.out(1.4)', 
        stagger: 0.08,
        force3D: true
      }, "-=0.6")
      .to('.hand-1, .hand-2', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        force3D: true
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      <LanguageSelector>
        <button>DE</button>
      </LanguageSelector>
      
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
        </TextContent>

        <ImageSection>
          <IceCreamTray className="ice-cream-tray">
            <IceCreamCup className="ice-cream-cup flavor-1" />
            <IceCreamCup className="ice-cream-cup flavor-2" />
            <IceCreamCup className="ice-cream-cup flavor-3" />
            <IceCreamCup className="ice-cream-cup flavor-4" />
            <IceCreamCup className="ice-cream-cup flavor-5" />
            <IceCreamCup className="ice-cream-cup flavor-6" />
            
            {/* Interactive hands reaching for ice cream */}
            <HandElement className="hand-1" style={{'--base-rotation': '-25deg'} as React.CSSProperties} />
            <HandElement className="hand-2" style={{'--base-rotation': '35deg'} as React.CSSProperties} />
          </IceCreamTray>
          
          <FloatingIceCream className="float-1" />
          <FloatingIceCream className="float-2" />
        </ImageSection>
      </ContentWrapper>
    </HeroContainer>
  );
}

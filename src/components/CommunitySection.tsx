'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CommunityContainer = styled.section`
  padding: 6rem 2rem;
  background: var(--gradient-secondary);
  color: var(--color-navy);
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const MainTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 4rem;
  color: var(--color-navy);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
`;

const FloatingPhotos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const PhotoCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  animation: float-photos 6s ease-in-out infinite;
  
  &:nth-child(1) {
    background: linear-gradient(45deg, var(--color-salmon-pink), var(--color-yellow));
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    background: linear-gradient(45deg, var(--color-light-blue), var(--color-cyan));
    animation-delay: -2s;
  }
  
  &:nth-child(3) {
    background: linear-gradient(45deg, var(--color-yellow), var(--color-orange));
    animation-delay: -4s;
  }
  
  &:nth-child(4) {
    background: linear-gradient(45deg, var(--color-orange), var(--color-red));
    animation-delay: -1s;
  }

  &::after {
    content: '🍦';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  }

  @keyframes float-photos {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    
    &::after {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    
    &::after {
      font-size: 2rem;
    }
  }
`;

const SocialButton = styled.button`
  background: var(--color-primary-purple);
  color: var(--color-white);
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;

  &:hover {
    background: var(--color-secondary-purple);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.3);
  }

  .icon {
    width: 24px;
    height: 24px;
    background: var(--color-white);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-purple);
    font-weight: 900;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  .bg-circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    animation: slow-rotate 20s linear infinite;

    &.circle-1 {
      width: 200px;
      height: 200px;
      background: var(--color-primary-purple);
      top: 20%;
      right: 10%;
    }

    &.circle-2 {
      width: 150px;
      height: 150px;
      background: var(--color-yellow);
      bottom: 30%;
      left: 15%;
      animation-direction: reverse;
    }

    &.circle-3 {
      width: 100px;
      height: 100px;
      background: var(--color-salmon-pink);
      top: 60%;
      right: 20%;
      animation-delay: -10s;
    }
  }

  @keyframes slow-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

export default function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main title
      gsap.fromTo('.community-title',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate floating photos
      gsap.fromTo('.photo-circle',
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.floating-photos',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate social button
      gsap.fromTo('.social-btn',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-btn',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate background circles
      gsap.fromTo('.bg-circle',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.1,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
          stagger: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <CommunityContainer ref={sectionRef}>
      <BackgroundElements>
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </BackgroundElements>

      <ContentWrapper>
        <MainTitle className="community-title">
          ENJOY A FEW SCOOPS OF OUR JOYFUL JOURNEY
        </MainTitle>

        <FloatingPhotos className="floating-photos">
          <PhotoCircle className="photo-circle" />
          <PhotoCircle className="photo-circle" />
          <PhotoCircle className="photo-circle" />
          <PhotoCircle className="photo-circle" />
        </FloatingPhotos>

        <SocialButton className="social-btn">
          <span className="icon">📷</span>
          FOLLOW US
        </SocialButton>
      </ContentWrapper>
    </CommunityContainer>
  );
}

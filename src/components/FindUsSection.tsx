'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FindUsContainer = styled.section`
  padding: 6rem 2rem;
  background: var(--color-white);
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  z-index: 2;
`;

const WelcomeTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: var(--color-navy);
  
  .curved-text {
    display: block;
    transform-origin: center;
    animation: welcome-curve 10s ease-in-out infinite;
  }

  @keyframes welcome-curve {
    0%, 100% { transform: perspective(400px) rotateX(0deg); }
    50% { transform: perspective(400px) rotateX(8deg); }
  }
`;

const MapContainer = styled.div`
  position: relative;
  background: var(--gradient-secondary);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const MapTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-navy);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const GermanyMap = styled.div`
  width: 300px;
  height: 200px;
  background: var(--color-white);
  border-radius: 15px;
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  &::before {
    content: '🇩🇪';
    font-size: 4rem;
    filter: grayscale(20%);
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 150px;
    
    &::before {
      font-size: 3rem;
    }
  }
`;

const LocationPin = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--color-red);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  top: 50%;
  left: 60%;
  cursor: pointer;
  animation: bounce 2s infinite;
  
  &::after {
    content: '2';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    color: var(--color-white);
    font-weight: bold;
    font-size: 1.2rem;
  }

  &:hover {
    transform: rotate(-45deg) scale(1.2);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: rotate(-45deg) translateY(0); }
    40% { transform: rotate(-45deg) translateY(-10px); }
    60% { transform: rotate(-45deg) translateY(-5px); }
  }
`;

const LocationInfo = styled.div`
  text-align: center;
  color: var(--color-navy);
  margin-bottom: 2rem;

  h4 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  p {
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const FindUsButton = styled.button`
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

  &:hover {
    background: var(--color-secondary-purple);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.3);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-yellow);
  animation: float-around 8s ease-in-out infinite;

  @keyframes float-around {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, -10px) rotate(90deg); }
    50% { transform: translate(0, -20px) rotate(180deg); }
    75% { transform: translate(-20px, -10px) rotate(270deg); }
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    right: 5%;
  }
`;

export default function FindUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate welcome title
      gsap.fromTo('.welcome-title',
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

      // Animate map container
      gsap.fromTo('.map-container',
        { opacity: 0, x: 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.map-container',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate location pin
      gsap.fromTo('.location-pin',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.5,
          scrollTrigger: {
            trigger: '.map-container',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate button
      gsap.fromTo('.find-us-btn',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.find-us-btn',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <FindUsContainer ref={sectionRef}>
      <FloatingElements />
      
      <ContentWrapper>
        <TextContent>
          <WelcomeTitle className="welcome-title">
            <span className="curved-text">WE ARE DELIGHTED</span>
            <span className="curved-text">TO WELCOME</span>
            <span className="curved-text">YOU SOON!</span>
          </WelcomeTitle>
        </TextContent>

        <MapContainer className="map-container">
          <MapTitle>FIND OUR LOCATIONS</MapTitle>
          <GermanyMap>
            <LocationPin className="location-pin" />
          </GermanyMap>
          
          <LocationInfo>
            <h4>2 Locations in Germany</h4>
            <p>Visit our premium ice cream shops in Berlin and Munich. Experience the EISLAB difference in person!</p>
          </LocationInfo>
          
          <FindUsButton className="find-us-btn">
            FIND US
          </FindUsButton>
        </MapContainer>
      </ContentWrapper>
    </FindUsContainer>
  );
}

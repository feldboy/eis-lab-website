'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FranchiseContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

const TextContent = styled.div`
  color: white;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  
  .highlight {
    background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 3rem auto;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
  border: none;
  padding: 20px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const VisualContent = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 968px) {
    height: auto;
    flex-direction: column;
    gap: 20px;
    padding: 40px 0;
  }
`;

const FloatingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  margin: 20px;
  text-align: center;
  color: white;
  min-width: 200px;
  max-width: 220px;
  position: absolute;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
    transform: rotate(-5deg);
    z-index: 3;
  }

  &:nth-child(2) {
    top: 20%;
    right: 10%;
    transform: rotate(5deg);
    z-index: 2;
  }

  &:nth-child(3) {
    bottom: 15%;
    left: 30%;
    transform: rotate(-3deg);
    z-index: 1;
  }

  @media (max-width: 968px) {
    position: relative;
    margin: 20px auto;
    max-width: 280px;
    transform: none !important;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;
      transform: none;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, ${props => props.theme.colors.cyan}20 0%, transparent 70%);
    border-radius: 50%;
    top: 10%;
    right: 10%;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, ${props => props.theme.colors.salmonPink}20 0%, transparent 70%);
    border-radius: 50%;
    bottom: 20%;
    left: 15%;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

const FranchiseSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Animate cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 50, rotation: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Continuous floating animation with controlled movement
        gsap.to(cards[0], {
          y: '+=15',
          rotation: '+=3',
          duration: 4,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        });

        gsap.to(cards[1], {
          y: '-=12',
          rotation: '-=2',
          duration: 5,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.5
        });

        gsap.to(cards[2], {
          y: '+=10',
          rotation: '+=4',
          duration: 3.5,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <FranchiseContainer ref={containerRef}>
      <BackgroundElements />
      <ContentWrapper>
        <TextContent>
          <MainTitle ref={titleRef}>
            JOIN THE<br />
            <span className="highlight">EISLAB</span><br />
            FAMILY
          </MainTitle>
          <Description ref={descriptionRef}>
            Start your own EISLAB franchise and bring premium ice cream experiences to your community. We provide full support, training, and the recipes that make us special.
          </Description>
          <CTAButton ref={buttonRef}>
            Start Your Journey
          </CTAButton>
        </TextContent>
        
        <VisualContent ref={cardsRef}>
          <FloatingCard>
            <CardIcon>🏪</CardIcon>
            <CardTitle>Your Store</CardTitle>
            <CardText>Complete store setup and design support</CardText>
          </FloatingCard>
          <FloatingCard>
            <CardIcon>👨‍🍳</CardIcon>
            <CardTitle>Training</CardTitle>
            <CardText>Professional training for you and your team</CardText>
          </FloatingCard>
          <FloatingCard>
            <CardIcon>📈</CardIcon>
            <CardTitle>Growth</CardTitle>
            <CardText>Ongoing support for business success</CardText>
          </FloatingCard>
        </VisualContent>
      </ContentWrapper>
    </FranchiseContainer>
  );
};

export default FranchiseSection;

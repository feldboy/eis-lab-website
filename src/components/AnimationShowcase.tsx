'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FloatingElements from './FloatingElements';
import CurvedText from './CurvedText';
import ScrollAnimationDemo from './ScrollAnimationDemo';
import { SEO } from './SEOProvider';
import { motion } from 'framer-motion';
import { pageTransitions } from '../utils/animations';

const ShowcaseContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:nth-child(odd) {
    background: linear-gradient(135deg, var(--color-white) 0%, #f8f9ff 100%);
  }

  &:nth-child(even) {
    background: linear-gradient(135deg, #f8f9ff 0%, var(--color-light-blue) 10%, var(--color-white) 100%);
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: var(--color-navy);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  h3 {
    color: var(--color-navy);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--color-navy);
    opacity: 0.8;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(30, 26, 74, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.8rem;
  }
`;

const ControlButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'var(--color-yellow)' : 'transparent'};
  color: ${props => props.$active ? 'var(--color-navy)' : 'white'};
  border: 1px solid ${props => props.$active ? 'var(--color-yellow)' : 'white'};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: var(--color-yellow);
    color: var(--color-navy);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const AnimationShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'floating' | 'curved' | 'scroll'>('floating');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const features = [
    {
      title: "GSAP Floating Elements",
      description: "Smooth, performant floating ice cream scoop animations with random variations and GPU acceleration."
    },
    {
      title: "Curved Text Animation",
      description: "SVG-based curved text with gradient effects and scroll-triggered animations."
    },
    {
      title: "Scroll Animations",
      description: "ScrollTrigger-powered animations that respond to user scroll with stagger effects."
    },
    {
      title: "Page Transitions",
      description: "Smooth Framer Motion page transitions with multiple animation presets."
    },
    {
      title: "Menu Animations",
      description: "Complex menu overlay with expanding circles and staggered item animations."
    },
    {
      title: "Responsive Design",
      description: "All animations are optimized for mobile devices with reduced motion support."
    }
  ];

  // Disable animations based on user preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAnimationsEnabled(!prefersReducedMotion);
  }, []);

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'floating':
        return <FloatingElements count={12} />;
      case 'curved':
        return <CurvedText animate={animationsEnabled} direction="clockwise" fontSize={28} />;
      case 'scroll':
        return <ScrollAnimationDemo />;
      default:
        return <FloatingElements count={8} />;
    }
  };

  return (
    <>
      <SEO 
        title="Animation Showcase - EIS Lab"
        description="Experience our advanced animation features including GSAP floating elements, curved text, and scroll-triggered animations."
      />
      
      <ShowcaseContainer>
        {/* Hero Section */}
        <Section>
          <FloatingElements count={6} />
          <SectionTitle
            initial={pageTransitions.fadeSlide.initial}
            animate={pageTransitions.fadeSlide.animate}
            transition={pageTransitions.fadeSlide.transition}
          >
            Animation Showcase
          </SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ 
              fontSize: '1.3rem', 
              textAlign: 'center', 
              color: 'var(--color-navy)',
              maxWidth: '600px',
              lineHeight: 1.6
            }}
          >
            Discover the power of modern web animations with GSAP, Framer Motion, 
            and advanced CSS techniques that bring your website to life.
          </motion.p>
        </Section>

        {/* Features Section */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Animation Features
          </SectionTitle>
          
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Section>

        {/* Interactive Demo Section */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Interactive Demo
          </SectionTitle>
          
          <div style={{ width: '100%', height: '60vh', position: 'relative' }}>
            {renderActiveDemo()}
          </div>
        </Section>

        {/* Curved Text Showcase */}
        <Section>
          <CurvedText 
            text="Experience the Future of Ice Cream Innovation"
            radius={180}
            fontSize={22}
            animate={animationsEnabled}
            direction="counterclockwise"
          />
        </Section>

        {/* Control Panel */}
        <ControlPanel>
          <ControlButton 
            $active={activeDemo === 'floating'} 
            onClick={() => setActiveDemo('floating')}
          >
            Floating
          </ControlButton>
          <ControlButton 
            $active={activeDemo === 'curved'} 
            onClick={() => setActiveDemo('curved')}
          >
            Curved Text
          </ControlButton>
          <ControlButton 
            $active={activeDemo === 'scroll'} 
            onClick={() => setActiveDemo('scroll')}
          >
            Scroll FX
          </ControlButton>
          <ControlButton 
            $active={animationsEnabled} 
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
          >
            {animationsEnabled ? 'Animations On' : 'Animations Off'}
          </ControlButton>
        </ControlPanel>
      </ShowcaseContainer>
    </>
  );
};

export default AnimationShowcase;

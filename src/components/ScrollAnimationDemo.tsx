'use client';

import React from 'react';
import styled from 'styled-components';

const ScrollAnimationContainer = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const AnimatedElement = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-light-blue) 0%, var(--color-yellow) 100%);
  border-radius: 20px;
  color: var(--color-navy);
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(50px);

  &.animate-on-scroll {
    transition: all 0.6s ease;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }
`;

const ParallaxElement = styled.div`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--color-salmon-pink) 0%, var(--color-primary-purple) 100%);
  border-radius: 50%;
  opacity: 0.7;
  z-index: -1;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    right: 5%;
  }
`;

const StaggeredList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 3rem 0;
`;

const StaggeredItem = styled.li`
  padding: 1rem 0;
  font-size: 1.5rem;
  color: var(--color-navy);
  opacity: 0;
  transform: translateX(-50px);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScrollAnimationDemo: React.FC = () => {
  return (
    <ScrollAnimationContainer>
      <h2 className="animate-on-scroll">
        Advanced Scroll Animations
      </h2>
      
      <p className="animate-on-scroll">
        This demonstrates various GSAP scroll-triggered animations
      </p>

      <ParallaxElement />

      <AnimatedElement className="animate-on-scroll">
        This element fades in and slides up when it enters the viewport.
        The animation is smooth and performant using GSAP&apos;s ScrollTrigger.
      </AnimatedElement>

      <AnimatedElement className="animate-on-scroll">
        Multiple elements can have different animation timings and effects.
        This creates a dynamic, engaging user experience.
      </AnimatedElement>

      <StaggeredList>
        <StaggeredItem className="staggered-item">Staggered Animation Item 1</StaggeredItem>
        <StaggeredItem className="staggered-item">Staggered Animation Item 2</StaggeredItem>
        <StaggeredItem className="staggered-item">Staggered Animation Item 3</StaggeredItem>
        <StaggeredItem className="staggered-item">Staggered Animation Item 4</StaggeredItem>
        <StaggeredItem className="staggered-item">Staggered Animation Item 5</StaggeredItem>
      </StaggeredList>

      <AnimatedElement className="animate-on-scroll">
        The parallax element in the background moves at a different speed,
        creating depth and visual interest as you scroll.
      </AnimatedElement>
    </ScrollAnimationContainer>
  );
};

export default ScrollAnimationDemo;

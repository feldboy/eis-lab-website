'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BestChoicesContainer = styled.section`
  padding: 6rem 2rem;
  background: var(--gradient-primary);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--color-white);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const FlavorCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FlavorCard = styled.div`
  background: var(--color-white);
  border-radius: 20px;
  padding: 2rem;
  color: var(--color-navy);
  text-align: center;
  min-width: 300px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  /* Performance optimizations */
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);

  &.active {
    transform: scale(1.1) translateZ(0);
    z-index: 2;
  }

  &:hover {
    transform: translateY(-10px) translateZ(0);
  }

  @media (max-width: 768px) {
    min-width: 280px;
    padding: 1.5rem;

    &.active {
      transform: scale(1.05) translateZ(0);
    }
  }
`;

const FlavorIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);

  &.hazelnut {
    background: linear-gradient(45deg, #D2691E, #8B4513);
  }

  &.strawberry {
    background: linear-gradient(45deg, #FFB6C1, #FF69B4);
  }

  &.vanilla {
    background: linear-gradient(45deg, #FFF8DC, #FFDE59);
  }

  &.chocolate {
    background: linear-gradient(45deg, #8B4513, #654321);
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 30px;
    background: var(--color-white);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const FlavorName = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: var(--color-navy);
`;

const FlavorDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-navy);
  opacity: 0.8;
`;

const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;

  &.active {
    background: var(--color-white);
    transform: scale(1.3);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const ProductsButton = styled.button`
  background: var(--color-white);
  color: var(--color-primary-purple);
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.3);
  }
`;

const flavors = [
  {
    id: 'hazelnut',
    name: 'Hazelnut',
    description: 'Rich and creamy hazelnut ice cream made with premium Italian hazelnuts and organic cream.',
    className: 'hazelnut'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    description: 'Fresh strawberry ice cream with real strawberry pieces, made from locally sourced berries.',
    className: 'strawberry'
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    description: 'Classic vanilla ice cream made with Madagascar vanilla beans and farm-fresh cream.',
    className: 'vanilla'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    description: 'Decadent dark chocolate ice cream made with Belgian cocoa and rich cream.',
    className: 'chocolate'
  }
];

export default function BestChoicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFlavor, setActiveFlavor] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create optimized timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          once: true // Only trigger once for better performance
        }
      });

      // Set initial states
      gsap.set('.section-title', { opacity: 0, y: 50 });
      gsap.set('.flavor-card', { opacity: 0, y: 80, scale: 0.9 });
      gsap.set('.products-btn', { opacity: 0, scale: 0.8 });

      // Optimized animation sequence
      tl.to('.section-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        force3D: true
      })
      .to('.flavor-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        force3D: true
      }, "-=0.5")
      .to('.products-btn', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
        force3D: true
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate flavors
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlavor((prev) => (prev + 1) % flavors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BestChoicesContainer ref={sectionRef}>
      <SectionTitle className="section-title">
        BEST CHOICES
      </SectionTitle>

      <FlavorCarousel className="flavor-carousel">
        {flavors.map((flavor, index) => (
          <FlavorCard
            key={flavor.id}
            className={`flavor-card ${index === activeFlavor ? 'active' : ''}`}
            onClick={() => setActiveFlavor(index)}
          >
            <FlavorIcon className={flavor.className} />
            <FlavorName>{flavor.name}</FlavorName>
            <FlavorDescription>{flavor.description}</FlavorDescription>
          </FlavorCard>
        ))}
      </FlavorCarousel>

      <NavigationDots>
        {flavors.map((_, index) => (
          <Dot
            key={index}
            className={index === activeFlavor ? 'active' : ''}
            onClick={() => setActiveFlavor(index)}
          />
        ))}
      </NavigationDots>

      <ProductsButton className="products-btn">
        OUR PRODUCTS
      </ProductsButton>
    </BestChoicesContainer>
  );
}

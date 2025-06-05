'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResearchContainer = styled.section`
  padding: 4rem 2rem;
  background-color: var(--color-light-blue);
  color: var(--color-navy);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-navy);
`;

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResearchCard = styled.div`
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--color-navy);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
`;

const ResearchSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    gsap.fromTo(gsap.utils.toArray('.research-card'), 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ResearchContainer ref={sectionRef}>
      <SectionTitle ref={titleRef}>Our Premium Products</SectionTitle>
      <ResearchGrid ref={gridRef}>
        <ResearchCard className="research-card">
          <CardTitle>Artisan Gelato</CardTitle>
          <CardDescription>
            Handcrafted gelato made with the finest ingredients and traditional Italian techniques for an authentic taste experience.
          </CardDescription>
        </ResearchCard>
        <ResearchCard className="research-card">
          <CardTitle>Custom Ice Cream</CardTitle>
          <CardDescription>
            Personalized ice cream creations with unique flavor combinations and mix-ins, tailored to each customer&apos;s preferences.
          </CardDescription>
        </ResearchCard>
        <ResearchCard className="research-card">
          <CardTitle>Seasonal Specials</CardTitle>
          <CardDescription>
            Limited-time flavors that celebrate the seasons with fresh, locally sourced ingredients and innovative recipes.
          </CardDescription>
        </ResearchCard>
        <ResearchCard className="research-card">
          <CardTitle>Vegan &amp; Healthy Options</CardTitle>
          <CardDescription>
            Delicious plant-based and low-sugar alternatives that don&apos;t compromise on taste or quality for health-conscious customers.
          </CardDescription>
        </ResearchCard>
      </ResearchGrid>
    </ResearchContainer>
  );
};

export default ResearchSection;

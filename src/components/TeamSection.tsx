'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeamContainer = styled.section`
  padding: 4rem 2rem;
  background-color: var(--color-white);
  color: var(--color-navy);
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-navy);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const TeamMemberCard = styled.div`
  background-color: var(--color-light-blue);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  color: var(--color-navy);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const MemberDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;


const TeamSection: React.FC = () => {
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

    gsap.fromTo(gsap.utils.toArray('.team-member-card'), 
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

  const teamMembers = [
    {
      name: 'Marco Rossi',
      role: 'Master Gelato Chef',
      description: 'Expert in traditional Italian gelato techniques with 15+ years experience.',
    },
    {
      name: 'Sarah Chen',
      role: 'Franchise Operations Manager',
      description: 'Specializes in franchise development and operational excellence.',
    },
    {
      name: 'David Martinez',
      role: 'Creative Flavor Director',
      description: 'Develops innovative seasonal flavors and custom ice cream recipes.',
    },
    {
      name: 'Emma Thompson',
      role: 'Quality Assurance Lead',
      description: 'Ensures every product meets our highest standards for taste and quality.',
    },
  ];

  return (
    <TeamContainer ref={sectionRef}>
      <SectionTitle ref={titleRef}>Meet Our Team</SectionTitle>
      <TeamGrid ref={gridRef}>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} className="team-member-card">
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <MemberDescription>{member.description}</MemberDescription>
          </TeamMemberCard>
        ))}
      </TeamGrid>
    </TeamContainer>
  );
};

export default TeamSection;

'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactContainer = styled.section`
  padding: 4rem 2rem;
  background-color: var(--color-light-blue);
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

const ContactContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-size: 1.1rem;

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--color-navy);
    text-decoration: underline;
    &:hover {
      color: var(--color-purple);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    max-width: 100%;
    
    p {
      margin-bottom: 0.8rem;
    }
  }
`;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ContactContainer ref={sectionRef}>
      <SectionTitle ref={titleRef}>Contact Us</SectionTitle>
      <ContactContent ref={contentRef}>
        <p>
          Have questions or interested in collaborating with the EIS Lab? Feel
          free to reach out to us.
        </p>
        <p>
          Email: <a href="mailto:info@eislab.org">info@eislab.org</a>
        </p>
        <p>
          Phone: +1 (123) 456-7890
        </p>
        <p>
          Address: 123 Research Avenue, Science City, SC 12345
        </p>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactSection;

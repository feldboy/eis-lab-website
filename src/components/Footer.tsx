'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem;
  background-color: var(--color-navy);
  color: var(--color-white);
  text-align: center;
  font-size: 0.9rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: auto;
`;

const FooterContent = styled.p`
  margin: 0;
`;

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <FooterContainer ref={footerRef}>
      <FooterContent ref={contentRef}>
        &copy; {new Date().getFullYear()} EIS Lab. All rights reserved.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

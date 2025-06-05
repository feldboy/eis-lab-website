'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ValuesSection from '../components/ValuesSection';
import BestChoicesSection from '../components/BestChoicesSection';
import FindUsSection from '../components/FindUsSection';
import CommunitySection from '../components/CommunitySection';
import FranchiseSection from '../components/FranchiseSection';

// Disable static generation for this page to avoid SSR issues with animations
export const dynamic = 'force-dynamic';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import CurvedText from '../components/CurvedText';
import { SEO } from '../components/SEOProvider';

const MainContent = styled.main`
  flex-grow: 1;
  padding-top: 80px;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding-top: 70px;
  }

  @media (max-width: 480px) {
    padding-top: 60px;
  }
`;

const FloatingElementsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const CurvedTextSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--color-white) 0%, #f8f9ff 100%);
  position: relative;
  z-index: 2;
`;

export default function Home() {
  return (
    <>
      <SEO 
        title="EIS Lab - Ice Cream Innovation"
        description="Join the EIS Lab family and become part of an innovative ice cream franchise. Discover our unique flavors and franchise opportunities."
        keywords="ice cream, franchise, EIS Lab, innovation, desserts, business opportunity"
      />
      
      <FloatingElementsContainer>
        <FloatingElements count={8} />
      </FloatingElementsContainer>
      
      <Header />
      <MainContent>
        <HeroSection />
        <CurvedTextSection>
          <CurvedText 
            text="Innovative Ice Cream Experience Laboratory"
            radius={150}
            fontSize={20}
            animate={true}
            direction="clockwise"
          />
        </CurvedTextSection>
        <ValuesSection />
        <BestChoicesSection />
        <FindUsSection />
        <CommunitySection />
        <FranchiseSection />
      </MainContent>
      <Footer />
    </>
  );
}

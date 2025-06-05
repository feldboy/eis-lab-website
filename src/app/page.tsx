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
import Footer from '../components/Footer';

const MainContent = styled.main`
  flex-grow: 1;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding-top: 70px;
  }

  @media (max-width: 480px) {
    padding-top: 60px;
  }
`;

export default function Home() {
  return (
    <>
      <Header />
      <MainContent>
        <HeroSection />
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

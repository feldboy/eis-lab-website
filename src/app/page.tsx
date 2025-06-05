'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FranchiseSection from '../components/FranchiseSection'; // Import FranchiseSection
import CurvedText from '../components/CurvedText'; // Import CurvedText
import ResearchSection from '../components/ResearchSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';

const MainContent = styled.main`
  flex-grow: 1; /* Allows main content to take available space */
  padding-top: 80px; /* Adjust based on header height */
`;

export default function Home() {
  return (
    <>
      <Header />
      <MainContent>
        <HeroSection />
        <FranchiseSection /> {/* Add FranchiseSection component */}
        <CurvedText /> {/* Add CurvedText component */}
        <ResearchSection />
        <TeamSection />
        <ContactSection />
      </MainContent>
    </>
  );
}

'use client';

import React from 'react';
import styled from 'styled-components';

const FranchiseContainer = styled.section`
  padding: 4rem 2rem;
  background-color: var(--color-light-blue);
  color: var(--color-navy);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 900;
`;

const FranchiseSection: React.FC = () => {
  return (
    <FranchiseContainer>
      <Title>Join Our Franchise</Title>
    </FranchiseContainer>
  );
};

export default FranchiseSection;

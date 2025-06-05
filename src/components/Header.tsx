'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu'; // Import the new Menu component

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background-color: var(--color-white);
  color: var(--color-navy);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-navy);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageButton = styled.button`
  background: none;
  border: 2px solid var(--color-navy);
  color: var(--color-navy);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-navy);
    color: var(--color-white);
  }
`;

const MenuButton = styled.button`
  background: none;
  border: 2px solid var(--color-navy);
  color: var(--color-navy);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-navy);
    color: var(--color-white);
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Logo>EISLAB</Logo>
      <HeaderButtons>
        <LanguageButton>DE</LanguageButton>
        <MenuButton onClick={toggleMenu}>MENU</MenuButton>
      </HeaderButtons>
      <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
    </HeaderContainer>
  );
};

export default Header;

'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Menu from './Menu'; // Import the new Menu component

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(74, 26, 74, 0.1);
  color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const LanguageButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const MenuButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border: none;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
    transition: left 0.3s ease;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Logo href="/">EISLAB</Logo>
      <HeaderButtons>
        <LanguageButton>DE</LanguageButton>
        <MenuButton onClick={toggleMenu}>
          <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
        </MenuButton>
      </HeaderButtons>
      <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
    </HeaderContainer>
  );
};

export default Header;

'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

interface MenuOverlayProps {
  $isOpen: boolean;
}

const MenuOverlay = styled.div<MenuOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  z-index: 100;
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleBackground = styled.div`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  &.pink-circle {
    background-color: var(--color-salmon-pink);
    top: 10%;
    left: 20%;
    width: 60vw;
    height: 60vw;
  }
  &.orange-circle {
    background-color: var(--color-yellow);
    top: 5%;
    right: 10%;
    width: 70vw;
    height: 70vw;
  }
  &.purple-circle {
    background-color: var(--color-purple);
    bottom: 15%;
    left: 5%;
    width: 50vw;
    height: 50vw;
  }
`;

const MenuItem = styled.a`
  opacity: 0;
  transform: translateY(20px);
  display: block;
  font-size: 2.5rem; /* Adjusted for better visibility */
  color: var(--color-navy); /* Changed to navy for contrast with light circles */
  text-decoration: none;
  margin: 1rem 0;
  position: relative;
  z-index: 110;
  font-family: var(--font-geist-sans); /* Use defined font */
  font-weight: bold;

  &:hover {
    color: var(--color-light-blue);
  }
`;

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  // Suppress unused variable warning
  void toggleMenu;

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { visibility: 'visible', duration: 0 }); // Make overlay visible immediately
      // Animate circles expanding
      gsap.to(circlesRef.current, {
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
      // Animate menu items
      gsap.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      // Animate circles contracting
      gsap.to(circlesRef.current, {
        scale: 0,
        stagger: {
          each: 0.1,
          from: "end"
        },
        duration: 0.6,
        ease: "power2.in"
      });
      // Animate menu items out
      gsap.to(itemsRef.current, {
        opacity: 0,
        y: 20,
        stagger: {
          each: 0.05,
          from: "end"
        },
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(menuRef.current, { visibility: 'hidden', duration: 0 }); // Hide overlay after animation
        }
      });
    }
  }, [isOpen]);

  return (
    <MenuOverlay $isOpen={isOpen} ref={menuRef}>
      <CircleBackground className="pink-circle" ref={el => { if (el) circlesRef.current[0] = el; }} />
      <CircleBackground className="orange-circle" ref={el => { if (el) circlesRef.current[1] = el; }} />
      <CircleBackground className="purple-circle" ref={el => { if (el) circlesRef.current[2] = el; }} />
      <div className="menu-content" style={{ position: 'relative', zIndex: 110 }}>
        <ul>
          <li><MenuItem href="/" ref={el => { if (el) itemsRef.current[0] = el; }}>Home</MenuItem></li>
          <li><MenuItem href="/products" ref={el => { if (el) itemsRef.current[1] = el; }}>Products</MenuItem></li>
          <li><MenuItem href="/locations" ref={el => { if (el) itemsRef.current[2] = el; }}>Locations</MenuItem></li>
          <li><MenuItem href="/franchise" ref={el => { if (el) itemsRef.current[3] = el; }}>Franchise</MenuItem></li>
          <li><MenuItem href="/about" ref={el => { if (el) itemsRef.current[4] = el; }}>About</MenuItem></li>
          <li><MenuItem href="/contact" ref={el => { if (el) itemsRef.current[5] = el; }}>Contact</MenuItem></li>
        </ul>
      </div>
    </MenuOverlay>
  );
};

export default Menu;

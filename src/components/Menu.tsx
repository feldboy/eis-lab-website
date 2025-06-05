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
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Use dynamic viewport height for better mobile support */
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  z-index: 9999; /* Increased from 999 to ensure it's above everything */
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* Performance optimizations */
  will-change: ${props => props.$isOpen ? 'transform, opacity' : 'auto'};
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0); /* Force hardware acceleration */
  contain: layout style paint; /* CSS containment for better performance */
`;

const CircleBackground = styled.div`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  /* Performance optimizations */
  will-change: transform;
  backface-visibility: hidden;
  transform-origin: center center;
  contain: layout style paint;
  
  &.pink-circle {
    background-color: var(--color-salmon-pink);
    top: 8%;
    left: 12%;
    width: min(60vmin, 300px);
    height: min(60vmin, 300px);
  }
  &.orange-circle {
    background-color: var(--color-yellow);
    top: 3%;
    right: 8%;
    width: min(70vmin, 350px);
    height: min(70vmin, 350px);
  }
  &.purple-circle {
    background-color: var(--color-primary-purple);
    bottom: 12%;
    left: 3%;
    width: min(50vmin, 250px);
    height: min(50vmin, 250px);
  }

  @media (max-width: 768px) {
    &.pink-circle {
      width: min(70vmin, 250px);
      height: min(70vmin, 250px);
      left: 2%;
      top: 8%;
    }
    &.orange-circle {
      width: min(80vmin, 280px);
      height: min(80vmin, 280px);
      right: -5%;
      top: 3%;
    }
    &.purple-circle {
      width: min(60vmin, 220px);
      height: min(60vmin, 220px);
      left: -8%;
      bottom: 15%;
    }
  }

  @media (max-width: 480px) {
    &.pink-circle {
      width: min(60vmin, 200px);
      height: min(60vmin, 200px);
    }
    &.orange-circle {
      width: min(70vmin, 230px);
      height: min(70vmin, 230px);
    }
    &.purple-circle {
      width: min(50vmin, 180px);
      height: min(50vmin, 180px);
    }
  }
`;

const MenuItem = styled.a`
  opacity: 0;
  transform: translateY(20px);
  display: block;
  font-size: 2.5rem;
  color: var(--color-navy);
  text-decoration: none;
  margin: 1rem 0;
  position: relative;
  z-index: 110;
  font-family: var(--font-geist-sans);
  font-weight: bold;

  &:hover {
    color: var(--color-light-blue);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0.8rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin: 0.6rem 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-navy);
  cursor: pointer;
  z-index: 120;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: rotate(45deg);
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-light-blue);
    transform: rotate(45deg) scale(1.1);
  }

  &:before {
    content: '+';
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.8rem;
    width: 35px;
    height: 35px;

    &:before {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    width: 30px;
    height: 30px;

    &:before {
      font-size: 1.5rem;
    }
  }
`;

const MenuContent = styled.div`
  position: relative;
  z-index: 110;
  text-align: center;
`;

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (isOpen) {
      // Set initial state
      gsap.set(menuRef.current, { visibility: 'visible' });
      gsap.set(circlesRef.current, { scale: 0 });
      gsap.set([...itemsRef.current, closeButtonRef.current], { opacity: 0, y: 20 });
      
      // Optimized entrance animation
      tl.to(circlesRef.current, {
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.2)",
        force3D: true, // Force GPU acceleration
      })
      .to([...itemsRef.current, closeButtonRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      }, "-=0.3");
    } else {
      // Optimized exit animation
      tl.to([...itemsRef.current, closeButtonRef.current], {
        opacity: 0,
        y: 20,
        stagger: {
          each: 0.03,
          from: "end"
        },
        duration: 0.3,
        ease: "power2.in",
        force3D: true,
      })
      .to(circlesRef.current, {
        scale: 0,
        stagger: {
          each: 0.06,
          from: "end"
        },
        duration: 0.4,
        ease: "back.in(1.2)",
        force3D: true,
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
        }
      }, "-=0.1");
    }

    return () => {
      tl.kill(); // Clean up timeline
    };
  }, [isOpen]);

  // Handle click outside menu content to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleMenu();
    }
  };

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, toggleMenu]);

  // Handle menu item click to close menu
  const handleMenuItemClick = () => {
    toggleMenu();
  };

  return (
    <MenuOverlay $isOpen={isOpen} ref={menuRef} onClick={handleOverlayClick}>
      <CloseButton ref={closeButtonRef} onClick={toggleMenu} />
      <CircleBackground className="pink-circle" ref={el => { if (el) circlesRef.current[0] = el; }} />
      <CircleBackground className="orange-circle" ref={el => { if (el) circlesRef.current[1] = el; }} />
      <CircleBackground className="purple-circle" ref={el => { if (el) circlesRef.current[2] = el; }} />
      <MenuContent>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li><MenuItem href="/" ref={el => { if (el) itemsRef.current[0] = el; }} onClick={handleMenuItemClick}>Home</MenuItem></li>
          <li><MenuItem href="/products" ref={el => { if (el) itemsRef.current[1] = el; }} onClick={handleMenuItemClick}>Products</MenuItem></li>
          <li><MenuItem href="/locations" ref={el => { if (el) itemsRef.current[2] = el; }} onClick={handleMenuItemClick}>Locations</MenuItem></li>
          <li><MenuItem href="/franchise" ref={el => { if (el) itemsRef.current[3] = el; }} onClick={handleMenuItemClick}>Franchise</MenuItem></li>
          <li><MenuItem href="/about" ref={el => { if (el) itemsRef.current[4] = el; }} onClick={handleMenuItemClick}>About</MenuItem></li>
          <li><MenuItem href="/contact" ref={el => { if (el) itemsRef.current[5] = el; }} onClick={handleMenuItemClick}>Contact</MenuItem></li>
        </ul>
      </MenuContent>
    </MenuOverlay>
  );
};

export default Menu;

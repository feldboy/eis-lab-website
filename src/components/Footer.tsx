'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #2A0E2A 100%);
  color: white;
  padding: 80px 20px 40px;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const BrandSection = styled.div`
  @media (max-width: 640px) {
    order: -1;
  }
`;

const Logo = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const BrandDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 350px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.8rem;

      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 1rem;

        &:hover {
          color: ${props => props.theme.colors.cyan};
        }
      }
    }
  }
`;

const NewsletterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin-bottom: 1.5rem;
    opacity: 0.8;
    line-height: 1.5;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EmailInput = styled.input`
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.cyan};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.cyan}30;
  }
`;

const SubscribeButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, ${props => props.theme.colors.cyan}, ${props => props.theme.colors.salmonPink});
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Copyright = styled.p`
  opacity: 0.6;
  font-size: 0.9rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.cyan};
    }
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '🍦';
    position: absolute;
    font-size: 4rem;
    opacity: 0.1;
    top: 20%;
    right: 10%;
    animation: float 8s ease-in-out infinite;
  }

  &::after {
    content: '🧁';
    position: absolute;
    font-size: 3rem;
    opacity: 0.1;
    bottom: 30%;
    left: 15%;
    animation: float 6s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
`;

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <FooterContainer ref={footerRef}>
      <BackgroundElements />
      <FooterContent>
        <BrandSection>
          <Logo>EISLAB</Logo>
          <BrandDescription>
            Premium ice cream crafted with love, innovation, and the finest ingredients. Creating moments of joy, one scoop at a time.
          </BrandDescription>
          <SocialLinks>
            <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
            <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
            <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
            <SocialLink href="#" aria-label="TikTok">🎵</SocialLink>
          </SocialLinks>
        </BrandSection>

        <FooterSection>
          <h3>Products</h3>
          <ul>
            <li><a href="#">Premium Flavors</a></li>
            <li><a href="#">Seasonal Specials</a></li>
            <li><a href="#">Ice Cream Cakes</a></li>
            <li><a href="#">Vegan Options</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </FooterSection>

        <NewsletterSection>
          <h3>Stay Sweet</h3>
          <p>Get the latest flavors and special offers delivered to your inbox.</p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <EmailInput 
              type="email" 
              placeholder="your@email.com" 
              required 
            />
            <SubscribeButton type="submit">
              Subscribe
            </SubscribeButton>
          </NewsletterForm>
        </NewsletterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © 2024 EISLAB. All rights reserved. Made with 💜 for ice cream lovers.
        </Copyright>
        <LegalLinks>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </LegalLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

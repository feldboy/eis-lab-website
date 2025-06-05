'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
const CurvedTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  background-color: var(--color-white);
  color: var(--color-navy);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const StyledSVG = styled.svg`
  width: 100%;
  height: 500px;
  overflow: visible;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const CurvedText: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const textPath = svgRef.current.querySelector('#textPath');
      gsap.fromTo(textPath,
        {
          attr: { startOffset: '100%' }
        },
        {
          attr: { startOffset: '0%' },
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { // Add scroll trigger for curved text
            trigger: svgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const text = "Environmental Information Systems Lab";
  const radius = 200; // Example radius

  return (
    <CurvedTextContainer>
      <StyledSVG ref={svgRef} viewBox="0 0 500 500">
        <path
          id="curve"
          d={`M 50,250 A ${radius},${radius} 0 1,1 450,250 A ${radius},${radius} 0 1,1 50,250`}
          fill="transparent"
        />
        <text width="500">
          <textPath id="textPath" href="#curve" fontSize="24" fill="var(--color-navy)" textAnchor="middle" startOffset="0%">
            <tspan className="responsive-text">{text}</tspan>
          </textPath>
        </text>
        <style jsx>{`
          @media (max-width: 768px) {
            .responsive-text {
              font-size: 20px;
            }
          }
          @media (max-width: 480px) {
            .responsive-text {
              font-size: 16px;
            }
          }
        `}</style>
      </StyledSVG>
    </CurvedTextContainer>
  );
};

export default CurvedText;

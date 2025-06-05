'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { createTextRevealAnimation } from '../utils/animations';
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

interface CurvedTextProps {
  text?: string;
  radius?: number;
  fontSize?: number;
  animate?: boolean;
  direction?: 'clockwise' | 'counterclockwise';
}

const CurvedText: React.FC<CurvedTextProps> = ({ 
  text = "Environmental Information Systems Lab", 
  radius = 200, 
  fontSize = 24,
  animate = true,
  direction = 'clockwise'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgRef.current && animate) {
      const textPath = svgRef.current.querySelector('#textPath');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate the text path
      timeline.fromTo(textPath,
        {
          attr: { startOffset: direction === 'clockwise' ? '100%' : '0%' }
        },
        {
          attr: { startOffset: direction === 'clockwise' ? '0%' : '100%' },
          duration: 1.5,
          ease: "power2.out"
        }
      );

      // Add rotation animation to the entire SVG
      timeline.fromTo(svgRef.current,
        { rotation: 0 },
        { 
          rotation: direction === 'clockwise' ? 360 : -360, 
          duration: 20, 
          ease: "none",
          repeat: -1 
        },
        0
      );
    }

    // Add text reveal animation for supporting text
    if (textRef.current && animate) {
      createTextRevealAnimation(textRef.current, {
        duration: 0.8,
        stagger: 0.02,
        delay: 0.5
      });
    }
  }, [animate, direction]);

  // Calculate path for different directions
  const getPathData = () => {
    const centerX = 250;
    const centerY = 250;
    
    if (direction === 'clockwise') {
      return `M ${centerX - radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX + radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX - radius},${centerY}`;
    } else {
      return `M ${centerX + radius},${centerY} A ${radius},${radius} 0 1,0 ${centerX - radius},${centerY} A ${radius},${radius} 0 1,0 ${centerX + radius},${centerY}`;
    }
  };

  return (
    <CurvedTextContainer>
      <StyledSVG ref={svgRef} viewBox="0 0 500 500">
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-navy)" />
            <stop offset="50%" stopColor="var(--color-primary-purple)" />
            <stop offset="100%" stopColor="var(--color-light-blue)" />
          </linearGradient>
        </defs>
        <path
          id="curve"
          d={getPathData()}
          fill="transparent"
          stroke="rgba(30, 26, 74, 0.1)"
          strokeWidth="1"
        />
        <text width="500">
          <textPath 
            id="textPath" 
            href="#curve" 
            fontSize={fontSize} 
            fill="url(#textGradient)" 
            textAnchor="middle" 
            startOffset="0%"
            fontWeight="bold"
          >
            {text}
          </textPath>
        </text>
      </StyledSVG>
      
      {animate && (
        <div ref={textRef} style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: 'var(--color-navy)',
          fontSize: '1.2rem',
          fontWeight: '300'
        }}>
          Innovation in Motion
        </div>
      )}
    </CurvedTextContainer>
  );
};

export default CurvedText;

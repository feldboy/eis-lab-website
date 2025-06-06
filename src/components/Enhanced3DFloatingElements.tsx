'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FloatingElements from './FloatingElements';
import FloatingIceCream from './FloatingIceCream';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

interface Enhanced3DFloatingElementsProps {
  count?: number;
  iceCreamCount?: number;
  className?: string;
}

const Enhanced3DFloatingElements: React.FC<Enhanced3DFloatingElementsProps> = ({ 
  count = 6, 
  iceCreamCount = 3,
  className 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [iceCreamPositions, setIceCreamPositions] = useState<Array<{
    x: number;
    y: number;
    z: number;
    flavor: 'vanilla' | 'chocolate' | 'strawberry' | 'mint';
    size: number;
    rotationSpeed: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Generate positions for 3D ice creams
    const positions = Array.from({ length: iceCreamCount }, (_, index) => {
      // Use deterministic positioning based on index
      const seed = index * 12345;
      const rand1 = ((seed >>> 0) % 1000) / 1000;
      const rand2 = (((seed * 16807) >>> 0) % 1000) / 1000;
      const rand3 = (((seed * 48271) >>> 0) % 1000) / 1000;
      const rand4 = (((seed * 69621) >>> 0) % 1000) / 1000;
      const rand5 = (((seed * 123457) >>> 0) % 1000) / 1000;
      
      const flavors: ('vanilla' | 'chocolate' | 'strawberry' | 'mint')[] = 
        ['vanilla', 'chocolate', 'strawberry', 'mint'];
      
      return {
        x: rand1 * 80 + 10, // 10% to 90%
        y: rand2 * 70 + 15, // 15% to 85%
        z: rand3 * 50 - 25, // -25 to 25
        flavor: flavors[index % flavors.length],
        size: 60 + rand4 * 40, // 60 to 100
        rotationSpeed: 0.005 + rand5 * 0.01 // 0.005 to 0.015
      };
    });
    
    setIceCreamPositions(positions);
  }, [iceCreamCount]);

  if (!isClient) {
    return (
      <Container className={className}>
        <FloatingElements count={count} />
      </Container>
    );
  }

  return (
    <Container className={className}>
      {/* Regular 2D floating elements */}
      <FloatingElements count={count} />
      
      {/* 3D floating ice creams */}
      {iceCreamPositions.map((iceCream, index) => (
        <FloatingIceCream
          key={`3d-icecream-${index}`}
          position={{
            x: iceCream.x,
            y: iceCream.y,
            z: iceCream.z
          }}
          flavor={iceCream.flavor}
          size={iceCream.size}
          rotationSpeed={iceCream.rotationSpeed}
        />
      ))}
    </Container>
  );
};

export default Enhanced3DFloatingElements;

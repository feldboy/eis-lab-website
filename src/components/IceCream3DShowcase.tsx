'use client';

import React from 'react';
import styled from 'styled-components';
import IceCream3D from './IceCream3D';

const Section = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 50%, #f0f8ff 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const IceCreamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const IceCreamCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FlavorTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const FlavorDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const IceCreamContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const ShowcaseSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const LargeIceCreamContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
`;

const IceCream3DShowcase: React.FC = () => {
  const flavors = [
    {
      name: 'vanilla',
      title: 'Classic Vanilla',
      description: 'Rich and creamy vanilla ice cream made with real vanilla beans and premium ingredients.'
    },
    {
      name: 'chocolate',
      title: 'Decadent Chocolate',
      description: 'Indulgent chocolate ice cream crafted with finest cocoa and dark chocolate chips.'
    },
    {
      name: 'strawberry',
      title: 'Fresh Strawberry',
      description: 'Sweet and refreshing strawberry ice cream with real fruit pieces and natural flavors.'
    },
    {
      name: 'mint',
      title: 'Cool Mint Chip',
      description: 'Refreshing mint ice cream with chocolate chips for the perfect cooling sensation.'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Our 3D Ice Cream Collection</Title>
        <Subtitle>
          Experience our delicious flavors in stunning 3D. Each ice cream is crafted with love and the finest ingredients.
        </Subtitle>

        <IceCreamGrid>
          {flavors.map((flavor) => (
            <IceCreamCard key={flavor.name}>
              <FlavorTitle>{flavor.title}</FlavorTitle>
              <FlavorDescription>{flavor.description}</FlavorDescription>
              <IceCreamContainer>
                <IceCream3D 
                  flavor={flavor.name as 'vanilla' | 'chocolate' | 'strawberry' | 'mint'}
                  size="medium"
                  animate={true}
                />
              </IceCreamContainer>
            </IceCreamCard>
          ))}
        </IceCreamGrid>

        <ShowcaseSection>
          <LargeIceCreamContainer>
            <Title style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              Featured Ice Cream
            </Title>
            <IceCream3D 
              flavor="vanilla"
              size="large"
              animate={true}
            />
          </LargeIceCreamContainer>
        </ShowcaseSection>
      </Container>
    </Section>
  );
};

export default IceCream3DShowcase;

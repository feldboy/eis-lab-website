import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 2rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Content = styled.div`
  max-width: 800px;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #f0f8ff;
  }

  p {
    opacity: 0.9;
    line-height: 1.6;
  }
`;

export default function AboutPage() {
  return (
    <AboutContainer>
      <Title>About EIS Lab</Title>
      <Content>
        <p>
          EIS Lab is revolutionizing the ice cream industry with cutting-edge research, 
          innovative flavors, and sustainable practices. Our laboratory combines science 
          with creativity to create extraordinary frozen experiences.
        </p>
      </Content>
      
      <FeatureGrid>
        <FeatureCard>
          <h3>🧪 Research & Development</h3>
          <p>
            Our state-of-the-art laboratory develops new textures, flavors, 
            and preservation techniques that push the boundaries of what&apos;s possible in frozen desserts.
          </p>
        </FeatureCard>
        
        <FeatureCard>
          <h3>🌱 Sustainability</h3>
          <p>
            We&apos;re committed to environmental responsibility through eco-friendly packaging, 
            local sourcing, and carbon-neutral production processes.
          </p>
        </FeatureCard>
        
        <FeatureCard>
          <h3>🚀 Innovation</h3>
          <p>
            From molecular gastronomy to AI-powered flavor combinations, 
            we&apos;re constantly exploring new frontiers in ice cream technology.
          </p>
        </FeatureCard>
      </FeatureGrid>
    </AboutContainer>
  );
}

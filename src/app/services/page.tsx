import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem 0;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  &.ai { color: #ff6b6b; }
  &.web { color: #4ecdc4; }
  &.mobile { color: #45b7d1; }
  &.consulting { color: #f9ca24; }
`;

export default function ServicesPage() {
  return (
    <Container>
      <Title>Our Services</Title>
      <ServiceGrid>
        <ServiceCard>
          <IconWrapper className="ai">🤖</IconWrapper>
          <h3>AI Solutions</h3>
          <p>
            Cutting-edge artificial intelligence and machine learning solutions 
            to automate your business processes and unlock new possibilities.
          </p>
        </ServiceCard>
        
        <ServiceCard>
          <IconWrapper className="web">🌐</IconWrapper>
          <h3>Web Development</h3>
          <p>
            Modern, responsive web applications built with the latest technologies
            and frameworks for optimal performance and user experience.
          </p>
        </ServiceCard>
        
        <ServiceCard>
          <IconWrapper className="mobile">📱</IconWrapper>
          <h3>Mobile Apps</h3>
          <p>
            Native and cross-platform mobile applications that deliver 
            exceptional user experiences across all devices.
          </p>
        </ServiceCard>
        
        <ServiceCard>
          <IconWrapper className="consulting">💡</IconWrapper>
          <h3>Tech Consulting</h3>
          <p>
            Strategic technology consulting to help you make informed decisions
            and stay ahead in the digital transformation journey.
          </p>
        </ServiceCard>
      </ServiceGrid>
    </Container>
  );
}

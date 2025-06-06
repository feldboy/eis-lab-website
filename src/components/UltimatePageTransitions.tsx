'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useBarbaTransitions } from '../hooks/useBarbaTransitions';

interface UltimatePageTransitionsProps {
  children: React.ReactNode;
}

const UltimatePageTransitions: React.FC<UltimatePageTransitionsProps> = ({ children }) => {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  
  const { initializeBarba, isTransitioning } = useBarbaTransitions({
    enableParticles: true,
    enableSoundEffects: true,
    transitionDuration: 1.2,
    particleCount: 80
  });

  // קביעת namespace בהתבסס על ה-pathname
  const getNamespaceFromPath = (path: string) => {
    if (path === '/') return 'home';
    if (path.includes('/demo')) return 'demo';
    return 'page';
  };

  useEffect(() => {
    if (typeof window === 'undefined' || initialized.current) return;

    const cleanup = initializeBarba();
    initialized.current = true;

    return cleanup;
  }, [initializeBarba]);

  // אפקטי רקע דינמיים בזמן מעבר
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.transition = 'background 0.5s ease';
      const colors = [
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)'
      ];
      document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    } else {
      setTimeout(() => {
        document.body.style.background = '';
      }, 1000);
    }
  }, [isTransitioning]);

  return (
    <>
      {/* CSS בסיסי לאנימציות */}
      <style jsx global>{`
        html {
          overflow-x: hidden;
        }
        
        body {
          margin: 0;
          padding: 0;
          perspective: 1000px;
        }

        [data-barba="wrapper"] {
          position: relative;
          overflow: hidden;
        }

        [data-barba="container"] {
          position: relative;
          min-height: 100vh;
          will-change: transform, opacity;
        }

        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10000;
        }

        .transition-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* אפקטי זוהר לזמן המעבר */
        .transitioning {
          box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2),
            0 0 80px rgba(255, 255, 255, 0.1);
        }

        /* אפקטים מיוחדים לדפים שונים */
        [data-barba-namespace="home"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        [data-barba-namespace="demo"] {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        /* אנימציות חלקיקים */
        @keyframes particleFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        .transition-particle {
          animation: particleFloat 3s ease-in-out infinite;
        }

        /* אפקטי hover על קישורים */
        a {
          transition: all 0.3s ease;
          will-change: transform;
        }

        a:hover {
          transform: scale(1.05) translateY(-2px);
          text-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* אפקטי loading */
        .loading-indicator {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20000;
          opacity: 0;
          pointer-events: none;
        }

        .loading-indicator.active {
          opacity: 1;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255,255,255,0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* אפקטי זוהר על כפתורים */
        button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        button:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      {/* אינדיקטור loading */}
      <div className={`loading-indicator ${isTransitioning ? 'active' : ''}`}>
        <div className="loading-spinner"></div>
      </div>

      {/* Barba wrapper */}
      <div data-barba="wrapper" ref={wrapperRef} className={isTransitioning ? 'transitioning' : ''}>
        <main 
          data-barba="container" 
          data-barba-namespace={getNamespaceFromPath(pathname)}
          key={pathname}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default UltimatePageTransitions;

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

interface OnePagerTransitionsProps {
  children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const OnePagerTransitions: React.FC<OnePagerTransitionsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // מעברים חלקים בין סקשנים
    const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
    
    sections.forEach((section: HTMLElement, index: number) => {
      // אנימציית כניסה לכל סקשן
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotationX: 45,
          transformOrigin: 'center bottom'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // אפקט חלקיקים בכניסה לסקשן
              createSectionParticles(section);
              // שינוי צבע רקע דינמי
              changeDynamicBackground(index);
            }
          }
        }
      );

      // אנימציות פנימיות לאלמנטים בתוך הסקשן
      const elements = section.querySelectorAll('h1, h2, h3, p, img, button, .animate-element');
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 50,
          rotation: 5
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // ניווט חלק עם מעברים מטורפים
    const setupSmoothNavigation = () => {
      const navLinks = document.querySelectorAll('[data-scroll-to]');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-scroll-to');
          const targetElement = document.querySelector(`[data-section="${targetId}"]`);
          
          if (targetElement) {
            // אפקט "קסם" לפני הגלילה
            createMagicalTransition(() => {
              gsap.to(window, {
                duration: 2,
                scrollTo: {
                  y: targetElement,
                  offsetY: 100
                },
                ease: 'power2.inOut'
              });
            });
          }
        });
      });
    };

    setupSmoothNavigation();      // מעקב אחר כיוון הסקרול ויצירת אפקטים
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // אפקטי פרללקס מתקדמים
      sections.forEach((section: HTMLElement, index: number) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          
          // אפקט הטיה בהתבסס על כיוון הסקרול
          gsap.to(section, {
            skewY: direction === 'down' ? progress * 2 : -progress * 2,
            duration: 0.5,
            ease: 'power2.out'
          });
          
          // אפקט צבע דינמי
          const hue = (progress * 360 + index * 60) % 360;
          section.style.filter = `hue-rotate(${hue}deg) brightness(${1 + progress * 0.2})`;
        }
      });
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // יצירת חלקיקים לסקשן
  const createSectionParticles = (section: HTMLElement) => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'section-particles';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    
    section.style.position = 'relative';
    section.appendChild(particlesContainer);

    // יצירת חלקיקים
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${gsap.utils.random(4, 12)}px;
        height: ${gsap.utils.random(4, 12)}px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
      `;
      
      particlesContainer.appendChild(particle);
      
      // אנימציית חלקיק
      gsap.set(particle, {
        x: gsap.utils.random(0, section.clientWidth),
        y: gsap.utils.random(section.clientHeight * 0.8, section.clientHeight)
      });
      
      gsap.to(particle, {
        opacity: 1,
        y: gsap.utils.random(-50, -200),
        x: `+=${gsap.utils.random(-100, 100)}`,
        duration: gsap.utils.random(2, 4),
        ease: 'power2.out',
        delay: gsap.utils.random(0, 1),
        onComplete: () => particle.remove()
      });
    }
  };

  // שינוי רקע דינמי
  const changeDynamicBackground = (sectionIndex: number) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    gsap.to(document.body, {
      background: colors[sectionIndex % colors.length],
      duration: 1,
      ease: 'power2.out'
    });
  };

  // מעבר קסם
  const createMagicalTransition = (callback: () => void) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%);
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
    `;
    
    document.body.appendChild(overlay);
    
    // אפקט זוהר
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        callback();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.5,
          onComplete: () => overlay.remove()
        });
      }
    });
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Magical Transition Overlay */}
      <div 
        id="magical-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10000,
          background: 'radial-gradient(circle, transparent 0%, rgba(255, 255, 255, 0.1) 100%)',
          opacity: 0
        }}
      />
      
      {children}
    </div>
  );
};

export default OnePagerTransitions;

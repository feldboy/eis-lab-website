'use client';

import { useEffect, useRef } from 'react';
import barba from '@barba/core';
import { gsap } from 'gsap';

interface AdvancedBarbaWrapperProps {
  children: React.ReactNode;
}

const AdvancedBarbaWrapper: React.FC<AdvancedBarbaWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // יצירת overlay לאפקטים מיוחדים
    const createTransitionOverlay = () => {
      let overlay = document.getElementById('barba-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'barba-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          background: transparent;
        `;
        document.body.appendChild(overlay);
      }
      return overlay;
    };

    // יצירת חלקיקים אנימטיביים
    const createParticles = (overlay: HTMLElement, count: number = 50) => {
      overlay.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'transition-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${gsap.utils.random(4, 12)}px;
          height: ${gsap.utils.random(4, 12)}px;
          background: ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 5)]};
          border-radius: 50%;
          opacity: 0;
        `;
        overlay.appendChild(particle);
      }
      return overlay.querySelectorAll('.transition-particle');
    };

    barba.init({
      container: '[data-barba="container"]',
      wrapper: '[data-barba="wrapper"]',
      
      transitions: [
        // מעבר "פיצוץ חלקיקים מטורף"
        {
          name: 'particle-explosion',
          priority: 1,
          leave(data) {
            const current = data.current.container;
            const overlay = createTransitionOverlay();
            const particles = createParticles(overlay, 80);
            
            const timeline = gsap.timeline();

            // הנמק את החלקיקים במרכז המסך
            gsap.set(particles, {
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              scale: 0
            });

            timeline
              // פיצוץ החלקיקים
              .to(particles, {
                opacity: 1,
                scale: gsap.utils.random(0.5, 2),
                x: () => gsap.utils.random(0, window.innerWidth),
                y: () => gsap.utils.random(0, window.innerHeight),
                rotation: () => gsap.utils.random(0, 360),
                duration: 1.2,
                ease: 'power2.out',
                stagger: {
                  amount: 0.4,
                  from: 'center'
                }
              })
              // העלמת העמוד הנוכחי
              .to(current, {
                scale: 0.3,
                rotation: 180,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1,
                ease: 'power2.in'
              }, 0.2);

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const overlay = document.getElementById('barba-overlay');
            const particles = overlay?.querySelectorAll('.transition-particle');
            
            const timeline = gsap.timeline();

            gsap.set(next, {
              scale: 2,
              opacity: 0,
              filter: 'blur(20px)',
              rotation: -180
            });

            timeline
              // החלקיקים מתכנסים ויוצרים את העמוד החדש
              .to(particles, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
                stagger: {
                  amount: 0.3,
                  from: 'edges'
                }
              })
              // הופעת העמוד החדש
              .to(next, {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                rotation: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.8)'
              }, 0.4)
              // ניקוי החלקיקים
              .call(() => {
                if (overlay) overlay.innerHTML = '';
              });

            return timeline;
          }
        },

        // מעבר "קיפול אוריגמי"
        {
          name: 'origami-fold',
          priority: 2,
          leave(data) {
            const current = data.current.container;
            const sections = gsap.utils.toArray(current.children);
            
            const timeline = gsap.timeline();

            // קיפול כל סקשן בזווית שונה
            sections.forEach((section: any, index) => {
              timeline.to(section, {
                rotationX: index % 2 === 0 ? 90 : -90,
                rotationY: index % 3 === 0 ? 45 : -45,
                z: -1000,
                opacity: 0,
                transformOrigin: index % 2 === 0 ? 'top center' : 'bottom center',
                duration: 0.8,
                ease: 'power2.inOut'
              }, index * 0.1);
            });

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const sections = gsap.utils.toArray(next.children);
            
            const timeline = gsap.timeline();

            // הגדרת מצב התחלתי
            gsap.set(sections, {
              rotationX: (index) => index % 2 === 0 ? -90 : 90,
              rotationY: (index) => index % 3 === 0 ? -45 : 45,
              z: 1000,
              opacity: 0
            });

            // פתיחת הקיפולים
            timeline.to(sections, {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              opacity: 1,
              duration: 1,
              ease: 'back.out(1.7)',
              stagger: 0.15
            });

            return timeline;
          }
        },

        // מעבר "גלישת ציפורים"
        {
          name: 'bird-swarm',
          priority: 3,
          leave(data) {
            const current = data.current.container;
            const elements = gsap.utils.toArray(current.querySelectorAll('h1, h2, h3, p, img, button'));
            
            const timeline = gsap.timeline();

            // כל אלמנט "עף" בכיוון אחר
            elements.forEach((element: any, index) => {
              const angle = (index / elements.length) * Math.PI * 2;
              const distance = gsap.utils.random(800, 1500);
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              timeline.to(element, {
                x,
                y,
                rotation: gsap.utils.random(0, 720),
                scale: gsap.utils.random(0.1, 0.3),
                opacity: 0,
                duration: gsap.utils.random(1, 1.5),
                ease: 'power2.in'
              }, index * 0.05);
            });

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const elements = gsap.utils.toArray(next.querySelectorAll('h1, h2, h3, p, img, button'));
            
            const timeline = gsap.timeline();

            // הגדרת מצב התחלתי - מחוץ למסך
            elements.forEach((element: any, index) => {
              const angle = (index / elements.length) * Math.PI * 2;
              const distance = gsap.utils.random(800, 1500);
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              gsap.set(element, {
                x,
                y,
                rotation: gsap.utils.random(0, 720),
                scale: gsap.utils.random(0.1, 0.3),
                opacity: 0
              });
            });

            // "הציפורים חוזרות לקן"
            timeline.to(elements, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
              stagger: {
                amount: 0.8,
                from: 'random'
              }
            });

            return timeline;
          }
        },

        // מעבר "ליקויד מטלטל"
        {
          name: 'liquid-warp',
          priority: 4,
          leave(data) {
            const current = data.current.container;
            const overlay = createTransitionOverlay();
            
            // יצירת אפקט "בועות ליקויד"
            const bubbles = [];
            for (let i = 0; i < 20; i++) {
              const bubble = document.createElement('div');
              bubble.style.cssText = `
                position: absolute;
                width: ${gsap.utils.random(50, 200)}px;
                height: ${gsap.utils.random(50, 200)}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%);
                border-radius: ${gsap.utils.random(30, 60)}% ${gsap.utils.random(40, 70)}% ${gsap.utils.random(30, 60)}% ${gsap.utils.random(40, 70)}%;
                backdrop-filter: blur(10px);
                opacity: 0;
              `;
              overlay.appendChild(bubble);
              bubbles.push(bubble);
            }

            const timeline = gsap.timeline();

            timeline
              // הופעת הבועות
              .to(bubbles, {
                opacity: 0.8,
                x: () => gsap.utils.random(0, window.innerWidth),
                y: () => gsap.utils.random(0, window.innerHeight),
                rotation: () => gsap.utils.random(0, 360),
                duration: 1,
                ease: 'power2.out',
                stagger: 0.1
              })
              // העיוות של העמוד הנוכחי
              .to(current, {
                skewX: 20,
                skewY: 10,
                scaleX: 0.1,
                scaleY: 1.5,
                opacity: 0,
                filter: 'blur(20px)',
                duration: 1.2,
                ease: 'power2.inOut'
              }, 0.3);

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const overlay = document.getElementById('barba-overlay');
            
            const timeline = gsap.timeline();

            gsap.set(next, {
              skewX: -20,
              skewY: -10,
              scaleX: 2,
              scaleY: 0.1,
              opacity: 0,
              filter: 'blur(20px)'
            });

            timeline
              .to(next, {
                skewX: 0,
                skewY: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'elastic.out(1, 0.6)'
              })
              .call(() => {
                if (overlay) overlay.innerHTML = '';
              });

            return timeline;
          }
        },

        // מעבר דיפולט מטורף
        {
          name: 'crazy-default',
          leave(data) {
            const current = data.current.container;
            const randomEffects = [
              () => gsap.to(current, { rotation: 720, scale: 0, opacity: 0, duration: 1, ease: 'power2.in' }),
              () => gsap.to(current, { x: '100%', skewX: 45, opacity: 0, duration: 0.8, ease: 'back.in(2)' }),
              () => gsap.to(current, { y: '-100%', rotationX: 90, opacity: 0, duration: 1, ease: 'power2.inOut' }),
              () => gsap.to(current, { scale: 10, opacity: 0, filter: 'blur(50px)', duration: 0.6, ease: 'power2.in' })
            ];
            
            return randomEffects[Math.floor(Math.random() * randomEffects.length)]();
          },
          enter(data) {
            const next = data.next.container;
            const randomEnters = [
              () => {
                gsap.set(next, { rotation: -720, scale: 0, opacity: 0 });
                return gsap.to(next, { rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' });
              },
              () => {
                gsap.set(next, { x: '-100%', skewX: -45, opacity: 0 });
                return gsap.to(next, { x: '0%', skewX: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.8)' });
              },
              () => {
                gsap.set(next, { y: '100%', rotationX: -90, opacity: 0 });
                return gsap.to(next, { y: '0%', rotationX: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
              },
              () => {
                gsap.set(next, { scale: 0.1, opacity: 0, filter: 'blur(50px)' });
                return gsap.to(next, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'elastic.out(1, 0.5)' });
              }
            ];
            
            return randomEnters[Math.floor(Math.random() * randomEnters.length)]();
          }
        }
      ],

      views: [
        {
          namespace: 'home',
          beforeEnter() {
            console.log('🏠 Entering home with style!');
          }
        },
        {
          namespace: 'demo',
          beforeEnter() {
            console.log('🎨 Entering demo with creativity!');
          }
        }
      ]
    });

    // Hook נוסף לאפקטים גלובליים
    barba.hooks.before(() => {
      // אפקט זוהר על הגוף
      gsap.to(document.body, {
        boxShadow: `0 0 100px rgba(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, 0.3)`,
        duration: 0.5
      });
    });

    barba.hooks.after(() => {
      // איפוס האפקטים
      setTimeout(() => {
        gsap.to(document.body, {
          boxShadow: 'none',
          duration: 1
        });
      }, 1500);
    });

    return () => {
      barba.destroy();
      const overlay = document.getElementById('barba-overlay');
      if (overlay) overlay.remove();
    };
  }, []);

  return (
    <div data-barba="wrapper" ref={wrapperRef}>
      <main data-barba="container" data-barba-namespace="home">
        {children}
      </main>
    </div>
  );
};

export default AdvancedBarbaWrapper;

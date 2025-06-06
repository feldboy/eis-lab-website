'use client';

import { useEffect, useRef } from 'react';
import barba from '@barba/core';
import { gsap } from 'gsap';

interface BarbaWrapperProps {
  children: React.ReactNode;
}

const BarbaWrapper: React.FC<BarbaWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // אתחול Barba.js
    barba.init({
      container: '[data-barba="container"]',
      wrapper: '[data-barba="wrapper"]',
      
      // מעברים מתקדמים ויצירתיים
      transitions: [
        // מעבר החלקה מצדדים עם אפקט "דלתות"
        {
          name: 'slide-doors',
          priority: 1,
          from: { namespace: ['home'] },
          to: { namespace: ['demo'] },
          leave(data) {
            const current = data.current.container;
            const timeline = gsap.timeline();
            
            // חלק את המסך לשני חלקים ופתח כמו דלתות
            const leftHalf = gsap.utils.toArray(current.children).slice(0, Math.ceil(current.children.length / 2));
            const rightHalf = gsap.utils.toArray(current.children).slice(Math.ceil(current.children.length / 2));

            timeline
              .to(leftHalf, {
                x: '-100%',
                duration: 0.8,
                ease: 'power2.inOut',
                stagger: 0.1
              }, 0)
              .to(rightHalf, {
                x: '100%',
                duration: 0.8,
                ease: 'power2.inOut',
                stagger: 0.1
              }, 0)
              .set(current, { display: 'none' });

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const timeline = gsap.timeline();
            
            gsap.set(next, { 
              opacity: 0,
              scale: 0.8,
              rotationY: 90
            });

            timeline
              .set(next, { display: 'block' })
              .to(next, {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1,
                ease: 'back.out(1.7)'
              });

            return timeline;
          }
        },

        // מעבר בסגנון "זום מטורף" עם רוטציה
        {
          name: 'crazy-zoom-rotate',
          priority: 2,
          from: { namespace: ['demo'] },
          to: { namespace: ['home'] },
          leave(data) {
            const current = data.current.container;
            
            return gsap.to(current, {
              scale: 0.1,
              rotation: 360 * 3,
              opacity: 0,
              duration: 1.2,
              ease: 'power3.in',
              transformOrigin: 'center center'
            });
          },
          enter(data) {
            const next = data.next.container;
            
            gsap.set(next, {
              scale: 10,
              rotation: -360 * 2,
              opacity: 0
            });

            return gsap.to(next, {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'elastic.out(1, 0.5)'
            });
          }
        },

        // מעבר "גלישה מהחלל" מלמעלה
        {
          name: 'space-slide',
          priority: 3,
          leave(data) {
            const current = data.current.container;
            const timeline = gsap.timeline();

            // אפקט פיצוץ של אלמנטים
            const elements = gsap.utils.toArray(current.querySelectorAll('*'));
            
            timeline
              .to(elements, {
                y: gsap.utils.random(-2000, -1000),
                x: gsap.utils.random(-500, 500),
                rotation: gsap.utils.random(-360, 360),
                scale: gsap.utils.random(0.1, 0.3),
                opacity: 0,
                duration: 1,
                ease: 'power2.in',
                stagger: {
                  amount: 0.3,
                  from: 'random'
                }
              });

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const timeline = gsap.timeline();
            
            // העמוד החדש "צונח" מהחלל
            gsap.set(next, {
              y: -window.innerHeight * 2,
              scale: 0.3,
              rotation: 720,
              opacity: 0
            });

            timeline
              .to(next, {
                y: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.8,
                ease: 'bounce.out'
              })
              .from(next.children, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.1
              }, '-=1');

            return timeline;
          }
        },

        // מעבר "ליקויד" - זורם כמו נוזל
        {
          name: 'liquid-flow',
          priority: 4,
          leave(data) {
            const current = data.current.container;
            const timeline = gsap.timeline();

            // יצירת אפקט גלים
            timeline
              .to(current, {
                scaleY: 0,
                transformOrigin: 'top center',
                duration: 0.8,
                ease: 'power2.inOut'
              })
              .to(current, {
                scaleX: 0,
                transformOrigin: 'center center',
                duration: 0.4,
                ease: 'power2.inOut'
              }, '-=0.3');

            return timeline;
          },
          enter(data) {
            const next = data.next.container;
            const timeline = gsap.timeline();

            gsap.set(next, {
              scaleX: 0,
              scaleY: 0,
              opacity: 0
            });

            // העמוד "מתנפח" כמו בלון
            timeline
              .to(next, {
                scaleX: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.8)'
              })
              .to(next, {
                scaleY: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'elastic.out(1, 0.6)'
              }, '-=0.3');

            return timeline;
          }
        },

        // מעבר דיפולט יצירתי
        {
          name: 'creative-default',
          leave(data) {
            const current = data.current.container;
            const direction = Math.random() > 0.5 ? 1 : -1;
            
            return gsap.to(current, {
              x: `${direction * 100}%`,
              rotation: direction * 45,
              scale: 0.8,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            });
          },
          enter(data) {
            const next = data.next.container;
            const direction = Math.random() > 0.5 ? 1 : -1;
            
            gsap.set(next, {
              x: `${-direction * 100}%`,
              rotation: -direction * 45,
              scale: 1.2,
              opacity: 0
            });

            return gsap.to(next, {
              x: '0%',
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power2.out'
            });
          }
        }
      ],

      // Views עבור דפים שונים
      views: [
        {
          namespace: 'home',
          beforeEnter() {
            // אנימציות מיוחדות לדף הבית
            console.log('Entering home page');
          }
        },
        {
          namespace: 'demo',
          beforeEnter() {
            // אנימציות מיוחדות לדף הדמו
            console.log('Entering demo page');
          }
        }
      ]
    });

    // אירועי Barba.js
    barba.hooks.before(() => {
      // החל רקע מעבר דינמי
      document.body.style.background = `linear-gradient(45deg, 
        hsl(${Math.random() * 360}, 70%, 10%), 
        hsl(${Math.random() * 360}, 70%, 20%))`;
    });

    barba.hooks.after(() => {
      // איפוס הרקע
      setTimeout(() => {
        document.body.style.background = '';
      }, 1000);
    });

    return () => {
      barba.destroy();
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

export default BarbaWrapper;

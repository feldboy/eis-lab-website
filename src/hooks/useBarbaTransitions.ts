'use client';

import { useEffect, useRef, useState } from 'react';
import barba from '@barba/core';
import { gsap } from 'gsap';

interface UseBarbaTransitionsOptions {
  enableParticles?: boolean;
  enableSoundEffects?: boolean;
  transitionDuration?: number;
  particleCount?: number;
}

export const useBarbaTransitions = (options: UseBarbaTransitionsOptions = {}) => {
  const {
    enableSoundEffects = false,
    transitionDuration = 1,
  } = options;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentNamespace, setCurrentNamespace] = useState('home');
  const audioContextRef = useRef<AudioContext | null>(null);

  // יצירת צלילים פרוצדורליים
  const createTransitionSound = (frequency: number = 440, duration: number = 0.3) => {
    if (!enableSoundEffects || !audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  // יצירת מעברים דינמיים בהתבסס על זמן היום
  const getTimeBasedTransition = () => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
      // בוקר - מעברים עדינים וחמים
      return 'morning-gentle';
    } else if (hour >= 12 && hour < 18) {
      // צהריים - מעברים אנרגטיים
      return 'afternoon-energetic';
    } else if (hour >= 18 && hour < 22) {
      // ערב - מעברים דרמטיים
      return 'evening-dramatic';
    } else {
      // לילה - מעברים מיסטיים
      return 'night-mystical';
    }
  };

  // מעברי זמן יום
  const timeBasedTransitions = {
    'morning-gentle': {
      leave: (container: Element) => {
        createTransitionSound(523.25, 0.5); // C5
        return gsap.to(container, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          filter: 'brightness(1.2) blur(5px)',
          duration: transitionDuration * 0.8,
          ease: 'power1.out'
        });
      },
      enter: (container: Element) => {
        gsap.set(container, { opacity: 0, y: 50, scale: 1.05 });
        return gsap.to(container, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          duration: transitionDuration,
          ease: 'power2.out'
        });
      }
    },
    'afternoon-energetic': {
      leave: (container: Element) => {
        createTransitionSound(659.25, 0.3); // E5
        const elements = container.querySelectorAll('*');
        return gsap.to(elements, {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-180, 180),
          scale: () => gsap.utils.random(0.1, 0.5),
          opacity: 0,
          duration: transitionDuration * 0.7,
          ease: 'power2.in',
          stagger: {
            amount: 0.3,
            from: 'center'
          }
        });
      },
      enter: (container: Element) => {
        const elements = container.querySelectorAll('*');
        gsap.set(elements, {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-180, 180),
          scale: () => gsap.utils.random(0.5, 1.5),
          opacity: 0
        });
        return gsap.to(elements, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: transitionDuration * 1.2,
          ease: 'back.out(1.7)',
          stagger: {
            amount: 0.4,
            from: 'random'
          }
        });
      }
    },
    'evening-dramatic': {
      leave: (container: Element) => {
        createTransitionSound(311.13, 0.8); // Eb4
        return gsap.to(container, {
          rotationX: 90,
          z: -1000,
          opacity: 0,
          transformOrigin: 'center top',
          duration: transitionDuration,
          ease: 'power2.inOut'
        });
      },
      enter: (container: Element) => {
        gsap.set(container, { rotationX: -90, z: 1000, opacity: 0 });
        return gsap.to(container, {
          rotationX: 0,
          z: 0,
          opacity: 1,
          duration: transitionDuration * 1.3,
          ease: 'power2.out'
        });
      }
    },
    'night-mystical': {
      leave: (container: Element) => {
        createTransitionSound(196, 1); // G3
        return gsap.to(container, {
          scale: 0.1,
          rotation: 360,
          opacity: 0,
          filter: 'hue-rotate(180deg) blur(10px)',
          duration: transitionDuration * 1.2,
          ease: 'power2.in'
        });
      },
      enter: (container: Element) => {
        gsap.set(container, { 
          scale: 3, 
          rotation: -360, 
          opacity: 0, 
          filter: 'hue-rotate(180deg) blur(10px)' 
        });
        return gsap.to(container, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: 'hue-rotate(0deg) blur(0px)',
          duration: transitionDuration * 1.5,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    }
  };

  const initializeBarba = () => {
    if (!audioContextRef.current && enableSoundEffects) {
      try {
        audioContextRef.current = new AudioContext();
      } catch {
        console.warn('Web Audio API not supported');
      }
    }

    barba.init({
      container: '[data-barba="container"]',
      wrapper: '[data-barba="wrapper"]',
      
      transitions: [
        // מעבר דינמי מבוסס זמן
        {
          name: 'time-based-transition',
          priority: 1,
          leave(data) {
            setIsTransitioning(true);
            const transitionType = getTimeBasedTransition();
            const transition = timeBasedTransitions[transitionType as keyof typeof timeBasedTransitions];
            return transition.leave(data.current.container);
          },
          enter(data) {
            const transitionType = getTimeBasedTransition();
            const transition = timeBasedTransitions[transitionType as keyof typeof timeBasedTransitions];
            const namespace = data.next.namespace;
            setCurrentNamespace(namespace);
            
            const promise = transition.enter(data.next.container);
            promise.then(() => {
              setIsTransitioning(false);
            });
            
            return promise;
          }
        },

        // מעבר אינטראקטיבי מבוסס מהירות עכבר
        {
          name: 'mouse-speed-transition',
          priority: 2,
          leave(data) {
            const mouseSpeed = (window as any).mouseSpeed || 1;
            const intensity = Math.min(mouseSpeed / 100, 3);
            
            createTransitionSound(440 * intensity, 0.5);
            
            return gsap.to(data.current.container, {
              x: intensity * 200,
              rotation: intensity * 45,
              scale: 1 - (intensity * 0.3),
              opacity: 0,
              duration: transitionDuration / intensity,
              ease: 'power2.in'
            });
          },
          enter(data) {
            const mouseSpeed = (window as any).mouseSpeed || 1;
            const intensity = Math.min(mouseSpeed / 100, 3);
            
            gsap.set(data.next.container, {
              x: -intensity * 200,
              rotation: -intensity * 45,
              scale: 1 + (intensity * 0.3),
              opacity: 0
            });
            
            return gsap.to(data.next.container, {
              x: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: transitionDuration * intensity,
              ease: 'elastic.out(1, 0.7)'
            });
          }
        }
      ],

      views: [
        {
          namespace: 'home',
          beforeEnter() {
            document.body.style.backgroundColor = '#1a1a2e';
          }
        },
        {
          namespace: 'demo',
          beforeEnter() {
            document.body.style.backgroundColor = '#16213e';
          }
        }
      ]
    });

    // מעקב אחר מהירות העכבר
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastMouseTime = Date.now();

    const trackMouseSpeed = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastMouseTime;
      
      if (deltaTime > 0) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const speed = distance / deltaTime;
        
        (window as any).mouseSpeed = speed;
      }
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      lastMouseTime = currentTime;
    };

    document.addEventListener('mousemove', trackMouseSpeed);

    return () => {
      document.removeEventListener('mousemove', trackMouseSpeed);
      barba.destroy();
    };
  };

  return {
    initializeBarba,
    isTransitioning,
    currentNamespace,
    createTransitionSound
  };
};

export default useBarbaTransitions;

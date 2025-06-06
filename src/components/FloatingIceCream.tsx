'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

interface FloatingIceCreamProps {
  position?: { x: number; y: number; z: number };
  flavor?: 'vanilla' | 'chocolate' | 'strawberry' | 'mint';
  size?: number;
  rotationSpeed?: number;
}

const Container = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: absolute;
  pointer-events: none;
  opacity: 0.7;
`;

const FloatingIceCream: React.FC<FloatingIceCreamProps> = ({
  position = { x: 0, y: 0, z: 0 },
  flavor = 'vanilla',
  size = 100,
  rotationSpeed = 0.01
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const flavorColors = useMemo(() => ({
    vanilla: '#FFF8DC',
    chocolate: '#8B4513',
    strawberry: '#FFB6C1',
    mint: '#98FB98'
  }), []);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current; // Store reference for cleanup

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create simple ice cream
    const coneGeometry = new THREE.ConeGeometry(0.3, 1, 6);
    const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xD2691E });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = -0.5;
    scene.add(cone);

    // Ice cream scoop
    const scoopGeometry = new THREE.SphereGeometry(0.4, 8, 8);
    const scoopMaterial = new THREE.MeshPhongMaterial({ 
      color: flavorColors[flavor],
      shininess: 20
    });
    const scoop = new THREE.Mesh(scoopGeometry, scoopMaterial);
    scoop.position.y = 0.2;
    scene.add(scoop);

    // Small cherry
    const cherryGeometry = new THREE.SphereGeometry(0.05, 6, 6);
    const cherryMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const cherry = new THREE.Mesh(cherryGeometry, cherryMaterial);
    cherry.position.y = 0.65;
    scene.add(cherry);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      scene.rotation.y += rotationSpeed;
      scene.rotation.x += rotationSpeed * 0.5;
      
      // Floating motion
      const time = Date.now() * 0.001;
      scene.position.y = Math.sin(time + position.x) * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [flavor, size, rotationSpeed, position, flavorColors]);

  return (
    <Container 
      ref={mountRef} 
      size={size}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translateZ(${position.z}px)`
      }}
    />
  );
};

export default FloatingIceCream;

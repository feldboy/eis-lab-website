'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

interface IceCream3DProps {
  flavor?: 'vanilla' | 'chocolate' | 'strawberry' | 'mint';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animate?: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IceCream3D: React.FC<IceCream3DProps> = ({ 
  flavor = 'vanilla', 
  size = 'medium',
  className,
  animate = true 
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

  const sizes = useMemo(() => ({
    small: { width: 200, height: 200, scale: 0.8 },
    medium: { width: 300, height: 300, scale: 1.0 },
    large: { width: 400, height: 400, scale: 1.2 }
  }), []);

  useEffect(() => {
    if (!mountRef.current) return;

    const { width, height, scale } = sizes[size];
    const currentMount = mountRef.current; // Store reference for cleanup
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9ff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-10, -10, 5);
    scene.add(pointLight);

    // Create ice cream cone
    const coneGeometry = new THREE.ConeGeometry(0.8, 2.5, 8);
    const coneMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xD2691E,
      transparent: true,
      opacity: 0.9
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = -1.5;
    cone.castShadow = true;
    cone.receiveShadow = true;
    scene.add(cone);

    // Add waffle pattern to cone
    // Create a simple grid pattern programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = '#A0522D';
    ctx.lineWidth = 2;
    for (let i = 0; i < 64; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 64);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(64, i);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    coneMaterial.map = texture;

    // Create ice cream scoops
    const scoopMaterial = new THREE.MeshPhongMaterial({ 
      color: flavorColors[flavor],
      shininess: 30,
      transparent: true,
      opacity: 0.95
    });

    // Bottom scoop (largest)
    const bottomScoopGeometry = new THREE.SphereGeometry(0.9, 16, 16);
    const bottomScoop = new THREE.Mesh(bottomScoopGeometry, scoopMaterial);
    bottomScoop.position.y = 0.5;
    bottomScoop.castShadow = true;
    bottomScoop.receiveShadow = true;
    scene.add(bottomScoop);

    // Middle scoop
    const middleScoopGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const middleScoop = new THREE.Mesh(middleScoopGeometry, scoopMaterial);
    middleScoop.position.y = 1.3;
    middleScoop.castShadow = true;
    middleScoop.receiveShadow = true;
    scene.add(middleScoop);

    // Top scoop (smallest)
    const topScoopGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const topScoop = new THREE.Mesh(topScoopGeometry, scoopMaterial);
    topScoop.position.y = 2.0;
    topScoop.castShadow = true;
    topScoop.receiveShadow = true;
    scene.add(topScoop);

    // Add cherry on top
    const cherryGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const cherryMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    const cherry = new THREE.Mesh(cherryGeometry, cherryMaterial);
    cherry.position.y = 2.8;
    cherry.castShadow = true;
    scene.add(cherry);

    // Cherry stem
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
    const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 2.95;
    scene.add(stem);

    // Scale the entire scene
    scene.scale.set(scale, scale, scale);

    // Animation
    const animate = () => {
      if (!animate) return;
      
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate the ice cream slowly
      scene.rotation.y += 0.005;
      
      // Subtle floating animation
      const time = Date.now() * 0.001;
      scene.position.y = Math.sin(time) * 0.1;
      
      renderer.render(scene, camera);
    };

    if (animate) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

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
  }, [flavor, size, animate, flavorColors, sizes]);

  return <Container ref={mountRef} className={className} />;
};

export default IceCream3D;

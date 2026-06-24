import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralSphere = () => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const pointsRef = useRef();

  // Generate random points for "Neural Nodes" on the surface
  const particlesCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Math for points on a sphere
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.2; // Slightly larger than core sphere
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  // Animation Loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow breathing rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = time * 0.03;

      // Mouse reactive parallax
      const targetX = (state.pointer.x * Math.PI) * 0.05;
      const targetY = (state.pointer.y * Math.PI) * 0.05;
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }

    // Breathing effect (scale)
    if (sphereRef.current) {
      const scale = 1 + Math.sin(time * 0.5) * 0.02;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Luxury Wireframe */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[2, 4]} />
        <meshStandardMaterial 
          color="#b89b5e" 
          wireframe={true} 
          transparent={true}
          opacity={0.15}
        />
      </mesh>

      {/* Solid Inner Core to hide backface wireframes slightly */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#0f0f0d" />
      </mesh>

      {/* Neural Nodes (Particles) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#b89b5e" 
          size={0.02} 
          transparent={true} 
          opacity={0.8}
        />
      </points>

      {/* Lighting setup for premium reflections */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#b89b5e" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#1e3226" />
    </group>
  );
};

export default NeuralSphere;
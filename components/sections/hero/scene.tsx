"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera, useTexture, Environment, Float, Text3D } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { Group, Mesh, Vector3 } from "three";
import { motion } from "framer-motion-3d";
import { useScroll } from "framer-motion";

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dummy = new THREE.Object3D();
  
  // Set up initial positions
  useEffect(() => {
    // Create particle positions
    if (mesh.current) {
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const colors = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        scales[i] = Math.random() * 0.2 + 0.05;
        
        // Generate random colors within our theme palette
        if (i % 4 === 0) {
          // Primary color - purple-ish
          colors[i3] = 0.6 + Math.random() * 0.3; // R
          colors[i3 + 1] = 0.3 + Math.random() * 0.2; // G
          colors[i3 + 2] = 0.9 + Math.random() * 0.1; // B
        } else if (i % 4 === 1) {
          // Secondary color - cyan/teal
          colors[i3] = 0.2 + Math.random() * 0.1; // R
          colors[i3 + 1] = 0.6 + Math.random() * 0.3; // G
          colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
        } else if (i % 4 === 2) {
          // Accent color - pink/magenta
          colors[i3] = 0.8 + Math.random() * 0.2; // R
          colors[i3 + 1] = 0.2 + Math.random() * 0.1; // G
          colors[i3 + 2] = 0.6 + Math.random() * 0.3; // B
        } else {
          // White-ish glow
          colors[i3] = 0.9 + Math.random() * 0.1; // R
          colors[i3 + 1] = 0.9 + Math.random() * 0.1; // G
          colors[i3 + 2] = 0.9 + Math.random() * 0.1; // B
        }
      }
      
      // Store original positions for animation
      mesh.current.userData.positions = positions.slice();
      mesh.current.userData.originalPositions = positions.slice();
      mesh.current.userData.scales = scales;
      
      // Set colors
      const colorAttribute = new THREE.InstancedBufferAttribute(colors, 3);
      mesh.current.instanceColor = colorAttribute;
    }
  }, [count]);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Animate particles
  useFrame((state, delta) => {
    if (mesh.current) {
      const positions = mesh.current.userData.positions;
      const originalPositions = mesh.current.userData.originalPositions;
      const scales = mesh.current.userData.scales;
      const time = state.clock.getElapsedTime();
      
      // Mouse influence strength
      const mouseStrength = 0.05;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Get original position
        const originalX = originalPositions[i3];
        const originalY = originalPositions[i3 + 1];
        const originalZ = originalPositions[i3 + 2];
        
        // Calculate noise-based movement
        const noise1 = Math.sin(time * 0.2 + i * 0.01) * 0.2;
        const noise2 = Math.cos(time * 0.2 + i * 0.01) * 0.2;
        const noise3 = Math.sin(time * 0.2 + i * 0.02) * 0.2;
        
        // Apply mouse influence
        const mouseInfluenceX = mousePosition.current.x * mouseStrength;
        const mouseInfluenceY = mousePosition.current.y * mouseStrength;
        
        // Set new positions with smooth blending
        positions[i3] = originalX + noise1 + mouseInfluenceX * (Math.abs(originalY) / 10);
        positions[i3 + 1] = originalY + noise2 + mouseInfluenceY * (Math.abs(originalX) / 10);
        positions[i3 + 2] = originalZ + noise3;
        
        // Set position and scale for each instance
        dummy.position.set(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );
        
        // Pulse scale with time
        const scale = scales[i] * (1 + Math.sin(time * 2 + i) * 0.2);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        // Update the instanced mesh
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial transparent opacity={0.5} />
    </instancedMesh>
  );
}

function Logo({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<Group>(null);
  
  // Animate with subtle floating motion
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    }
  });
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <group ref={ref}>
        <Text3D
          font="/fonts/inter_bold.json"
          size={1.2}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-3.5, 0, 0]}
        >
          INFOTSAV
          <meshStandardMaterial
            color="#9f75ff"
            emissive="#5920e7"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Text3D>
      </group>
    </Float>
  );
}

export default function InfotsavScene() {
  const { camera } = useThree();
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<Group>(null);
  
  // Handle scroll-based camera position
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (camera instanceof THREE.PerspectiveCamera) {
        // Move camera based on scroll
        camera.position.y = 1 - latest * 3;
        camera.position.z = 10 - latest * 5;
        camera.lookAt(0, 0, 0);
      }
    });
  }, [camera, scrollYProgress]);
  
  // Mouse rotation for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (groupRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Apply subtle rotation based on mouse position
        groupRef.current.rotation.y = mouseX * 0.1;
        groupRef.current.rotation.x = mouseY * 0.1;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <>
      {/* Scene lighting */}
      <color attach="background" args={["#050510"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} color="#ff00ff" intensity={0.5} />
      <pointLight position={[0, 5, 5]} color="#00ffff" intensity={0.5} />
      
      {/* Main scene group with parallax effect */}
      <group ref={groupRef}>
        {/* Animated logo */}
        <Logo position={[0, 1, 0]} />
        
        {/* Particle system */}
        <Particles count={1500} />
      </group>
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
        />
      </EffectComposer>
      
      {/* Environment and scene controls */}
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useReducedMotion } from 'framer-motion';
import { OrbitControls, ContactShadows } from '@react-three/drei';

// Robot Head Component - using basic geometries
const RobotHead = ({ isAnimating }: { isAnimating: boolean }) => {
  const headRef = useRef<Group>(null);
  const eyeLeftRef = useRef<Mesh>(null);
  const eyeRightRef = useRef<Mesh>(null);

  // Idle head movement
  useFrame((state) => {
    if (!headRef.current || !isAnimating) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle head bob
    headRef.current.position.y = Math.sin(time * 0.8) * 0.03;
    headRef.current.rotation.x = Math.sin(time * 0.6) * 0.03;
    headRef.current.rotation.z = Math.sin(time * 0.7) * 0.02;
    
    // Eye blinking
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blinkCycle = Math.sin(time * 2) > 0.95 ? 1 : 0;
      const blinkAmount = blinkCycle * 0.8;
      
      eyeLeftRef.current.scale.y = 1 - blinkAmount;
      eyeRightRef.current.scale.y = 1 - blinkAmount;
    }
  });

  return (
    <group ref={headRef}>
      {/* Main Head - large rounded box, chibi style - smooth matte plastic */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.65, 0.5]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
      
      {/* Face Visor - highly glossy reflective black glass */}
      <mesh position={[0, 0.15, 0.26]} castShadow>
        <boxGeometry args={[0.35, 0.5, 0.02]} />
        <meshPhysicalMaterial 
          color="#0a0a0a" 
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.1}
        />
      </mesh>
      
      {/* Left Eye - bright glowing white square */}
      <mesh ref={eyeLeftRef} position={[-0.08, 0.1, 0.28]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={3.5}
        />
      </mesh>
      
      {/* Right Eye - bright glowing white square */}
      <mesh ref={eyeRightRef} position={[0.08, 0.1, 0.28]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={3.5}
        />
      </mesh>
      
      {/* Left side square protrusion - ear piece/sensor */}
      <mesh position={[-0.28, 0.15, 0]} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
};

// Robot Body Component
const RobotBody = ({ isAnimating }: { isAnimating: boolean }) => {
  const bodyRef = useRef<Group>(null);
  const leftFootRef = useRef<Mesh>(null);
  const rightFootRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!isAnimating) return;
    
    const time = state.clock.elapsedTime;
    const walkSpeed = 3; // Walking cycle speed
    
    // Walking animation for feet
    if (leftFootRef.current && rightFootRef.current) {
      // Left foot - forward/back and up/down
      leftFootRef.current.position.z = Math.sin(time * walkSpeed) * 0.04;
      leftFootRef.current.position.y = Math.max(0, Math.sin(time * walkSpeed)) * 0.02;
      
      // Right foot - opposite phase
      rightFootRef.current.position.z = Math.sin(time * walkSpeed + Math.PI) * 0.04;
      rightFootRef.current.position.y = Math.max(0, Math.sin(time * walkSpeed + Math.PI)) * 0.02;
    }
    
    // Arm swing (opposite to legs)
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * walkSpeed + Math.PI) * 0.2;
      rightArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.2;
    }
    
    // Body bob while walking
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(time * walkSpeed * 2)) * 0.01;
      bodyRef.current.rotation.z = Math.sin(time * walkSpeed) * 0.03;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Main Body - tiny cylindrical body - smooth matte plastic */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
      
      {/* Left Arm - small nub */}
      <mesh ref={leftArmRef} position={[-0.16, -0.08, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
      
      {/* Right Arm - small nub */}
      <mesh ref={rightArmRef} position={[0.16, -0.08, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
      
      {/* Legs/Feet */}
      <group position={[0, -0.22, 0]}>
        {/* Left foot */}
        <mesh ref={leftFootRef} position={[-0.06, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, 0.1]} />
          <meshStandardMaterial 
            color="#3d4852" 
            metalness={0.0}
            roughness={0.95}
          />
        </mesh>
        
        {/* Right foot */}
        <mesh ref={rightFootRef} position={[0.06, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.06, 0.1]} />
          <meshStandardMaterial 
            color="#3d4852" 
            metalness={0.0}
            roughness={0.95}
          />
        </mesh>
      </group>
    </group>
  );
};

// Complete Robot Component
const Robot = ({ isAnimating }: { isAnimating: boolean }) => {
  const robotRef = useRef<Group>(null);

  useFrame((state) => {
    if (!robotRef.current || !isAnimating) return;
    
    const time = state.clock.elapsedTime;
    
    // Walk left and right
    const walkCycle = Math.sin(time * 0.5); // Slow back and forth
    robotRef.current.position.x = walkCycle * 0.3; // Move left/right
    
    // Face walking direction
    robotRef.current.rotation.y = walkCycle > 0 ? -0.3 : 0.3;
  });

  return (
    <group 
      ref={robotRef}
      position={[0, -1.2, 0]}
    >
      <RobotHead isAnimating={isAnimating} />
      <RobotBody isAnimating={isAnimating} />
    </group>
  );
};

// Main CuteRobot Component
const CuteRobot = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(!shouldReduceMotion);

  useEffect(() => {
    setIsAnimating(!shouldReduceMotion);
  }, [shouldReduceMotion]);

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0.2, 1.8], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        dpr={[1, 2]}
        shadows
      >
        {/* Interactive controls - allows rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        {/* Soft studio lighting - professional product render style */}
        <ambientLight intensity={1.2} />
        <directionalLight 
          position={[3, 4, 3]} 
          intensity={1.8} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={10}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
        />
        <directionalLight position={[-2, 2, -1]} intensity={0.6} />
        <pointLight position={[0, 3, 2]} intensity={0.5} />
        <hemisphereLight intensity={0.4} />
        
        {/* Soft contact shadows on ground */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={2}
          blur={2}
          far={0.5}
          resolution={256}
        />
        
        {/* Robot */}
        <Robot isAnimating={isAnimating} />
      </Canvas>
    </div>
  );
};

export default CuteRobot;

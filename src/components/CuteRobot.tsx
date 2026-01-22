
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  Cylinder,
  SpotLight
} from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";

// --- MATERIALS ---
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: "#374151", // Matte Gunmetal
  roughness: 0.6,
  metalness: 0.2,
  clearcoat: 0.05,
  clearcoatRoughness: 0.2,
});

// Matte Black Screen (Not glass, looks key part of head)
const screenMaterial = new THREE.MeshStandardMaterial({
  color: "#111111",
  roughness: 0.4,   // Satin finish, not glassy
  metalness: 0.2,
});

const eyeMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#ffffff",
  emissiveIntensity: 15,
  toneMapped: false,
});

const cactusMaterial = new THREE.MeshStandardMaterial({
  color: "#4ade80",
  roughness: 0.5,
});

const pebbleMaterial = new THREE.MeshStandardMaterial({
  color: "#6b7280",
  roughness: 0.8,
});

// --- COMPONENTS ---
const Cactus = () => {
  return (
    <group position={[1.2, -1.0, 0.2]} scale={0.4} rotation={[0, -0.2, 0]}>
      <Cylinder args={[0.35, 0.35, 1.2, 32]} position={[0, 0.6, 0]} receiveShadow castShadow>
        <primitive object={cactusMaterial} />
      </Cylinder>
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <primitive object={cactusMaterial} />
      </mesh>

      <group position={[0.25, 0.5, 0]} rotation={[0, 0, -0.8]}>
        <Cylinder args={[0.2, 0.2, 0.6, 32]} position={[0, 0.3, 0]} castShadow>
          <primitive object={cactusMaterial} />
        </Cylinder>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <primitive object={cactusMaterial} />
        </mesh>
      </group>
    </group>
  );
};

const Pebbles = () => {
  return (
    <group>
      <mesh position={[0.8, -1.05, 0.8]} scale={[1, 0.6, 0.8]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <primitive object={pebbleMaterial} />
      </mesh>
      <mesh position={[-0.8, -1.05, 0.5]} scale={[0.8, 0.5, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.09, 32, 32]} />
        <primitive object={pebbleMaterial} />
      </mesh>
    </group>
  );
};

const RobotHead = () => {
  const headGroup = useRef<Group>(null);

  return (
    <group ref={headGroup}>
      <RoundedBox args={[1.6, 1.4, 1.4]} radius={0.6} smoothness={10} castShadow receiveShadow>
        <primitive object={bodyMaterial} />
      </RoundedBox>

      {/* Screen - Flush decal style */}
      <group position={[0, 0.05, 0.7]}>
        <RoundedBox args={[1.0, 0.8, 0.02]} radius={0.2} smoothness={4}>
          <primitive object={screenMaterial} />
        </RoundedBox>
      </group>

      {/* Eyes - Directly on screen */}
      <group position={[0, 0.0, 0.72]}>
        <mesh position={[-0.22, 0.05, 0]}>
          <planeGeometry args={[0.16, 0.2]} />
          <primitive object={eyeMaterial} />
        </mesh>
        <mesh position={[0.22, 0.05, 0]}>
          <planeGeometry args={[0.16, 0.2]} />
          <primitive object={eyeMaterial} />
        </mesh>
      </group>

      <RoundedBox args={[0.25, 0.5, 0.3]} radius={0.12} smoothness={4} position={[-0.85, 0, 0]} castShadow>
        <primitive object={bodyMaterial} />
      </RoundedBox>
    </group>
  );
};

const RobotBody = () => {
  return (
    <group position={[0, -1.0, 0]}>
      <Cylinder args={[0.5, 0.6, 0.8, 64]} castShadow receiveShadow position={[0, 0.1, 0]}>
        <primitive object={bodyMaterial} />
      </Cylinder>

      <group position={[-0.6, 0.1, 0]} rotation={[0, 0, 0.2]}>
        <RoundedBox args={[0.28, 0.55, 0.28]} radius={0.14} smoothness={8} castShadow>
          <primitive object={bodyMaterial} />
        </RoundedBox>
      </group>
      <group position={[0.6, 0.1, 0]} rotation={[0, 0, -0.2]}>
        <RoundedBox args={[0.28, 0.55, 0.28]} radius={0.14} smoothness={8} castShadow>
          <primitive object={bodyMaterial} />
        </RoundedBox>
      </group>

      <group position={[-0.3, -0.4, 0]}>
        <RoundedBox args={[0.32, 0.35, 0.45]} radius={0.16} smoothness={8} castShadow>
          <primitive object={bodyMaterial} />
        </RoundedBox>
      </group>
      <group position={[0.3, -0.4, 0]}>
        <RoundedBox args={[0.32, 0.35, 0.45]} radius={0.16} smoothness={8} castShadow>
          <primitive object={bodyMaterial} />
        </RoundedBox>
      </group>
    </group>
  );
};

const Experience = () => {
  useFrame((state) => {
    const mouse = state.mouse;
    const targetX = mouse.x * 0.15;
    const targetY = 0.8 + mouse.y * 0.1; // Lower center point

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0); // Look at center
  });

  return (
    <>
      <Environment preset="city" />

      {/* Lighting Adjustment for Frontal View */}

      {/* Soft Front Key */}
      <SpotLight
        position={[3, 5, 5]}
        angle={0.6}
        penumbra={0.5}
        intensity={4}
        color="#ffffff"
        castShadow
      />

      {/* Fill Light */}
      <pointLight position={[-3, 2, 4]} intensity={1} color="#eef2ff" />

      {/* Rim Lights */}
      <SpotLight
        position={[-4, 4, -4]}
        angle={0.6}
        intensity={8}
        color="#bae6fd"
      />
      <SpotLight
        position={[4, 4, -4]}
        angle={0.6}
        intensity={8}
        color="#bae6fd"
      />

      {/* ROBOT - Facing STRAIGHT FORWARD */}
      <group position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <RobotHead />
        <RobotBody />
      </group>

      <Cactus />
      <Pebbles />

      <ContactShadows
        resolution={1024}
        scale={10}
        blur={2}
        opacity={0.6}
        far={1}
        color="#000000"
        position={[0, -1.0, 0]}
      />
    </>
  );
};

const CuteRobot = () => {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '500px' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 4.5], fov: 35 }} /* Eye-level angle */
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: true
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default CuteRobot;

"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Rubik from "../RubikCube/RubikCube";

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, -5], fov: 60 }}>
      <Physics gravity={[0, 0, 0]}>
        <Rubik />
      </Physics>
      <ambientLight intensity={3} />
      <Environment preset="studio" />
      <directionalLight position={[3, 5, -2]} intensity={0.5} color="green" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
      />
    </Canvas>
  );
};

export default Scene;

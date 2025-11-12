"use client";

import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  Text,
  Text3D,
  TextProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
import { easing } from "maath";
import Link from "next/link";

export default function NotFound() {
  // const Cube = () => (
  //   <mesh>
  //     <boxGeometry args={[8, 8, 8]} />
  //     <MeshTransmissionMaterial backside backsideThickness={5} />
  //   </mesh>
  // );

  function Status({children, ...props}: TextProps) {
    return (
      <Text fontSize={14} letterSpacing={-0.025} color="white" {...props}>
        {children}
      </Text>
    );
  }

  function Rig() {
    useFrame((state, delta) => {
      console.log(state)
      easing.damp3(
        state.camera.position,
        [
          Math.sin(-state.pointer.x) * 2,
          -10 + state.pointer.y * 3.5,
          90 + Math.cos(state.pointer.x) * 12,
        ],
        0.1,
        delta
      );
      state.camera.lookAt(0, -10, 0);
    });

    return null
  }

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Canvas
        shadows
        camera={{ position: [0, -10, 90], fov: 70 }}
        className="w-full h-full"
      >
        <color attach="background" args={["#0a0a0a"]} />
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />

        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={100}
          opacity={0.85}
        />
        <Environment preset="night">
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <EffectComposer>
          <N8AO aoRadius={1} intensity={2} />
          <Bloom mipmapBlur luminanceThreshold={0.2} intensity={0.3} levels={2} />
          <TiltShift2 blur={0.2} />
        </EffectComposer>

        
        <Rig />

        {/* <Text3D font={''}>hello</Text3D> */}
        {/* <Text3DCustom/> */}

        <Text3D
          position={[-10, -10, 0]}
          scale={[5, 5, 5]}
          font={"/assets/Roboto_Regular.json"}
          curveSegments={24}
          bevelEnabled
          bevelSize={0.08}
          bevelThickness={0.03}
          height={1}
          lineHeight={0.9}
          letterSpacing={0.3}
        >
          {"404"}
          {/* <meshMatcapMaterial color="white" matcap={matcapTexture} /> */}
          <MeshTransmissionMaterial backside backsideThickness={25}/>
        </Text3D>

        {/* <Cube /> */}
        <Status position={[0, 0, -10]} > Not Found</Status>  

        <OrbitControls />
      </Canvas>
      {/* </Suspense> */}
      <Link
        href="/"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/4 text-center p-4 border rounded-full font-bold backdrop-blur-md bg-white/10 hover:scale-105 transition-all shadow-sm shadow-white"
      >
        Go to home
      </Link>
    </>
  );
}

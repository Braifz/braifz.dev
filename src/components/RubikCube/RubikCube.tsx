"use client";

import { randomBool } from "@/src/utils/utils";
import { RoundedBoxGeometry as BoxRounded } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";

function Cube({
  position,
  isActive,
}: {
  position: [number, number, number];
  isActive?: boolean;
}) {
  const [active, setActive] = useState(isActive);

  return (
    <>
      <mesh
        position={position}
        // scale={active ? 1.2 : 1}
        onClick={() => setActive(!active)}
      >
        <BoxRounded args={[1, 1, 1]} radius={0.4} />
        <meshStandardMaterial
          color={active ? "gray" : "black"}
          roughness={0.1}
          metalness={0.5}
        />

        {/* <lineSegments>
          <edgesGeometry args={[new RoundedBoxGeometry(1, 1, 1, 7, 0.2)]} />
          <lineBasicMaterial color="white" />
        </lineSegments> */}
      </mesh>
    </>
  );
}
function Rubik() {
  const mesh = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    mesh.current.rotation.x += delta * 0.3;
    mesh.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={mesh}>
      {[...Array(3).keys()].map((x) =>
        [...Array(3).keys()].map((y) =>
          [...Array(3).keys()].map((z) => (
            <Cube
              key={x + y * 3 + z * 9}
              position={[x - 1, y - 1, z - 1]}
              isActive={randomBool()}
            />
          ))
        )
      )}
    </group>
  );
}

export default Rubik;

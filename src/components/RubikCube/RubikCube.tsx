"use client";

import { randomBool } from "@/src/utils/utils";
import { RoundedBoxGeometry as BoxRounded } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useSpringJoint,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import { Group } from "three";

function Cube({
  position,
  isActive,
}: {
  position: [number, number, number];
  isActive?: boolean;
}) {
  const body = useRef<RapierRigidBody>(null!);
  const anchor = useRef<RapierRigidBody>(null!);
  const [active, setActive] = useState(isActive);

  const mass = 1;
  const stiffness = 50;
  const damping = 0.7;

  useSpringJoint(anchor, body, [[0, 0, 0], [0, 0, 0], 0, stiffness, damping]);

  return (
    <>
      <RigidBody type="fixed" position={position} ref={anchor} />

      <RigidBody
        ref={body}
        position={position}
        colliders={false}
        mass={mass}
        linearDamping={2}
        angularDamping={2}
      >
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setActive(!active);
            body.current?.applyImpulse(
              {
                x: Math.random() * 30,
                y: Math.random() * 30,
                z: Math.random() * 30,
              },
              true,
            );
          }}
        >
          <BoxRounded args={[1, 1, 1]} radius={0.4} />
          <meshStandardMaterial
            color={active ? "gray" : "black"}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </RigidBody>
    </>
  );
}
function Rubik() {
  const mesh = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    mesh.current.rotation.x += delta * 1;
    mesh.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={mesh} position={[0, 0.2, 0]}>
      {[...Array(3).keys()].map((x) =>
        [...Array(3).keys()].map((y) =>
          [...Array(3).keys()].map((z) => (
            <Cube
              key={x + y * 3 + z * 9}
              position={[x - 1, y - 1, z - 1]}
              isActive={randomBool()}
            />
          )),
        ),
      )}
    </group>
  );
}

export default Rubik;

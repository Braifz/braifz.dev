"use client";

import { gsap, SplitText } from "@/src/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Environment, Grid } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { unknown } from "zod";

export default function Home() {
  useGSAP(() => {
    const split = SplitText.create(".split", { type: "words,chars, lines" });
    const textOpacity = SplitText.create(".text-opacity", {
      type: "words,chars, lines",
    });

    gsap.from(split.words, {
      duration: 2,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.2, // 0.05 seconds between each
    });

    gsap.from(textOpacity.lines, {
      duration: 4,
      opacity: 0, // animate from opacity: 0
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.1, // 0.05 seconds between each
    });
  }, []);

  return (
    <div>
      {/* // TODO: move to a new component */}
      <header>{/* Navbar Section */}</header>
      <div className="flex h-dvh">
        {/* Presentation Section  */}
        <div className="w-1/2 flex flex-col gap-2 justify-center pl-14">
          <div>
            <h4 className="text-2xl font-bold pl-1 text-opacity text-muted-foreground">
              Braifz
            </h4>
            <h2 className="text-8xl font-bold split">Frontend Developer</h2>
          </div>
          <p className="text-lg mt-6 pl-1 text-opacity text-muted-foreground">
            Desarrollador frontend con 3 años de experiencia creando productos
            digitales. Disfruto trabajar en entornos dinámicos, especialmente en
            startups de producto, donde puedo aprender rápido, adaptarme a los
            cambios y colaborar de forma cercana con diseñadores y equipos de
            producto.
          </p>
          <div className="flex gap-20 justify-center mt-8 pr-20 ">
            <Link
              href="https://linkedin.com/in/braifz"
              target="_blank"
              className="bg-white rounded-full p-2 hover:scale-110 transition-all"
            >
              <Image
                src="/logos/linkedin.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="cursor-pointer "
              />
            </Link>
            <Link
              href="https://github.com/braifz"
              target="_blank"
              className="bg-white rounded-full p-2 hover:scale-110 transition-all"
            >
              <Image
                src="/logos/github.svg"
                alt="GitHub"
                width={16}
                height={16}
              />
            </Link>
            <Link
              href="https://x.com/braifz"
              target="_blank"
              className="bg-white rounded-full p-2 hover:scale-110 transition-all"
            >
              <Image src="/logos/x.svg" alt="X" width={16} height={16} />
            </Link>
          </div>
        </div>

        {/* Three js section - 3D element  */}
        <div className="w-1/2">
          <Scene />
        </div>
      </div>
    </div>
  );
}

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [-4, 8, 0], fov: 60 }}>
      <Object3d />
      <ambientLight intensity={0.5} />
      <Environment preset="forest" />
      {/* <Ground /> */}
      <directionalLight position={[0, 0, 5]} color="red" />
      {/* <CameraControls makeDefault /> */}
    </Canvas>
  );
};

const Object3d = () => {
  const mesh = useRef(unknown);

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += delta;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

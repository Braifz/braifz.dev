"use client";

import Rubik from "@/src/components/RubikCube/RubikCube";
import { gsap, SplitText } from "@/src/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useGSAP(() => {
    const split = SplitText.create(".split", { type: "words,chars, lines" });
    const textOpacity = SplitText.create(".text-opacity", {
      type: "words,chars, lines",
    });

    gsap.from(split.words, {
      duration: 1,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.2, // 0.05 seconds between each
    });

    gsap.from(textOpacity.lines, {
      duration: 1,
      opacity: 0, // animate from opacity: 0
      // autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.1, // 0.05 seconds between each
    });
  }, []);

  return (
    <div>
      {/* // TODO: move to a new component */}
      <header className=" ">
        {/* Navbar Section */}
        <div className="flex gap-10 justify-end pr-44 pt-4 ">
          <Link
            href="/blog"
            className="text-lg hover:border-b border-white transition-all"
          >
            blog
          </Link>
        </div>
      </header>
      <div className="flex  pt-10">
        {/* Presentation Section  */}
        <div className="w-1/2 flex flex-col justify-center pl-14">
          <div>
            <h4 className="text-2xl font-bold pl-1 text-opacity text-muted-foreground">
              Braifz
            </h4>
            <h2 className="text-8xl font-bold split italic border-b-2 pb-4">
              Frontend Developer
            </h2>
          </div>
          <p className="text-lg pt-6 pr-3 pl-1 text-opacity text-muted-foreground pb-4">
            ¡Hola! Soy Braifz, un desarrollador con 3 años de experiencia
            creando aplicaciones web. Me gusta hacer interfaces atractivas,
            interactivas y performantes. Actualmente disfruto trabajando con
            React, Next.js y Three.js para construir experiencias web
            inmersivas, también paso mis ratos leyendo y aprendiendo sobre LLM y
            IA.
          </p>
          <div className="flex gap-20 justify-center mt-8 pr-20 ">
            <Link
              href="https://linkedin.com/in/braifz"
              target="_blank"
              className="bg-white w-10 h-10 rounded-full p-2 hover:scale-110 transition-all flex items-center justify-center"
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
              className="bg-white w-10 h-10 rounded-full p-2 hover:scale-110 transition-all flex items-center justify-center"
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
              className="bg-white w-10 h-10 rounded-full p-2 hover:scale-110 transition-all flex items-center justify-center"
            >
              <Image src="/logos/x.svg" alt="X" width={16} height={16} />
            </Link>
          </div>
        </div>

        {/* Three js section - 3D element  */}
        <div className="w-1/2 border-white border-l-2">
          <Scene />
        </div>
      </div>
    </div>
  );
}

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, -5], fov: 60 }}>
      <Rubik />
      <ambientLight intensity={3} />
      <Environment preset="studio" />
      {/* <Ground /> */}
      <directionalLight position={[3, 5, -2]} intensity={1.2} color="white" />
      {/* <CameraControls makeDefault /> */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
      />
    </Canvas>
  );
};

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#ffffff",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#ffffff",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

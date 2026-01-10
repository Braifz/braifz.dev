"use client";

import { gsap, SplitText } from "@/src/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

const PresentationHome = () => {
  useGSAP(() => {
    const split = SplitText.create(".split", { type: "words,chars, lines" });
    const textOpacity = SplitText.create(".text-opacity", {
      type: "words,chars, lines",
    });

    gsap.from(split.words, {
      duration: 0.5,
      y: 100, // animate from 100px below
      // autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      // stagger: 0.2, // 0.05 seconds between each
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
      <div>
        <h4 className="text-2xl font-bold pl-1 pb-2 text-muted-foreground">
          <span className="text-opacity" aria-label="Braifz">
            Braifz
          </span>
        </h4>
        <h2 className="text-8xl font-bold italic pb-3">
          <span className="split">Frontend Developer</span>
        </h2>
      </div>
      <p className="text-lg pt-6 pr-3 pl-1  text-muted-foreground pb-4">
        <span className="text-opacity" aria-label="presentation">
          ¡Hola! Soy Braifz, un desarrollador con 3 años de experiencia creando
          aplicaciones web. Me gusta hacer interfaces atractivas, interactivas y
          performantes. Actualmente disfruto trabajando con React, Next.js y
          Three.js para construir experiencias web inmersivas, también paso mis
          ratos leyendo y aprendiendo sobre LLM y IA.
        </span>
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
          <Image src="/logos/github.svg" alt="GitHub" width={16} height={16} />
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
  );
};

export default PresentationHome;

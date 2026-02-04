"use client";

import { gsap, SplitText } from "@/src/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";

const PresentationHome = () => {
  useGSAP(() => {
    const split = SplitText.create(".split", { type: "words,chars, lines" });

    gsap.from(split.words, {
      duration: 0.5,
      y: 100, // animate from 100px below
      // autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      // stagger: 0.2, // 0.05 seconds between each
    });
  }, []);

  useGSAP(() => {
    const textOpacity = SplitText.create(".text-opacity", {
      type: "words,chars, lines",
    });

    gsap.from(textOpacity.lines, {
      duration: 1,
      opacity: 0, // animate from opacity: 0
      // autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.2, // 0.05 seconds between each
    });
  }, []);

  return (
    <div className="mt-10 lg:mt-0 text-center lg:text-left mb-10">
      <div>
        <h4 className="hidden lg:block text-2xl font-bold pl-1 pb-2 text-muted-foreground">
          <span className="text-opacity" aria-label="Braifz">
            Braifz
          </span>
        </h4>
        <h2 className="text-6xl lg:text-8xl font-bold italic lg:pb-3">
          <span className="split">Frontend Developer </span>
        </h2>
      </div>
      <p className="lg:text-lg text-sm lg:pr-3 lg:pl-1 px-8 pt-6 text-muted-foreground lg:pb-4">
        <span className="text-opacity" aria-label="presentation">
          ¡Hola! Soy Braifz, un desarrollador con 3 años de experiencia creando
          aplicaciones web. Me gusta hacer interfaces atractivas, intuitivas y
          performantes. Actualmente disfruto trabajando con React y Next.js. Me
          gusta jugar con Three.js para construir experiencias web inmersivas e
          interactivas, también paso mis ratos leyendo y aprendiendo sobre LLM y
          IA.
        </span>
      </p>
      <div className="flex lg:gap-20 gap-10 justify-center lg:mt-8 mt-10 lg:pr-20 ">
        <SocialMediaLinks />
      </div>
    </div>
  );
};

export default PresentationHome;

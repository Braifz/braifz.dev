"use client";

import { gsap, SplitText } from "@/src/lib/gsap";
import { useGSAP } from "@gsap/react";
import SocialMediaLinks from "../../common/SocialMediaLinks/SocialMediaLinks";
import { useRef } from "react";

const PresentationHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const splitWords = SplitText.create(".split", { type: "words" });
      const splitOpacity = SplitText.create(".text-opacity", { type: "lines" });

      const tl = gsap.timeline();

      tl.from(splitWords.words, {
        duration: 0.5,
        y: 100,
        opacity: 0,
        stagger: 0.01,
      }).from(splitOpacity.lines, {
        duration: 0.3,
        opacity: 0,
        stagger: 0.1,
      });
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="mt-10 lg:mt-0 text-center lg:text-left mb-10"
    >
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

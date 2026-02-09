"use client";

import Image from "next/image";
import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, HOP_EASE } from "@/src/lib/gsap";

interface ArticlePreviewProps {
  image: string;
  title: string;
  isVisible: boolean;
}

const ArticlePreview = memo(function ArticlePreview({
  image,
  title,
  isVisible,
}: ArticlePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!previewRef.current) return;

      let tl: gsap.core.Timeline;

      if (isVisible) {
        tl = gsap.timeline();

        tl.fromTo(
          previewRef.current,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 0.5,
            ease: HOP_EASE,
          },
        ).fromTo(
          previewRef.current.querySelector("img"),
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.25,
            ease: HOP_EASE,
          },
          "<",
        );
      } else {
        gsap.to(previewRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: HOP_EASE,
        });
      }

      return () => {
        if (tl) tl.kill();
      };
    },
    { dependencies: [isVisible] },
  );

  if (!isVisible) return null;

  return (
    <div
      ref={previewRef}
      className="hidden lg:block lg:fixed top-0 left-0 w-[40px] h-dvh overflow-hidden -z-10"
      style={{
        opacity: 0,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      }}
    >
      <Image
        src={image}
        alt={`Preview of ${title}`}
        fill
        className="object-cover"
        priority={false}
        style={{
          transform: "scale(1.25)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
});

export default ArticlePreview;

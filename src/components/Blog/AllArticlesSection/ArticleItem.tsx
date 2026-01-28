"use client";

import { Blog } from "@/.content-collections/generated";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";

interface ArticleItemProps {
  post: Blog;
  index: number;
  previewRef: React.RefObject<HTMLDivElement | null>;
  image: string;
}

const ArticleItem = ({ post, index, previewRef, image }: ArticleItemProps) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const activeIndexRef = useRef<number>(-1);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1",
    );

    const item = itemRef.current;
    const preview = previewRef.current;

    if (!item || !preview) return;

    let activeClientImgWrapper: HTMLDivElement | null = null;
    let activeClientImg: HTMLImageElement | null = null;

    const handleMouseOver = () => {
      if (activeIndexRef.current === index) return;

      // Limpiar elemento anterior si existe
      if (activeIndexRef.current !== -1 && activeClientImgWrapper) {
        const mouseoutEvent = new Event("mouseout");
        item.dispatchEvent(mouseoutEvent);
      }

      activeIndexRef.current = index;

      // Crear wrapper para la imagen
      const clientImgWrapper = document.createElement("div");
      clientImgWrapper.className =
        "absolute inset-0 w-[40px] h-dvh top-0 overflow-hidden -z-10 ";

      const clientImg = document.createElement("img");
      clientImg.src = image;
      clientImg.className = "w-full h-full object-cover -z-10 top-20";

      gsap.set(clientImg, { scale: 1.25, opacity: 0 });

      clientImgWrapper.appendChild(clientImg);
      preview.appendChild(clientImgWrapper);

      activeClientImgWrapper = clientImgWrapper;
      activeClientImg = clientImg;

      gsap.fromTo(
        clientImgWrapper,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.5,
          ease: "hop",
        },
      );

      gsap.to(clientImg, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(clientImg, {
        scale: 1,
        duration: 1.25,
        ease: "hop",
      });
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget && item.contains(event.relatedTarget as Node)) {
        return;
      }

      if (activeClientImg && activeClientImgWrapper) {
        const clientImgToRemove = activeClientImg;
        const clientImgWrapperToRemove = activeClientImgWrapper;

        activeClientImg = null;
        activeClientImgWrapper = null;
        activeIndexRef.current = -1;

        gsap.to(clientImgToRemove, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => {
            clientImgWrapperToRemove.remove();
          },
        });
      }
    };

    item.addEventListener("mouseover", handleMouseOver);
    item.addEventListener("mouseout", handleMouseOut);

    return () => {
      item.removeEventListener("mouseover", handleMouseOver);
      item.removeEventListener("mouseout", handleMouseOut);

      if (activeClientImgWrapper) {
        activeClientImgWrapper.remove();
      }
    };
  }, [index, previewRef]);

  return (
    <Link
      ref={itemRef}
      href={`/blog/${post.slug}`}
      className="border-b border-border flex flex-col justify-between px-5 hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]  duration-200 transition-all"
      style={
        {
          "--hover-bg": "light-dark(#000000, #f3f4f6)",
          "--hover-text": "light-dark(#ffffff, #000000)",
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-center h-full">
        <div className="font-bold lg:text-2xl text-lg">{post.title}</div>
        <div className="text-muted-foreground font-semibold">{post.date}</div>
      </div>
    </Link>
  );
};

export default ArticleItem;

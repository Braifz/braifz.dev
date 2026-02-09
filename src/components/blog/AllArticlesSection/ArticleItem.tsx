"use client";

import { Blog } from "@/.content-collections/generated";
import Link from "next/link";
import { useRef, useCallback, memo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/src/lib/gsap";

interface ArticleItemProps {
  post: Blog;
  index: number;
  image: string;
  onHover: (index: number, image: string, title: string) => void;
  onLeave: () => void;
}

const ArticleItem = memo(function ArticleItem({
  post,
  index,
  image,
  onHover,
  onLeave,
}: ArticleItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !dateRef.current) return;

      const titleSplit = SplitText.create(titleRef.current, { type: "lines" });
      const dateSplit = SplitText.create(dateRef.current, { type: "lines" });

      gsap.from(titleSplit.lines, {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.out",
      });

      gsap.from(dateSplit.lines, {
        duration: 0.3,
        y: 20,
        stagger: 0.05,
        ease: "power2.out",
      });

      return () => {
        titleSplit.revert();
        dateSplit.revert();
      };
    },
    { scope: itemRef },
  );

  const handleMouseEnter = useCallback(() => {
    onHover(index, image, post.title);
  }, [index, image, post.title, onHover]);

  const handleMouseLeave = useCallback(() => {
    onLeave();
  }, [onLeave]);

  return (
    <Link
      ref={itemRef}
      href={`/blog/${post.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border-b border-border flex flex-col justify-between lg:px-5 hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] duration-200 transition-all"
      style={
        {
          "--hover-bg": "light-dark(#000000, #f3f4f6)",
          "--hover-text": "light-dark(#ffffff, #000000)",
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-center h-full">
        <div className="font-bold lg:text-2xl text-lg" ref={titleRef}>
          {post.title}
        </div>
        <div className="text-muted-foreground font-semibold" ref={dateRef}>
          {post.date}
        </div>
      </div>
    </Link>
  );
});

export default ArticleItem;

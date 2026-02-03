"use client";

import { allBlogs } from "@/.content-collections/generated";
import ArticleItem from "./ArticleItem";
import { useRef } from "react";

const AllArticlesSection = () => {
  const previewRef = useRef<HTMLDivElement>(null);

  const sortedBlogs = [...allBlogs].sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <div className="relative">
      <div
        ref={previewRef}
        className="hidden lg:block lg:fixed top-0 left-0 w-[40px] h-full"
      />

      <h2 className="lg:text-2xl text-2xl font-bold border-b border-border lg:pb-2 lg:text-end ">
        ↘ Todos los Artículos ↘
      </h2>

      <div className="*:h-20 z-10">
        {sortedBlogs.map((post, index) => (
          <ArticleItem
            key={post.slug}
            post={post}
            index={index}
            previewRef={previewRef}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesSection;

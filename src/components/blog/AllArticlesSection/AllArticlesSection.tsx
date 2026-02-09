"use client";

import { Blog } from "@/.content-collections/generated";
import ArticleItem from "./ArticleItem";
import { memo, useState, useCallback, useMemo } from "react";
import ArticlePreview from "./ArticlePreview";

interface AllArticlesSectionProps {
  sortedBlogs: Blog[];
}

const AllArticlesSection = memo(function AllArticlesSection({
  sortedBlogs,
}: AllArticlesSectionProps) {
  const [hoveredItem, setHoveredItem] = useState<{
    index: number;
    image: string;
    title: string;
  } | null>(null);

  const handleItemHover = useCallback(
    (index: number, image: string, title: string) => {
      setHoveredItem({ index, image, title });
    },
    [],
  );

  const handleItemLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const memoizedBlogs = useMemo(() => sortedBlogs, [sortedBlogs]);

  return (
    <div className="relative">
      {hoveredItem && (
        <ArticlePreview
          image={hoveredItem.image}
          title={hoveredItem.title}
          isVisible={true}
        />
      )}

      <h2 className="lg:text-2xl text-2xl font-bold border-b border-border lg:pb-2 lg:text-end">
        ↘ Todos los Artículos ↘
      </h2>

      <div className="*:h-20 z-10">
        {memoizedBlogs.map((post, index) => (
          <ArticleItem
            key={post.slug}
            post={post}
            index={index}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
});

export default AllArticlesSection;

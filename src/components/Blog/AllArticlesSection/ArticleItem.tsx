"use client";

import { Blog } from "@/.content-collections/generated";
import Link from "next/link";

const ArticleItem = ({ post }: { post: Blog }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      key={post.slug}
      className="border-b border-border flex flex-col justify-between"
    >
      <div className="flex justify-between items-center h-full">
        <div className="font-bold lg:text-2xl text-lg">{post.title}</div>

        <div className="text-muted-foreground font-semibold">{post.date}</div>
      </div>
    </Link>
  );
};

export default ArticleItem;

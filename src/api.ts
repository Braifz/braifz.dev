import { allBlogs, Blog } from "@/.content-collections/generated";
import { cacheLife } from "next/cache";

const getAllPosts = async (): Promise<Blog[]> => {
  "use cache";

  cacheLife("weeks");

  return [...allBlogs].sort((a, b) => {
    return a.order - b.order;
  });
};

const getPostBySlug = async (slug: string): Promise<Blog | undefined> => {
  "use cache";

  cacheLife("weeks");

  return allBlogs.find((post) => post._meta.path === slug);
};

const getRelatedPosts = async (slug: string): Promise<Blog[]> => {
  "use cache";

  cacheLife("weeks");

  // TODO: improve to filter by tags or categories
  return allBlogs.filter((post) => post._meta.path !== slug).slice(0, 3);
};

export { getAllPosts, getPostBySlug, getRelatedPosts };

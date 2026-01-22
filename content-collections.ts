import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";

const blogs = defineCollection({
  name: "blog",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string(),
    principal: z.boolean().optional(),
    category: z.string(),
    order: z.number(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);

    const slug = document._meta.path;

    return {
      ...document,
      readingTime: readingTime(document.content).text,
      mdx,
      slug,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});

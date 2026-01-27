import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import { getTableOfContents } from "fumadocs-core/content/toc";
import slugify from "slugify";
// import remarkSlug from "remark-slug";

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
    toc: z.any().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);

    const toc = await getTableOfContents(document.content);

    const serializedToc = toc.map((item: any) => ({
      id: slugify(item.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      }),
      title: item.title,
      depth: item.depth,
    }));

    const slug = document._meta.path;

    return {
      ...document,
      readingTime: readingTime(document.content).text,
      mdx,
      slug,
      toc: serializedToc,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});

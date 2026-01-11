import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrum";
import { Blog, JsonLd, WithContext } from "@/src/utils/seo/json-ld";
import { allBlogs } from "content-collections";
import { SlashIcon } from "lucide-react";
import { Mdx } from "mdx-components";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// export async function generateStaticParams() {
//   return allPosts.map((post) => ({
//     slug: post._meta.path,
//   }));
// }

// export async function generateMetadata(props: PostPageProps) {
//   const params = await props.params;
//   const post = allPosts.find((post) => post._meta.path === params.slug);

//   if (!post) {
//     notFound();
//   }

//   return createMetadata({
//     title: post.title,
//     description: post.description,
//     keywords: post.keywords,
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       type: 'article',
//       images: [
//         {
//           url: post.image ?? '',
//           width: 804,
//           height: 452,
//           alt: post.title,
//           type: 'image/png',
//         },
//       ],
//     },
//   });
// }

export default async function Post(props: PostPageProps) {
  const params = await props.params;

  const post = allBlogs.find((post) => post._meta.path === params.slug);

  const relatedPosts = allBlogs
    .filter((post) => post._meta.path !== params.slug)
    .slice(0, 3);

  if (!post) {
    return notFound();
  }

  const MdxContent = post.mdx;

  const jsonLd: WithContext<Blog> = {
    "@type": "Blog",
    "@context": "https://schema.org",
    author: "Braifz",
  };

  return (
    <article className="mt-4">
      <div className="h-10 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog/${post.slug}`}>
                {post.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <JsonLd code={jsonLd} />

      <header className="flex items-center justify-center ">
        <ViewTransition key={post.slug} name={`title-${post.slug}`}>
          <h2
            className="lg:text-6xl text-4xl text-center font-bold mt-12"
            id="titulo"
          >
            {post.title}
          </h2>
        </ViewTransition>
      </header>

      <ViewTransition key={post.slug} name={`readingTime-${post.slug}`}>
        <div className="flex justify-center gap-2 lg:gap-4 my-8 lg:text-xl text-sm text-muted-foreground">
          <p>{post.readingTime}</p>·<time>{post.date}</time>
        </div>
      </ViewTransition>

      {post.image && (
        <ViewTransition key={`image-${post.slug}`} name={`image-${post.slug}`}>
          <div className="lg:-mx-8">
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="my-8 w-full h-[400px] transition-colors bg-muted border-none object-cover"
              priority
            />
          </div>
        </ViewTransition>
      )}

      <div className="content lg:mx-64 md:mx-12 mx-5">
        <Mdx code={post.mdx} />
      </div>

      <footer className="mt-16 mb-5">
        <h2 className="text-lg font-semibold text-muted-foreground text-center mb-5 uppercase tracking-wider">
          More Articles
        </h2>
        <div className="flex gap-3 justify-center">
          {relatedPosts.map((post) => (
            <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
              <div className="w-80 border p-3 rounded-xs wrap-break-word border-muted-foreground/20 max-h-[400px] min-h-[400px] space-y-3">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={720}
                  height={405}
                  className="w-full h-[200px] transition-colors bg-muted border-none object-cover rounded-xs"
                  priority
                />
                <h2 className="text-xl font-semibold flex ">{post.title}</h2>
                <p className="line-clamp-3 text-muted-foreground font-medium">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}

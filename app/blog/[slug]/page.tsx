import BreadcrumbBlog from "@/src/components/Blog/BreadcrumbBlog/BreadcrumBlog";
import GoToTopButton from "@/src/components/Blog/GoToTopButtton/GoToTopButton";
import MoreArticleSection from "@/src/components/Blog/MoreArticleSection/MoreArticleSection";
import ProgressBar from "@/src/components/Blog/ProgressBar/ProgressBar";
import TableOfContent from "@/src/components/Blog/TableOfContent/TableOfContent";
import { ThemeToggle } from "@/src/components/ToggleTheme/ToogleTheme";
import { Button } from "@/src/components/ui/button";
import { Blog, JsonLd, WithContext } from "@/src/utils/seo/json-ld";
import { allBlogs } from "content-collections";
import { Undo2 } from "lucide-react";
import { Mdx } from "mdx-components";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const jsonLd: WithContext<Blog> = {
    "@type": "Blog",
    "@context": "https://schema.org",
    author: "Braifz",
  };

  return (
    <article className="lg:mt-4 ">
      <ProgressBar />

      {/* HEADER */}
      <div className="hidden lg:flex h-10 items-center justify-between">
        <BreadcrumbBlog
          breadCrums={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: `/blog/${post.slug}`, label: post.title },
          ]}
        />

        <ThemeToggle />
      </div>

      <div className="lg:hidden flex items-center justify-between p-4">
        <Link href="/blog">
          <Button variant="ghost" size="icon">
            <Undo2 />
          </Button>
        </Link>

        <ThemeToggle />
      </div>

      <JsonLd code={jsonLd} />

      <header className="flex items-center justify-center ">
        <h2
          className="lg:text-6xl text-4xl text-center font-bold lg:mt-12 mt-4"
          id="titulo"
        >
          {post.title}
        </h2>
      </header>

      <div className="flex justify-center gap-2 lg:gap-4 my-8 lg:text-xl text-sm text-muted-foreground">
        <p>{post.readingTime}</p>·<time>{post.date}</time>
      </div>

      {post.image && (
        <div className="lg:-mx-8">
          <Image
            src={post.image}
            alt={post.title}
            width={740}
            height={405}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            className="my-8 w-full h-[400px] transition-colors bg-muted border-none object-cover"
            priority
          />
        </div>
      )}

      <div className="flex w-full justify-center">
        {/* Article Content */}
        <div className="content lg:mx-32 lg:mb-10 px-5 lg:w-2/3 lg:mt-10 w-full">
          <Mdx code={post.mdx} />
        </div>

        {/* Table of Contents */}
        <TableOfContent post={post} />
      </div>

      <div className="w-full flex justify-center my-6 mt-20">
        <GoToTopButton />
      </div>

      <footer className="mt-16 mb-5 border-t border-border">
        <h2 className="text-lg font-semibold italic border-b border-border text-center p-4 mb-5 tracking-wider">
          Más Artículos
        </h2>

        <MoreArticleSection relatedPosts={relatedPosts} />
      </footer>
    </article>
  );
}

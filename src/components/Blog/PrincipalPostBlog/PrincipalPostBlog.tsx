import { allBlogs } from "@/.content-collections/generated";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Button } from "../../ui/button";
import { ExternalLink } from "lucide-react";

const PrincipalPostBlog = () => {
  const principalPost = allBlogs.find((post) => post.principal);

  return (
    <div className="lg:w-full lg:mt-6 mt-4 lg:pr-14 border p-6 lg:p-6 rounded-md">
      {principalPost && (
        <Link
          href={`/blog/${principalPost.slug}`}
          className="w-56 cursor-default space-y-3 "
        >
          {/* <p className="text-secondary">{principalPost.category}</p> */}
          <ViewTransition
            key={`title-${principalPost.slug}`}
            name={`title-${principalPost.slug}`}
            enter="test"
            exit="test2"
          >
            <h2
              className="lg:text-5xl text-4xl font-bold pb-4 text-start"
              key={principalPost.slug}
            >
              {principalPost.title}
            </h2>
          </ViewTransition>

          <ViewTransition
            key={`readingTime-${principalPost.slug}`}
            name={`readingTime-${principalPost.slug}`}
          >
            <div className="flex gap-2 text-muted-foreground">
              <p>{principalPost.readingTime}</p>
              <p>·</p>
              <p>{principalPost.date}</p>
            </div>
          </ViewTransition>

          <ViewTransition
            key={`image-${principalPost.slug}`}
            name={`image-${principalPost.slug}`}
          >
            <Image
              src={principalPost.image}
              alt={principalPost.title}
              width={720}
              height={305}
              className="w-full lg:h-[350px] h-[200px] transition-colors bg-muted border-none object-cover rounded-xs"
              priority
            />
          </ViewTransition>
          <p className=" line-clamp-3">{principalPost.summary}</p>

          <Button
            // href={`/blog/${principalPost.slug}`}
            variant={"link"}
            className="cursor-pointer rounded-none p-0!"
          >
            Leer el articulo completo
            <ExternalLink className="text-foreground pt-1" size={8} />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PrincipalPostBlog;

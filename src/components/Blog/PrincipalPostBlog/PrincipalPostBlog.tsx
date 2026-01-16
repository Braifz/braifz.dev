import { allBlogs } from "@/.content-collections/generated";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Button } from "../../ui/button";

const PrincipalPostBlog = () => {
  const principalPost = allBlogs.find((post) => post.principal);

  return (
    <div className="lg:w-2/3 mt-10 lg:border-r-2 lg:pr-14">
      {principalPost && (
        <Link
          href={`/blog/${principalPost.slug}`}
          className="w-56 cursor-default space-y-3"
        >
          {/* <p className="text-secondary">{principalPost.category}</p> */}
          <ViewTransition
            key={`title-${principalPost.slug}`}
            name={`title-${principalPost.slug}`}
            enter="test"
            exit="test2"
          >
            <h2
              className="text-5xl font-bold border-b-2 pb-4"
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
              className="w-full h-[350px] transition-colors bg-muted border-none object-cover rounded-xs"
              priority
            />
          </ViewTransition>
          <p className="text-lg line-clamp-3">{principalPost.summary}</p>

          <Button
            // href={`/blog/${principalPost.slug}`}
            variant={"link"}
            className="cursor-pointer rounded-none pl-0 "
          >
            Leer el articulo completo
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PrincipalPostBlog;

import { allBlogs } from "@/.content-collections/generated";
import Link from "next/link";
import { Badge } from "../../ui/badge";

const AllArticlesSection = () => {
  return (
    <div className="mt-16">
      <h2 className="text-4xl font-bold border-b border-foreground pb-4 text-muted-foreground text-end italic">
        ↘ Todos los Articulos ↘
      </h2>
      <div>
        <div className="*:h-25">
          {allBlogs.map((post) => (
            <div key={post.slug}>
              <div className="font-bold text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block w-full h-full"
                >
                  {post.title}
                </Link>
              </div>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block w-full h-full"
                >
                  <Badge variant="outline">{post.category}</Badge>
                </Link>
              </div>
              <div className="text-muted-foreground font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block w-full h-full"
                >
                  {post.date}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllArticlesSection;

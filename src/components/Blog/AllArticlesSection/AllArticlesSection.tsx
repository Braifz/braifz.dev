import { allBlogs } from "@/.content-collections/generated";
import Link from "next/link";
import { Badge } from "../../ui/badge";

const AllArticlesSection = () => {
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <div className="mt-16">
      <h2 className="lg:text-4xl text-2xl font-bold border-b mb-2 lg:pb-4 text-end italic">
        ↘ Todos los Articulos ↘
      </h2>

      <div className="*:h-25">
        {sortedBlogs.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="border-b flex flex-col justify-between py-2"
          >
            <div className="font-bold lg:text-2xl text-lg block w-full h-full">
              {post.title}
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="outline">{post.category}</Badge>

              <div className="text-muted-foreground font-semibold">
                {post.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesSection;

import { allBlogs } from "@/.content-collections/generated";
import ArticleItem from "./ArticleItem";

const AllArticlesSection = () => {
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <div className="">
      <h2 className="lg:text-2xl text-2xl font-bold border-b border-border lg:pb-2 lg:text-end ">
        ↘ Todos los Articulos ↘
      </h2>

      <div className="*:h-20">
        {sortedBlogs.map((post) => (
          <ArticleItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesSection;

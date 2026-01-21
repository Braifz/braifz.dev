import { Blog } from "@/.content-collections/generated";
import Image from "next/image";
import Link from "next/link";

interface MoreArticleSectionProps {
  relatedPosts: Blog[];
}

const MoreArticleSection = ({ relatedPosts }: MoreArticleSectionProps) => {
  return (
    <div className="flex gap-3 justify-center">
      {relatedPosts.map((post) => (
        <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
          <div className="lg:w-80 border p-3 rounded-xs wrap-break-word border-muted-foreground/20 max-h-[400px] min-h-[400px] space-y-3">
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
  );
};

export default MoreArticleSection;

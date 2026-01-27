import { Blog } from "@/.content-collections/generated";
import Image from "next/image";
import Link from "next/link";

interface MoreArticleSectionProps {
  relatedPosts: Blog[];
}

const MoreArticleSection = ({ relatedPosts }: MoreArticleSectionProps) => {
  return (
    <div className="flex  flex-col md:flex-row gap-3 justify-center px-4">
      {relatedPosts.map((post) => (
        <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
          <div className="lg:w-80 border border-border p-3 wrap-break-word rounded-sm max-h-[400px] md:min-h-[400px] space-y-3">
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="w-full md:h-[200px] h-[100px] transition-colors bg-muted border-none object-cover rounded-xs"
              priority
            />
            <h2 className="text-xl font-semibold flex ">{post.title}</h2>
            <p className="line-clamp-3  font-medium">{post.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoreArticleSection;

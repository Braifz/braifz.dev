import AllArticlesSection from "@/src/components/Blog/AllArticlesSection/AllArticlesSection";
import BreadcrumbBlog from "@/src/components/Blog/BreadcrumbBlog/BreadcrumBlog";
import PresentationBlog from "@/src/components/Blog/PresentationBlog/PresentationBlog";
import PrincipalPostBlog from "@/src/components/Blog/PrincipalPostBlog/PrincipalPostBlog";

export const metadata = {
  title: "Braifz - Blog",
  description: "Braifz - Blog",
  keywords: [
    "Braifz",
    "Frontend Developer",
    "React",
    "Next.js",
    "Three.js",
    "Blog",
  ],
};

export default function BlogPage() {
  return (
    <main className="p-4">
      <div className="h-10 flex items-center">
        <BreadcrumbBlog
          breadCrums={[
            {
              href: "/",
              label: "Home",
            },
            {
              href: "/blog",
              label: "Blog",
            },
          ]}
        />
      </div>

      <div className="flex gap-2 mt-6 mb-6 border-b-2 pb-3">
        <h1 className="text-3xl lg:text-8xl font-bold italic">Blog</h1>
        <p className="text-sm text-muted-foreground">(12)</p>
      </div>

      <div className="lg:flex flex-col lg:gap-6 mb-10">
        <PrincipalPostBlog />

        <div className="lg:w-1/3 lg:h-[600px] flex items-center flex-col justify-center">
          <PresentationBlog />
        </div>
      </div>

      <AllArticlesSection />
    </main>
  );
}

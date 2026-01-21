import AllArticlesSection from "@/src/components/Blog/AllArticlesSection/AllArticlesSection";
import BreadcrumbBlog from "@/src/components/Blog/BreadcrumbBlog/BreadcrumBlog";
import PresentationBlog from "@/src/components/Blog/PresentationBlog/PresentationBlog";
import PrincipalPostBlog from "@/src/components/Blog/PrincipalPostBlog/PrincipalPostBlog";
import SocialMediaLinks from "@/src/components/SocialMediaLinks/SocialMediaLinks";

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

      <div className="flex gap-2 mt-6 lg:pb-3">
        <h1 className="text-3xl lg:text-8xl font-bold italic">Blog</h1>
        <p className="text-sm text-muted-foreground">(5)</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-6 mb-10">
        <div className="order-1 lg:order-2 w-full lg:w-1/3 mt-4 lg:mt-10 flex items-center flex-col justify-center">
          <PresentationBlog />
        </div>

        <div className="order-3 lg:order-1 lg:w-2/3 lg:mt-4 mt-2">
          <PrincipalPostBlog />
        </div>
      </div>

      <AllArticlesSection />

      <SocialMediaLinks className="mt-8" />
    </main>
  );
}

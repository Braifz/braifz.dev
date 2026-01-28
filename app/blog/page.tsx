import AllArticlesSection from "@/src/components/Blog/AllArticlesSection/AllArticlesSection";
import BreadcrumbBlog from "@/src/components/Blog/BreadcrumbBlog/BreadcrumBlog";
import PresentationBlog from "@/src/components/Blog/PresentationBlog/PresentationBlog";
import PrincipalPostBlog from "@/src/components/Blog/PrincipalPostBlog/PrincipalPostBlog";
import SocialMediaLinks from "@/src/components/SocialMediaLinks/SocialMediaLinks";
import { ThemeToggle } from "@/src/components/ToggleTheme/ToogleTheme";

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
    <main className="p-4 lg:p-8">
      <div className="h-10 flex items-center justify-between">
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

        <ThemeToggle />
      </div>

      <div className="flex gap-2 lg:mt-16 mt-10">
        <h1 className="text-5xl lg:text-8xl font-bold">Blog</h1>
        <p className="text-sm text-muted-foreground">(5)</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-6 mb-10 mt-10">
        <div className="w-full lg:w-1/3  flex  flex-col pl-1 ">
          <PresentationBlog />
        </div>

        <div className="lg:w-2/3 mt-10 lg:mt-0 ">
          <AllArticlesSection />
        </div>
      </div>

      <SocialMediaLinks className="mt-8" />
    </main>
  );
}

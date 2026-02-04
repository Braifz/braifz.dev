import Header from "@/src/components/common/Header/Header";
import CubeVideo from "@/src/components/home/CubeVideo/CubeVideo";
import PresentationHome from "@/src/components/home/PresentationHome/PresentationHome";
import Scene from "@/src/components/home/Scene/Scene";
import { SpinnerCustom } from "@/src/components/ui/spinner";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export const metadata = {
  title: "Braifz",
  description: "Frontend Developer - Braifz",
  keywords: ["Braifz", "Frontend Developer", "React", "Next.js", "Three.js"],
};

export default async function Home() {
  "use cache";

  cacheLife("max");

  return (
    <main>
      <Header />

      <Suspense fallback={<SpinnerCustom />}>
        <CubeVideo />
      </Suspense>

      <div className="flex flex-col lg:flex-row lg:mt-5">
        {/* Presentation Section  */}
        <div className="lg:w-1/2 flex flex-col justify-center lg:pl-14">
          <Suspense fallback={<SpinnerCustom />}>
            <PresentationHome />
          </Suspense>
        </div>

        {/* Three js section - 3D element  */}
        <div className="hidden lg:block lg:w-1/2 ">
          <Suspense fallback={<SpinnerCustom />}>
            <Scene />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

import CubeVideo from "@/src/components/CubeVideo/CubeVideo";
import Header from "@/src/components/Header/Header";
import PresentationHome from "@/src/components/PresentationHome/PresentationHome";
import Scene from "@/src/components/Scene/Scene";

export const metadata = {
  title: "Braifz",
  description: "Frontend Developer - Braifz",
  keywords: ["Braifz", "Frontend Developer", "React", "Next.js", "Three.js"],
};

export default function Home() {
  return (
    <main>
      <Header />
      <CubeVideo />
      <div className="flex flex-col lg:flex-row lg:mt-5">
        {/* Presentation Section  */}
        <div className="lg:w-1/2 flex flex-col justify-center lg:pl-14">
          <PresentationHome />
        </div>

        {/* Three js section - 3D element  */}
        <div className="hidden lg:block lg:w-1/2 ">
          <Scene />
        </div>
      </div>
    </main>
  );
}

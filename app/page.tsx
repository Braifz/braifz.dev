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
      <div className="flex  pt-10">
        {/* Presentation Section  */}
        <div className="w-1/2 flex flex-col justify-center pl-14">
          <PresentationHome />
        </div>

        {/* Three js section - 3D element  */}
        <div className="w-1/2 ">
          <Scene />
        </div>
      </div>
    </main>
  );
}

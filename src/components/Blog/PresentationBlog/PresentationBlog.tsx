import Image from "next/image";
import Link from "next/link";
import SocialMediaLinks from "../../SocialMediaLinks/SocialMediaLinks";

const PresentationBlog = () => {
  return (
    <div className="lg:w-[400px] lg:p-4 p-6 border rounded-md h-full">
      <p className="lg:text-2xl text-lg mb-4"> 👋 Hola </p>
      {/* <p className="text-2xl font-bold">Soy Braifz</p> */}
      <p className="lg:text-lg text-base">
        ¡Bienvenido/a a mi blog! Escribo sobre tecnología, ideas y cosas que
        estoy aprendiendo. Escribo para pensar mejor. Escribo primero para mí.
        Si a alguien más le sirve, mejor. Intentar, fallar y seguir aprendiendo.
      </p>

      <div className="hidden lg:flex space-x-10 pt-4 justify-center mt-4">
        <SocialMediaLinks />
      </div>
    </div>
  );
};

export default PresentationBlog;

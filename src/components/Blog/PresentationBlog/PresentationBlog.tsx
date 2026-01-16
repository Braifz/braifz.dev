import Image from "next/image";
import Link from "next/link";

const PresentationBlog = () => {
  return (
    <div className="lg:w-[400px] p-4">
      <p className="text-2xl"> Hola 👋,</p>
      {/* <p className="text-2xl font-bold">Soy Braifz</p> */}

      <p className="text-lg">
        ¡Bienvenido/a a mi blog! Donde escribo sobre lo que pienso, lo que me
        gusta y donde hablo de lasc cosas que me gusta compartir. lo que me
        gusta y donde hablo de lasc cosas que me gusta compartir
      </p>

      <div className="flex space-x-10 pt-4 justify-center mt-4">
        <Link
          href="https://linkedin.com/in/braifz"
          target="_blank"
          className="bg-white rounded-full p-2 hover:scale-110 transition-all"
        >
          <Image
            src="/logos/linkedin.svg"
            alt="LinkedIn"
            width={16}
            height={16}
            className="cursor-pointer "
          />
        </Link>
        <Link
          href="https://github.com/braifz"
          target="_blank"
          className="bg-white rounded-full p-2 hover:scale-110 transition-all"
        >
          <Image src="/logos/github.svg" alt="GitHub" width={16} height={16} />
        </Link>
        <Link
          href="https://x.com/braifz"
          target="_blank"
          className="bg-white rounded-full p-2 hover:scale-110 transition-all"
        >
          <Image src="/logos/x.svg" alt="X" width={16} height={16} />
        </Link>
      </div>
    </div>
  );
};

export default PresentationBlog;

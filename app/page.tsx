import Image from "next/image";
import Link from "next/link";
import { SplashCursor } from "../src/components/SplashCursor/SplashCursor";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="vertical items-center space-y-1">
        <h2 className="text-center text-xl font-bold">Braifz</h2>
        <p className="text-xs opacity-50 text-center">Under Construction</p>

        <div className="flex space-x-2 pt-4">
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
            <Image
              src="/logos/github.svg"
              alt="GitHub"
              width={16}
              height={16}
            />
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
      <SplashCursor />
    </div>
  );
}

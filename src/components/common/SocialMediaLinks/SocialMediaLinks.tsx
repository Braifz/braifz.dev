import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SocialMediaLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex space-x-10 pt-4 justify-center", className)}>
      <Link
        href="https://linkedin.com/in/braifz"
        target="_blank"
        className="bg-white border rounded-full p-2 hover:scale-110 transition-all"
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
        className="bg-white border rounded-full p-2 hover:scale-110 transition-all"
      >
        <Image src="/logos/github.svg" alt="GitHub" width={16} height={16} />
      </Link>
      <Link
        href="https://x.com/braifz"
        target="_blank"
        className="bg-white border rounded-full p-2 hover:scale-110 transition-all"
      >
        <Image src="/logos/x.svg" alt="X" width={16} height={16} />
      </Link>
    </div>
  );
};

export default SocialMediaLinks;

import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="flex gap-10 justify-end pr-44 pt-4 ">
        <Link
          href="/blog"
          className="text-lg hover:border-b border-white transition-all"
        >
          blog
        </Link>
      </div>
    </header>
  );
};

export default Header;

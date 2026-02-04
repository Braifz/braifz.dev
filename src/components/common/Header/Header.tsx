import Link from "next/link";
import { ThemeToggle } from "../ToggleTheme/ToogleTheme";

async function Header() {
  return (
    <header className="flex justify-between lg:justify-end items-center px-6 lg:px-44 pt-2 ">
      <p className="text-xl lg:hidden font-bold text-muted-foreground italic ">
        Braifz
      </p>
      <div className="flex lg:gap-14 gap-3 items-center">
        <Link href="/blog" className="text-lg hover:border-b transition-all">
          blog
        </Link>

        <a
          target="_blank"
          href="https://docs.google.com/document/d/1TJ8nf10QHjMWUef73qEXXyTXn50co_K_8v6L1PdUR1w/edit?usp=sharing"
          className="text-lg hover:border-b transition-all"
        >
          cv
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;

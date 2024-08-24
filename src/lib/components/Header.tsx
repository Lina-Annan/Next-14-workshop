"use client";

import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../functions/cn";

type Props = {
  handleSetSearchText: (text: string) => void;
};

export default function Header({ handleSetSearchText }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 flex bg-background py-4 px-20 mt-6 mb-2 justify-between duration-150 rounded-b-lg z-10 ${
        isScrolled && "shadow-lg"
      }`}
    >
      <div className="w-52" />
      <SearchInput
        placeholder="Search anything"
        onChange={(e) => handleSetSearchText(e.target.value)}
      />
      <Navigation />
    </header>
  );
}

function Navigation() {
  const pathName = usePathname();
  const currentLevel = pathName.split("/")[1].split("-")[1];

  const prevLevel = parseInt(currentLevel) - 1;
  const nextLevel = parseInt(currentLevel) + 1;

  const prevLevelPath = prevLevel >= 0 ? `/level-${prevLevel}` : "";
  const nextLevelPath = nextLevel <= 6 ? `/level-${nextLevel}` : "";

  return (
    <nav className="flex items-center gap-10">
      <div className="flex gap-5 items-center">
        <Link
          href={prevLevelPath}
          className={cn(!prevLevelPath && "opacity-50 cursor-not-allowed")}
        >
          {"<"} Previous
        </Link>
        <Link
          href={nextLevelPath}
          className={cn(!nextLevelPath && "opacity-50 cursor-not-allowed")}
        >
          Next {">"}
        </Link>
      </div>

      <Link
        href="/new-post"
        className="bg-green-600 p-2 rounded-full text-white"
      >
        + Create
      </Link>
    </nav>
  );
}

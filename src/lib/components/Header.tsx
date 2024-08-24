import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

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
      className={`sticky top-0 left-0 right-0 flex bg-background py-4 mt-6 mb-2 justify-center duration-150 rounded-b-lg z-10 ${
        isScrolled && "shadow-lg"
      }`}
    >
      <SearchInput
        placeholder="Search anything"
        onChange={(e) => handleSetSearchText(e.target.value)}
      />
    </header>
  );
}

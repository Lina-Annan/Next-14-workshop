import React from "react";
import SearchIcon from "./icons/SearchIcon";

type Props = {
  placeholder: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ placeholder, defaultValue, onChange }: Props) => {
  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className="p-2 text-black rounded-xl bg-slate-300/30 min-w-96 pl-5 pr-10"
      />
      <SearchIcon className="absolute top-[10px] right-3 w-4 h-4 " />
    </div>
  );
};

export default SearchInput;

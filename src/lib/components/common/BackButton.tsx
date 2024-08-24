"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="bg-slate-300 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-slate-400 group"
      onClick={() => router.back()}
    >
      <p className="text-black font-extrabold group-hover:text-white"> X</p>
    </div>
  );
};

export default BackButton;

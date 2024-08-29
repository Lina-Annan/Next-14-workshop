import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Posts 5",
  description: "Posts 5 description",
};

export default function Layout5({ children }: PropsWithChildren) {
  return <>{children}</>;
}

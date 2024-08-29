import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Posts 4",
  description: "Posts 4 description",
};

export default function Layout4({ children }: PropsWithChildren) {
  return <>{children}</>;
}

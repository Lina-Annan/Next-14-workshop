import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Posts 3",
  description: "Posts 3 description",
};

export default function Layout3({ children }: PropsWithChildren) {
  return <>{children}</>;
}

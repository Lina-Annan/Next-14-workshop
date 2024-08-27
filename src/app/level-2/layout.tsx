import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Layout 2",
  description: "Layout 2 description",
};

export default function Layout1({ children }: PropsWithChildren) {
  return <>{children}</>;
}

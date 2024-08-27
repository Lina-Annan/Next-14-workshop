import { Metadata } from "next";
import { PropsWithChildren } from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Layout 1",
  description: "Layout 1 description",
};
export default function Layout1({ children }: PropsWithChildren) {
  return <>{children}</>;
}

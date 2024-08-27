import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";

export const metadata: Metadata = {
  title: "Layout 2",
  description: "Layout 2 description",
};

const Layout2 = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default Layout2;

import { PropsWithChildren } from "react";

export default function PostsGridContainer({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-4 gap-3 p-8">{children}</div>;
}

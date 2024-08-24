import { Post } from "@/types/Post";
import Link from "next/link";

type Props = {
  post: Post & { image: string };
  level: number;
};

export const PostCard = ({ post, level }: Props) => {
  return (
    <div className="w-full space-y-4 shadow-lg px-4 py-4 rounded-2xl">
      <Link
        href={`/level-${level}/${post.id}`}
        className="w-full aspect-video block"
      >
        <img
          src={post.image}
          alt={post.title}
          className="rounded-2xl object-cover w-full h-full "
          loading="lazy"
          decoding="async"
        />
      </Link>
      <h2 className="text-lg font-bold text-pretty line-clamp-2 leading-5 text-ellipsis h-10">
        <Link href={`/level-${level}/${post.id}`}>{post.title}</Link>
      </h2>
      <div className="space-x-2">
        {post.tags.map((tag) => (
          <span className="text-green-700 capitalize bg-green-400/15 rounded-xl py-1 px-2 mb-1 w-fit text-xs ">
            {tag}
          </span>
        ))}
      </div>
      <p className="line-clamp-3 text-ellipsis leading-5">{post.body}</p>
    </div>
  );
};

import { Post, Tag } from "@prisma/client";

type Props = {
  post: Post & {
    tags: Tag[];
  };
};

export default function SinglePost({ post }: Props) {
  return (
    <article className="max-w-[800px] p-8 mx-auto space-y-6">
      <img
        src={post.imageSrc}
        className="w-full aspect-video object-cover rounded-2xl"
      />
      <div className="space-x-2">
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-green-700 capitalize bg-green-400/15 rounded-xl py-2 px-4 mb-1 w-fit"
          >
            {tag.name}
          </span>
        ))}
      </div>
      <h1 className="font-semibold text-3xl">{post.title}</h1>
      <p className="text-xl">{post.content}</p>
    </article>
  );
}

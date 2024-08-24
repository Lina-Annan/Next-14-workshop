import { FullPost } from "$/types/Post";

type Props = {
  post: FullPost;
};

export default async function SinglePost({ post }: Props) {
  return (
    <div className="max-w-[800px] p-8 mx-auto space-y-6">
      <img
        src={post.image}
        className="w-full aspect-video object-cover rounded-2xl"
      />
      <div className="space-x-2">
        {post.tags.map((tag) => (
          <span className="text-green-700 capitalize bg-green-400/15 rounded-xl py-2 px-4 mb-1 w-fit">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="font-semibold text-3xl">{post.title}</h1>
      <p className="text-xl">{post.body}</p>
    </div>
  );
}

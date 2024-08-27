import NoPosts from "$/lib/components/posts/NoPosts";
import SinglePost from "$/lib/components/posts/SinglePost";
import { getPost, getPosts } from "$/lib/utils/api";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const { posts } = await getPosts({ page: 1 });

  return posts.map((post) => ({
    id: post.id.toString(), // Ensure the ID is a string
  }));
}

export default async function PostPage1({ params: { id } }: PageProps) {
  const postId = parseInt(id);
  const post = await getPost(postId);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!post) {
    return <NoPosts />;
  }

  return <SinglePost post={post} />;
}

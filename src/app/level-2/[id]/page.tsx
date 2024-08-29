import prisma from "$/lib/clients/prisma";
import NoPosts from "$/lib/components/posts/NoPosts";
import SinglePost from "$/lib/components/posts/SinglePost";
import { getPost } from "$/lib/utils/api";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return posts.map(({ id }) => ({ params: { id: id.toString() } }));
}

export default async function PostPage2({ params: { id } }: PageProps) {
  const postId = parseInt(id);
  const post = await getPost(postId);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!post) {
    return <NoPosts />;
  }

  return <SinglePost post={post} />;
}

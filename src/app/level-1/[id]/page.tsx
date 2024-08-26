import SinglePost from "$/lib/components/posts/SinglePost";
import SinglePostSkeleton from "$/lib/components/posts/SinglePostSkeleton";
import useGetPost from "$/lib/hooks/useGetPost";
import { getPost, getPosts } from "$/lib/utils/api";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    id: string; // Change the type to string
  };
};

export async function generateStaticParams({ params: { id } }: Props) {
  const { posts } = await getPosts({});

  return posts.map((post) => ({
    id: post.id.toString(), // Ensure the ID is a string
  }));
}

export async function generateMetadata(
  { params: { id } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const postId = parseInt(id);
  if (Number.isNaN(postId)) {
    throw new Error("Invalid ID");
  }
  const post = await getPost(postId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    openGraph: {
      title: post.title, // Title of the post
      description: post.content, // Description of the post
      images: [post.imageSrc, ...previousImages], // Image URL(s)
      url: `http://localhost:3000/level-1/${id}`, // URL of the post
      type: "article", // Type of the content
    },
  };
}

export default async function PostPage1({ params: { id } }: Props) {
  const postId = parseInt(id);
  const post = await getPost(postId);
  if (!post) {
    return <div>No Data</div>;
  }
  // JSON-LD data for a blog post (Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title, // Title of the article
    image: post.imageSrc, // URL of the image
    description: post.content, // Description or summary of the article
    author: {
      "@type": "Person",
      name: post.authorId, // Author's name (assuming you have this field)
    },
    datePublished: post.createdAt, // Publish date (if available)
    publisher: {
      "@type": "Organization",
      name: "Next website", // Your website or organization's name
      // logo: {
      //   "@type": "ImageObject",
      //   url: "URL-to-your-logo.png", // Logo of your website or organization
      // },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `http://localhost:3000/level-1/${id}`, // URL of the post
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SinglePost post={post} />
    </>
  );
}

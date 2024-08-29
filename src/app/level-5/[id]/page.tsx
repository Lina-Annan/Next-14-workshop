import NoPosts from "$/lib/components/posts/NoPosts";
import SinglePost from "$/lib/components/posts/SinglePost";
import { getPost, getPosts } from "$/lib/utils/api";
import { Metadata, ResolvingMetadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [];

  const { posts } = await getPosts({ page: 1 });

  return posts.map((post) => ({
    id: post.id.toString(), // Ensure the ID is a string
  }));
}

export async function generateMetadata(
  { params: { id } }: PageProps,
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

  const description = `${post.content.slice(0, 160)}...`;

  return {
    title: post.title,
    description,
    robots: "index, follow",
    openGraph: {
      title: post.title, // Title of the post
      description, // Description of the post
      images: [post.imageSrc, ...previousImages], // Image URL(s)
      url: `http://localhost:3000/level-1/${id}`, // URL of the post
      type: "article", // Type of the content
    },
  };
}

export default async function PostPage1({ params: { id } }: PageProps) {
  const postId = parseInt(id);
  const post = await getPost(postId);
  if (!post) {
    return <NoPosts />;
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

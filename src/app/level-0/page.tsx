import PostsContainer from "$/lib/components/posts/PostsContainer";
import PostsHeader from "$/lib/components/posts/PostsHeader";
import PostsProvider from "$/lib/providers/PostsProvider";

export default function Level0PostsPage() {
  return (
    <PostsProvider>
      <PostsHeader />
      <PostsContainer />
    </PostsProvider>
  );
}

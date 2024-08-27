import CreatePostForm from "$/lib/components/posts/CreatePostForm";

export default function CreatePostPage() {
  return (
    <main className="p-8">
      <h1 className="text-5xl font-bold text-center mt-20">Create a post</h1>
      <div className="max-w-[600px] p-8 mx-auto mt-28">
        <CreatePostForm />
      </div>
    </main>
  );
}

"use client";

import addPost from "$/lib/actions/add-post";
import NumberInput from "$/lib/components/common/Input/NumberInput";
import TextInput from "$/lib/components/common/Input/TextInput";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onPostCreated?: () => void;
};

export default function CreatePostForm({ onPostCreated }: Props) {
  const queryClient = useQueryClient();

  const formAction = async (formData: FormData) => {
    await addPost(formData);
    onPostCreated?.();

    const r1 = queryClient.getQueriesData({
      predicate: (query) => query.queryKey[0] === "posts",
    });

    await queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "posts",
    });
    const r2 = queryClient.getQueriesData({
      predicate: (query) => query.queryKey[0] === "posts",
    });

    console.log(r1, r2);
  };

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4">
        <TextInput label="Title" name="title" placeholder="Title" />
        <TextInput label="Content" name="content" placeholder="Body" />
        <NumberInput label="Author ID" name="authorId" placeholder="User ID" />

        <button
          type="submit"
          className="w-full py-2 mt-5 text-white bg-blue-400 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

"use client";

import NumberInput from "$/lib/components/common/Input/NumberInput";
import TextInput from "$/lib/components/common/Input/TextInput";

export default function CreatePostForm() {
  const addPost = async (formData: FormData) => {
    const title = formData.get("title");
    const body = formData.get("body");
    const userId = formData.get("userId");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <TextInput label="Title" name="title" placeholder="Title" />
        <TextInput label="Body" name="body" placeholder="Body" />
        <NumberInput label="User ID" name="userId" placeholder="User ID" />
        <button
          type="submit"
          onClick={() => {
            // onModalClose?.();
          }}
          className="w-full py-2 mt-5 text-white bg-blue-400 rounded-lg hover:bg-blue-600"
        >
          submit
        </button>
      </form>
    </div>
  );
}

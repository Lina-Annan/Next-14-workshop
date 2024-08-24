import NumberInput from "$/lib/components/common/Input/NumberInput";
import TextInput from "$/lib/components/common/Input/TextInput";
import addPost from "./AddPost";

export default function CreatePostForm() {
  return (
    <div>
      <form action={addPost} className="flex flex-col gap-4">
        <TextInput label="Title" name="title" placeholder="Title" />
        <TextInput label="Content" name="content" placeholder="Body" />
        <NumberInput label="Author ID" name="authorId" placeholder="User ID" />

        <button
          type="submit"
          className="w-full py-2 mt-5 text-white bg-blue-400 rounded-lg hover:bg-blue-600"
        >
          submit
        </button>
      </form>
    </div>
  );
}

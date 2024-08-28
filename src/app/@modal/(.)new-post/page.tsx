"use client";

import Modal from "$/lib/components/Modal";
import CreatePostForm from "$/lib/components/posts/CreatePostForm";
import { useRouter } from "next/navigation";

export default function NewPostModal() {
  const router = useRouter();

  return (
    <Modal title="Add a new post" isOpen onModalClose={router.back}>
      <CreatePostForm onPostCreated={router.back} />
    </Modal>
  );
}

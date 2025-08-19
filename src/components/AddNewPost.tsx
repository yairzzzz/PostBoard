import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { postsStore } from "../store/postsStore";

const AddNewPost = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const [isLoading, setIsLoading] = useState(false);

  const { addLocalPost } = postsStore();

  const el = document.getElementById("my_modal");
  const openModal = () => {
    if (el instanceof HTMLDialogElement) el.showModal();
  };

  const closeModal = () => {
    if (el instanceof HTMLDialogElement) el.close();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const title = newPost.title.trim().toLocaleLowerCase();
      const body = newPost.body.trim().toLowerCase();

      if (!title || !body) {
        return toast.error("Title and body are required.");
      }

      if (title.length > 70) {
        return toast.error("Title can't exceed 70 characters");
      }

      if (body.length > 140) {
        return toast.error("Body can't exceed 140 characters");
      }

      if (!/^[A-Za-z]+$/.test(title) || !/^[A-Za-z]+$/.test(body)) {
        return toast.error("Only letters are allowed!");
      }
      // delaying slightly the execution time-250ms to display the loading state
      await new Promise((resolve) => setTimeout(resolve, 250));
      addLocalPost(title, body);
      toast.success("Post created");

      setNewPost({ title: "", body: "" });
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="  w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition duration-200"
        onClick={openModal}
      >
        <Plus className="" />
      </button>

      <dialog id="my_modal" className="modal">
        <div className="modal-box h-[35%] w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg text-secondary ml-2">
            Create New Post
          </h3>

          <div className="modal-action flex flex-col">
            {/* Form */}

            <form
              method="dialog"
              className="flex flex-col w-full space-y-4 sm:space-y-6"
            >
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="input input-primary w-full"
                required
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />

              <label htmlFor="body" className="sr-only">
                Body
              </label>
              <textarea
                id="body"
                placeholder="What's on your mind?"
                className="textarea textarea-primary w-full  resize-none"
                required
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
              />
            </form>

            <div className="mt-5 flex justify-between">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-secondary w-25 sm:w-35"
              >
                <span>
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary w-25 sm:w-35"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddNewPost;

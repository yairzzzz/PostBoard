import { useEffect } from "react";
import { postsStore } from "../store/postsStore";
import { MessageSquareMore, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import CommentsSkeleton from "../components/CommentsSkeleton";

const ViewPostPage = () => {
  const { comments, posts, getComments, selectedPostId, isCommentsLoading } =
    postsStore();

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  useEffect(() => {
    if (!selectedPostId) return;

    getComments(selectedPostId);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center ">
      <section className=" mt-12 sm:mt-14 h-[95%] w-full sm:h-[90%] sm:w-[90%] bg-base-200 rounded-2xl shadow-2xl  flex flex-col items-center relative overflow-x-hidden ">
        {/* Return button */}

        <div
          className="tooltip tooltip-bottom absolute right-17 top-19 -translate-y-1/2"
          data-tip="Return to home page"
        >
          <Link
            to="/"
            className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition duration-200"
          >
            <Undo2 />
          </Link>
        </div>
        {/* Title */}
        <div className="flex items-center justify-center gap-2 shadow-sm pb-15 mt-10 w-full">
          <div className="size-9 rounded-lg bg-secondary/10 flex items-center justify-center mt-1">
            <MessageSquareMore className="size-6 text-secondary" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold  drop-shadow-sm tracking-wide ">
            View Post Details
          </h1>
        </div>

        {isCommentsLoading ? (
          <CommentsSkeleton />
        ) : (
          <div className="card bg-base-300 sm:mx-10 shadow-xl sm:mt-10">
            <div className="card-body">
              <div className="ml-18">
                <h2 className="card-title text-primary">
                  {selectedPost?.title}
                </h2>
                <p>{selectedPost?.body}</p>
              </div>

              <ul className="card-body list">
                <li className="p-4 ml-10 pb-0 list-none opacity-70 tracking-wide text-primary">
                  Comments ({comments.length})
                </li>
                {comments.map((c, i) => (
                  <Comment
                    key={i}
                    id={c.id}
                    name={c.name}
                    email={c.email}
                    body={c.body}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewPostPage;

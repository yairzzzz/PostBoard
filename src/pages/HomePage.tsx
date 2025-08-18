import Card from "../components/Card";
import { Plus, StickyNote } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardsSkeleton from "../components/CardsSkeleton";
import { useLocalStorage } from "@uidotdev/usehooks";
import SearchField from "../components/SearchField";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { postsStore } from "../store/postsStore";

export const HomePage = () => {
  const { posts, isPostsLoading, getPosts, setSelectedPostId } = postsStore();

  const PAGE_SIZE = 12;
  const [query, setQuery] = useState("");
  const [page, setPage] = useLocalStorage("pagination-page", 1);

  const formatForSearch = (s: string): string => s.toLowerCase().trim();

  const filteredPosts = useMemo(() => {
    const q = formatForSearch(query);
    if (!q) return posts;
    return posts.filter((p) => p.title.includes(q));
  }, [posts, query]);

  const totalPages = Math.max(Math.ceil(filteredPosts.length / PAGE_SIZE)) || 1;

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  useEffect(() => setPage(1), [query]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center ">
      <section className="mt-12 sm:mt-14 h-[95%] w-full sm:h-[90%] sm:w-[90%] bg-base-200 rounded-2xl shadow-2xl overflow-y-auto flex flex-col relative overflow-x-hidden">
        <div className="sticky top-0 z-20 bg-base-200 px-4 py-4 shadow-sm mt-7 ">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="size-9 rounded-lg bg-secondary/10 flex items-center justify-center mt-1">
              <StickyNote className="size-6 text-secondary" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-sm tracking-wide ">
              Posts
            </h1>
          </div>

          {/* Plus button */}
          <div
            className="tooltip tooltip-bottom absolute  right-17 top-12  -translate-y-1/2"
            data-tip="Add a new post"
          >
            <Link
              to="/new"
              className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition duration-200"
            >
              <Plus />
            </Link>
          </div>

          {/* Search field */}
          <div className="flex justify-center mt-3">
            <SearchField value={query} onChange={setQuery} />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center sm:mx-8 sm:mt-8 ">
          {isPostsLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <CardsSkeleton key={i} />
              ))
            : pageItems.map((post, i) => (
                <Card
                  onClick={() => setSelectedPostId(post.id)}
                  key={i}
                  title={post.title}
                  body={post.body}
                  to={`/posts/${post.id}`}
                />
              ))}
        </div>

        <div className="flex justify-center mt-auto pt-5 ">
          {/* Pagination logic */}
          <Stack spacing={2} className="mb-10  ">
            <Pagination
              size="large"
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "grey",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "grey",
                  color: "white",
                },
              }}
            />
          </Stack>
        </div>
      </section>
    </div>
  );
};

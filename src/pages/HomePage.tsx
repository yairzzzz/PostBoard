import Card from "../components/Card";
import { SearchX, StickyNote } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardsSkeleton from "../components/CardsSkeleton";
import { useLocalStorage } from "@uidotdev/usehooks";
import SearchField from "../components/SearchField";
import { useEffect, useMemo, useRef, useState } from "react";
import { postsStore } from "../store/postsStore";
import AddNewPost from "../components/AddNewPost";

export const HomePage = () => {
  const { posts, isPostsLoading, getPosts, setSelectedPostId } = postsStore();

  const PAGE_SIZE = 12;
  const [query, setQuery] = useState("");
  const [page, setPage] = useLocalStorage("pagination-page", 1);

  const formatForSearch = (s: string): string => s.toLowerCase().trim();

  const timerRef = useRef<number | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (query === "") {
      // <-- bypass debounce on clear
      setDebouncedQuery("");
      return;
    }

    timerRef.current = window.setTimeout(() => setDebouncedQuery(query), 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const filteredPosts = useMemo(() => {
    const q = formatForSearch(debouncedQuery);
    if (!q) return posts;
    return posts.filter((p) => p.title.includes(q));
  }, [posts, debouncedQuery]);

  const totalPages = Math.max(Math.ceil(filteredPosts.length / PAGE_SIZE)) || 1;

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  useEffect(() => {
    if (query) setPage(1);
  }, [query]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center ">
      <section className="mt-14  h-[95%] w-full sm:h-[90%] sm:w-[90%] bg-base-200 rounded-2xl shadow-2xl overflow-y-auto flex flex-col relative overflow-x-hidden">
        <div className="sticky top-0 z-20 bg-base-200 px-4 py-4 shadow-sm mt-4 ">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="size-7 sm:size-9 rounded-lg bg-secondary/10 flex items-center justify-center mt-1">
              <StickyNote className="size-5 sm:size-6 text-secondary" />
            </div>
            <h1 className="text-2xs md:text-4xl font-bold drop-shadow-sm tracking-wide ">
              Posts
            </h1>
          </div>

          {/* Add new post */}
          <div
            className="tooltip tooltip-bottom absolute right-14 top-8 -translate-y-1/2 z-50 "
            data-tip="Add a new post"
          >
            <AddNewPost />
          </div>

          {/* :TODO? - debounce search */}

          {/* Search field */}
          <div className="flex justify-center mt-3">
            <SearchField value={query} onChange={setQuery} />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch justify-items-stretch sm:mx-8 sm:mt-5 ">
          {isPostsLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <CardsSkeleton key={i} />
            ))
          ) : !filteredPosts.length ? (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-base-content/70">
              <SearchX
                className="size-10 opacity-60 mb-3 text-secondary"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold  text-primary">
                No posts found
              </h3>
              {query && <p className="mt-1">No results for “{query}”.</p>}
              <div className="mt-6 flex gap-3"></div>
            </div>
          ) : (
            pageItems.map((post, i) => (
              <Card
                onClick={() => setSelectedPostId(+post.id)}
                key={i}
                title={post.title}
                body={post.body}
                to={`/posts/${post.id}`}
              />
            ))
          )}
        </div>

        <div className="flex justify-center mt-auto ">
          {/* Pagination logic */}
          <Stack spacing={2} className="mt-4 p-2">
            <Pagination
              size="medium"
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

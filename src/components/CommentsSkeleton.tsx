const CommentsSkeleton = () => {
  return (
    <div
      className="card card-bash bg-base-300 sm:mx-10 shadow-xl sm:mt-10 w-full sm:w-[70%] animate-pulse"
      aria-busy="true"
    >
      <div className="card-body [--gut:2.5rem]">
        <div className="grid [grid-template-columns:var(--gut)_1fr] gap-x-4">
          <span />
          <div>
            <div className="h-6 w-3/4 bg-base-content/20 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-base-content/10 rounded" />
              <div className="h-4 w-10/12 bg-base-content/10 rounded" />
            </div>
          </div>
        </div>

        <div className="grid [grid-template-columns:var(--gut)_1fr] gap-x-4 mt-6 mb-2">
          <span />
          <div className="h-4 w-32 bg-base-content/20 rounded" />
        </div>

        <ul className="list-none divide-y divide-base-200/10">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="grid [grid-template-columns:var(--gut)_1fr] gap-x-4 py-4"
            >
              <div className="h-8 w-[var(--gut)] bg-base-content/10 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-base-content/20 rounded" />
                <div className="h-3 w-full bg-base-content/10 rounded" />
                <div className="h-3 w-1/3 bg-base-content/10 rounded" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsSkeleton;

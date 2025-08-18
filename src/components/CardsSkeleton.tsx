const CardsSkeleton = () => {
  return (
    <div className="card bg-base-300 rounded-xl shadow-md w-full h-full p-10 animate-pulse">
      <div className="h-5 w-2/3 bg-base-content/20 rounded mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-base-content/10 rounded" />
        <div className="h-3 w-11/12 bg-base-content/10 rounded" />
        <div className="h-3 w-10/12 bg-base-content/10 rounded" />
      </div>
    </div>
  );
};

export default CardsSkeleton;

import type { SearchProps } from "../types/types";

const SearchField = ({ value, onChange }: SearchProps) => {
  return (
    <label className="input flex items-center w-[60%] sm:w-[40%] mb-7">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>
      <input
        type="search"
        placeholder="Search posts by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default SearchField;

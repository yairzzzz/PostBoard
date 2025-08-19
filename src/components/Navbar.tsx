import { Link } from "react-router-dom";
import daisyuiThemes from "../constants/daisyuiThemes";
import { themeStore } from "../store/themeStore";
import { ClipboardList } from "lucide-react";

const Navbar = () => {
  const { setTheme } = themeStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 w-full top-0 z-40 fixed 
  backdrop-blur-lg "
    >
      <div className=" mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className=" w-auto flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-secondary/10 flex items-center justify-center mr-4">
              <ClipboardList className="size-6 text-secondary" />
            </div>
            <h1 className="sm:block text-lg font-bold tracking-wider">
              PostBoard
            </h1>
          </Link>
          <div className="flex items-center gap-2  ">
            {/* Change theme button */}

            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-sm">
                <div className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1">
                  <div className="bg-base-content size-1.5 rounded-full" />
                  <div className="bg-primary size-1.5 rounded-full" />
                  <div className="bg-secondary size-1.5 rounded-full" />
                  <div className="bg-accent size-1.5 rounded-full" />
                </div>
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl max-h-[300px] overflow-y-auto overflow-x-hidden right-10"
              >
                <p className="menu-title text-md mb-3">Theme</p>
                {daisyuiThemes.map((theme, i) => (
                  <li
                    onClick={() => setTheme(theme)}
                    key={i}
                    className="cursor-pointer hover:opacity-90 flex justify-center items-center ml-4 "
                  >
                    <div
                      className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 group-hover:opacity-70 transition-all"
                      data-theme={theme}
                    >
                      <div className="bg-base-content size-1.5 rounded-full" />
                      <div className="bg-primary size-1.5 rounded-full" />
                      <div className="bg-secondary  size-1.5 rounded-full" />
                      <div className="bg-accent  size-1.5 rounded-full" />
                    </div>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className=" w-full btn btn-sm  btn-ghost justify-start text-lg"
                      aria-label={theme}
                      value={theme}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ setShowAbout, scrolltoFooter }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="mx-5 pt-2 relative">
        <div className="w-full my-5 bg-white flex flex-row md:items-center justify-between rounded-md shadow-lg hover:shadow-2xl px-5 py-3">
          
          <div className="flex items-center gap-4 md:ml-4">
            <img
              src="./src/images/Image.png"
              alt="image"
              className="h-12 w-12 md:h-15 md:w-15"
            />
            <h1 className="text-sm sm:text-xl md:text-3xl text-gray font-bold">
              Coding Quiz
            </h1>
          </div>

          <div className="hidden md:flex flex-row gap-7">
            <button
              className="text-xl w-auto rounded-xl p-2 hover:bg-gray-300"
              onClick={() => setShowAbout(true)}
            >
              About
            </button>
            <Link to={"/Profile"}>
              <button className="text-xl w-auto rounded-xl p-2 hover:bg-gray-300">
                Profile
              </button>
            </Link>
            <button
              className="text-xl w-auto rounded-xl p-2 hover:bg-gray-300"
              onClick={scrolltoFooter}
            >
              Contact
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-lg font-bold focus:outline-none z-50"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute right-0 mt-0 bg-white shadow-lg rounded-md px-5 py-3 flex flex-col gap-3 w-40 animate-slide-down z-50">
            <button
              className="text-sm w-auto rounded-xl p-2 hover:bg-gray-300 text-left"
              onClick={() => {
                setShowAbout(true);
                setMenuOpen(false);
              }}
            >
              About
            </button>
            <Link to={"/Profile"}>
              <button
                className="text-sm w-full rounded-xl p-2 hover:bg-gray-300 text-left"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </button>
            </Link>
            <button
              className="text-sm w-full rounded-xl p-2 hover:bg-gray-300 text-left"
              onClick={() => {
                scrolltoFooter();
                setMenuOpen(false);
              }}
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </>
  );
}

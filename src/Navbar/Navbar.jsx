
import { Link } from "react-router-dom";

export default function Navbar({setShowAbout,scrolltoFooter}) {
  return (
    <>
            <div className="mx-5 pt-2">
              <div className="w-full my-5 bg-white flex flex-row md:items-center justify-between rounded-md shadow-lg hover:shadow-2xl px-5 py-3">
                <div className="flex items-center gap-4 md:ml-4">
                  <img
                    src="./src/images/Image.png"
                    alt="image"
                    className="h-12 w-12 md:h-15 md:w-15"
                  />
                  <h1 className="text-xl sm:text-sm md:text-3xl text-gray font-bold">
                    Coding Quiz
                  </h1>
                </div>
                <div className="mt-4 md:mt-0 flex  md:flex-row gap-0.5 md:gap-7">
                  <button
                    className="text-sm  w-auto hover:bg-gray-300 md:text-xl md:w-auto rounded-xl p-2 text-center"
                    onClick={() => setShowAbout(true)}
                  >
                    About
                  </button>
                  <Link to={'/Profile'}>
                    <button
                      className="text-sm  w-auto hover:bg-gray-300 md:text-xl md:w-auto rounded-xl p-2 text-center "
                    >
                      Profile
                    </button>
                    </Link>
                    <button
                      className="text-sm  w-auto hover:bg-gray-300 md:text-xl md:w-auto rounded-xl p-2 text-center"
                      onClick={scrolltoFooter}
                    >
                      Contact
                    </button>
                 
                </div>
              </div>
            </div>
  </>
  );
}

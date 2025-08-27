import { useState, useRef} from "react";
import Navbar from "../Navbar/Navbar";
import MainSection from "../MainSection/MainSection";
import { About } from "../Navbar/About";
import Footer from "../Footer/Footer";
import Instructions from "../MainSection/Instructions";

export default function HomePage() {
  const [showAbout, setShowAbout] = useState(false);
  const footerRef = useRef();

  const scrolltoFooter=()=>{
    footerRef.current?.scrollIntoView({behavior:"smooth"});
  }
  return (
    <>
      <div className={showAbout ? "blur-sm pointer-events-none" : ""}>
        <Navbar setShowAbout={setShowAbout} scrolltoFooter={scrolltoFooter}/>
        <MainSection />
        <Instructions />
        <div ref={footerRef}>
        <Footer />
        </div>
      </div>
      {showAbout && (
        <div
          className=" fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 "
          onClick={() => setShowAbout(false)}
        >
          <div
            className=" relative rounded-lg w-auto h-auto "
            onClick={(e) => e.stopPropagation()}
          >
      <button
        onClick={() => setShowAbout(false)}
        className="absolute top-2 right-2  text-xl font-bold"
      >
        ✖
      </button>
            <About />
          </div>
        </div>
      )}
    </>
  );
}

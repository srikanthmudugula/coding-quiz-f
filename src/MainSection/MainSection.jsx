import LangCards from "./Langcards";
export default function MainSection(){
    return(
    <>
    <div className="w-full md:h-[200px] flex justify-center px-5">
  <img
    src="./src/images/coder-mantra-small-banner.jpg"
    alt="banner"
    className="max-w-9xl w-full h-auto rounded-lg hover:opacity-95"
  />
 </div>
 <LangCards />
    </>
    );
}
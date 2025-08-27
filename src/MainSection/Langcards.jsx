import { Link } from "react-router-dom";
import { useQuestions } from "../QuestionP/QuestionProvider";

export default function LangCards(){
  const{setCategory} = useQuestions();

  const handleSelectCategory=(option)=>{
    setCategory(option)
  }
    return(
    <>
    <div className="w-full flex flex-row justify-center items-start gap-15 px-10 py-15 ">
  <Link to={"/JRules"}>
  <div className="md:w-[250px] sm:w-[200px] rounded-lg bg-white group">
    <div className="w-full md:h-[250px] sm:h-[200px] overflow-visible relative">
      <img
        src="./src/images/java-quiz.png"
        alt="java"
        className="w-full h-full  transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-2 "
        onClick={()=>handleSelectCategory("java")}
      />
    </div>
    <div className="text-sm md:text-lg font-medium text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
      Java Quiz
    </div>
  </div>
 </Link>
 <Link to={"/PRules"}>
  <div className="md:w-[250px] sm:w-[200px] rounded-lg bg-white group">
    <div className="w-full md:h-[250px] sm:h-[200px] overflow-visible relative">
      <img
        src="./src/images/python-quiz.png"
        alt="python"
        className="w-full h-full  transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-2"
        onClick={()=>handleSelectCategory("python")}
      />
    </div>
    <div className="text-sm md:text-lg font-medium text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
      Python Quiz
    </div>
  </div>
  </Link>
  <Link to={"/JSRules"}>
  <div className="md:w-[250px] sm:w-[200px] rounded-lg bg-white group ">
    <div className="w-full md:h-[250px] sm:h-[200px] overflow-visible relative">
      <img
        src="./src/images/javaScript-quiz.png"
        alt="js"
        className="w-full h-full  transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-2"
        onClick={()=>handleSelectCategory("JavaScirpt")}
      />
    </div>
    <div className="text-sm md:text-lg font-medium text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
      JavaScript Quiz
    </div>
  </div>
  </Link>
</div>

    </>
    );
}
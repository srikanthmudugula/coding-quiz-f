import { Link } from "react-router-dom";
import { useQuestions } from "../QuestionP/QuestionProvider";


export default function JavaRules(){
  const {setQuestions} = useQuestions();

  const getQuestions = async() =>{
    try{
    const res = await fetch("http://localhost:8080/question/category/java");
    if(!res.ok){
      alert(`error Message: ${res.status}`)
    }
    const questions =  await res.json();
    setQuestions(questions)
    console.log(questions);
    
    }
    catch(error){
      console.error("error getting questions: ",error)
    }
  }
    return(
    <>
    <div className="min-h-screen flex justify-center items-center px-5">
    <div className="bg-gray-500 w-full sm:w-[90%] md:w-[800px] h-auto md:h-[500px]  rounded-lg text-white mx-auto p-10 my-[10%]
     flex flex-col items-center">
 <div >
  <h1 className="text-xl sm:text-2xl font-bold mb-4">
    Important Instructions Before You Start the Quiz
  </h1>
  <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base md:text-lg md:my-8">
    <li>Each question has a time limit of 1 minute. Make sure to read and answer correctly.</li>
    <li>Covers Java fundamentals, OOPS, Threads, Exceptions handling and Collections.</li>
    <li>Timer starts as soon as the question appears. No extra time will be given once it runs out.</li>
    <li>You cannot change your answer once submitted. Think carefully before confirming.</li>
    <li>Each correct answer gives you +1 mark. Aim for the highest score!</li>
    <li>No negative marking for wrong answers. So it's worth taking a guess.</li>
  </ol>
 </div>
 
  <div className="my-5 py-5">
    <Link to={"/JQuestions"}>
  <button className="text-black text-xl font-bold w-auto h-auto bg-green-500 hover:bg-green-600 px-2 rounded-lg" onClick={getQuestions}>Start Quiz</button>
  </Link>
  </div>  
</div>
</div>
    </>
    );
}
import { Link } from "react-router-dom";
import { useQuestions } from "../QuestionP/QuestionProvider";
import { useState } from "react";
import API_BASE_URL from "../url";

export default function JSRules(){
  const { setQuestions,category } = useQuestions();
  const [loading, setLoading] = useState(false); 

  const getQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/question/category/${category}`);
      if (!res.ok) {
        alert(`Error Message: ${res.status}`);
      }
      const questions = await res.json();
      setQuestions(questions);
    } catch (error) {
      console.error("Error getting questions: ", error);
    } finally {
      setLoading(false);
    }
  };

    return(
    <>
    <div className="min-h-screen flex justify-center items-center px-5">
    <div className="bg-gray-500 w-auto sm:w-[90%] md:w-[800px] h-auto md:h-[500px]  rounded-lg text-white p-10
     flex flex-col items-center justify center">
    <div>
  <h1 className="text-xl sm:text-2xl font-bold mb-4">
    Important Instructions Before You Start the Quiz
  </h1>
  <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base md:text-lg md:my-8">
    <li>Each question has a time limit of 1 minute. Make sure to read and answer correctly.</li>
    <li>Covers JavaScript fundamentals, DOM manipulation, functions, OOP, event handling, and asynchronous programming.</li>
    <li>Timer starts as soon as the question appears. No extra time will be given once it runs out.</li>
    <li>You cannot change your answer once submitted. Think carefully before confirming.</li>
    <li>Each correct answer gives you +1 mark. Aim for the highest score!</li>
    <li>No negative marking for wrong answers. So it's worth taking a guess.</li>
  </ol>
 </div>
  <div className="my-5 py-5">
            <Link to={"/JSQuestions"}>
              <button
                className={`text-black text-xl font-bold w-auto h-auto px-4 py-2 rounded-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={getQuestions}
                disabled={loading}
              >
                {loading ? "Loading questions..." : "Start Quiz"}
              </button>
            </Link>
          </div>
</div>
</div>
    </>
    );
}
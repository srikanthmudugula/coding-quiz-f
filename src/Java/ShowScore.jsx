import { useQuestions } from "../QuestionP/QuestionProvider";
import { Link } from "react-router-dom";
export default function  SecuredScore(){
    const{showScore, Notanswered} = useQuestions();
    return(
    <>
    <div className="min-h-screen  flex justify-center items-center">
        <div className="h-auto w-2xl p-5 bg-gray-800 rounded-lg">
        <div className="flex flex-col w-full h-full p-5 gap-3">
            <span className="text-xl w-full p-3 text-white rounded-lg bg-blue-400">Total Questions:  50</span>
            <span className="text-xl w-full p-3 text-white rounded-lg bg-gray-600">Answered:  {50-Notanswered}</span>
            <span className="text-xl w-full p-3 text-white rounded-lg bg-green-600">currect:  {showScore}</span>
        </div>
        
           <div className="flex justify-between w-full px-5">
            <Link to={'/HomePage'}>
            <button className=" bg-gray-200 w-auto h-auto text-center text-xl  font-bold p-2 rounded-lg">Home</button>
            </Link>
            <Link to={'/Profile'}>
            <button className=" bg-gray-200 w-auto h-auto text-center text-xl  font-bold p-2 rounded-lg">Profile</button>
            </Link>
           </div>
        </div>
    </div>
    </>
    );
}
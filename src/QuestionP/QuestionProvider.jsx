import { useState, useEffect, useContext, createContext } from "react";

const QuestionContext = createContext();

export const QuestionP = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) || []
  );
  const [showScore, setShowScore] = useState(
    JSON.parse(localStorage.getItem("showScore")) || 0
  );
  const [Notanswered, setNotAnswered] = useState(
    JSON.parse(localStorage.getItem("Notanswered")) || 50
  );
  const [category,setCategory] = useState(
    JSON.parse(localStorage.getItem("category")) || null
  );
  const[user,setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const[refreshProfile,setRefreshProfile] = useState(false);
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("showScore", JSON.stringify(showScore));
  }, [showScore]);

  useEffect(() => {
    localStorage.setItem("Notanswered", JSON.stringify(Notanswered));
  }, [Notanswered]);
  useEffect(()=>{
    if(category){
    localStorage.setItem("category", JSON.stringify(category));
    }
  },[category])
   useEffect(()=>{
    if(user){
    localStorage.setItem("user",JSON.stringify(user))
    }
   },[user])

   const triggerRefresh=()=>{
    setRefreshProfile(prev=>!prev)
   }
  return (
    <QuestionContext.Provider
      value={{
        questions, setQuestions,
        answers, setAnswers,
        showScore, setShowScore,
        Notanswered, setNotAnswered,
        category, setCategory,
        user,setUser,
        refreshProfile, setRefreshProfile,
        triggerRefresh
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);

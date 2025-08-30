import { useState, useEffect } from "react";
import { useQuestions } from "../QuestionP/QuestionProvider";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import API_BASE_URL from "../url";

export default function Questions() {
  const { questions, setQuestions, showScore, setShowScore, Notanswered, setNotAnswered, category, user, setRefreshProfile, triggerRefresh } = useQuestions();

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem(`currentIndex_${category}`);
    return savedIndex ? Number(savedIndex) : 0;
  });

  const [timeleft, setTimeleft] = useState(() => {
    const savedTime = localStorage.getItem(`timeleft_${category}`);
    return savedTime ? Number(savedTime) : 60;
  });

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(`answers_${category}`);
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiRunning, setConfettiRunning] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!category) return;
    const savedTime = localStorage.getItem(`timeleft_${category}`);
    if (savedTime !== null) setTimeleft(Number(savedTime));
  }, [category]);

  useEffect(() => {
    if(!quizSubmitted) return;
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setTimeleft(60);
    localStorage.removeItem(`currentIndex_${category}`);
    localStorage.removeItem(`timeleft_${category}`);
    localStorage.removeItem(`answers_${category}`);
  }, [quizSubmitted,category]);

  useEffect(() => { localStorage.setItem(`timeleft_${category}`, timeleft); }, [timeleft, category]);
  useEffect(() => { localStorage.setItem(`currentIndex_${category}`, currentIndex); }, [currentIndex, category]);
  useEffect(() => { localStorage.setItem(`answers_${category}`, JSON.stringify(answers)); }, [answers, category]);

  useEffect(() => {
    if (quizSubmitted) {
      setShowConfetti(true);
      setConfettiVisible(true);
      setConfettiRunning(true);

      const timer = setTimeout(() => {
        setShowConfetti(false);
        setConfettiRunning(false);
      }, 10000);

      const hideTimer = setTimeout(() => {
        setConfettiVisible(false);
      }, 15000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [quizSubmitted]);

  useEffect(() => {
    if (quizSubmitted) return;
    if (timeleft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeleft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeleft, quizSubmitted]);

  useEffect(() => {
    if (quizSubmitted) {
      submitAnswers();
      countNotAnswered();
    }
  }, [quizSubmitted]);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      setLoading(true);
      fetch(`${API_BASE_URL}/question/category/${category}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(data);
          setLoading(false);
        })
        .catch(err => {
          console.log("error in getting questions", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [questions, setQuestions, category]);

  const handleNext = () => {
    const currentQ = questions?.[currentIndex];
    if (!currentQ) return;

    const updatedAnswers = [
      ...answers.filter(a => a.questionId !== currentQ.id),
      { questionId: currentQ.id, selectedOption },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeleft(60);
    } else {
      setQuizSubmitted(true);
      localStorage.removeItem(`timeleft_${category}`);
      localStorage.removeItem(`currentIndex_${category}`);
      localStorage.removeItem(`answers_${category}`);
    }
  };

  const countNotAnswered=()=>{
    const notAnswered = answers.filter((a)=>a.selectedOption == null).length;
   setNotAnswered(notAnswered);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const submitAnswers = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/question/submitAns`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (response.ok) {
        const score = await response.json();
        setShowScore(score);
        handleSubmit(score);
        setRefreshProfile(prev => !prev);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (finalScore) => {
    try {
      const response = await fetch(`${API_BASE_URL}/question/saveQuiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, category, score: finalScore }),
      });
      if (!response.ok) throw new Error("Failed to save result");
      const data = await response.json();
      triggerRefresh();
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const currentQuestion = questions?.[currentIndex];

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">Loading Questions...</div>;
  if (submitting) return <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">Submitting your answers...</div>;

  if (quizSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 text-2xl gap-5">
        {confettiVisible && <Confetti width={width} height={height} recycle={confettiRunning} numberOfPieces={500} />}
        🎉 Quiz Submitted! Thank you.
        <Link to={"/ShowScore"}>
          <button className="bg-green-500 w-auto h-auto p-2 rounded-lg text-xl" onClick={() => setShowResult(true)}>Get Result</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-5">
      {questions && questions.length > 0 && currentQuestion ? (
        <div className="relative w-full max-w-4xl">
          <div className="absolute -top-10 right-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md mb-2">
            Time Left: {timeleft}s
          </div>
          <div className="bg-gray-700 w-full text-white rounded-xl p-10">
            <div className="mb-10 border-black rounded-sm p-2 text-center bg-gray-200">
              <p className="text-lg md:text-xl text-black">
                {currentIndex + 1}. {currentQuestion.question}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-lg mb-6">
              {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((opt, idx) => (
                <p
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`cursor-pointer text-black rounded-sm text-center py-2
                    ${selectedOption === opt ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-500 hover:text-white"}
                    ${selectedOption !== null && selectedOption !== opt ? "pointer-events-none opacity-50" : ""}
                  `}
                >
                  {opt}
                </p>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={handleNext} className={`px-4 py-2 rounded ${currentIndex === questions.length - 1 ? "bg-green-500" : "bg-blue-500"}`}>
                {currentIndex === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">Error in getting Questions</div>
      )}
    </div>
  );
}

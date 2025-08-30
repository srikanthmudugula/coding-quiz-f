import { useQuestions } from "../QuestionP/QuestionProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../url"

export default function Profile() {
  const { user, refreshProfile, setUser} = useQuestions();
  const [userData, setUserdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/question/userProfile/${user}`)
      .then((res) => {
        if (!res.ok) throw new Error("user not found");
        return res.json();
      })
      .then((data) => {
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setUserdata(sortedData);
      })
      .catch((err) => console.error(err));
  }, [user, refreshProfile]);
  const handleLogout=()=>{
    setUser(null);
    navigate('/')

  }
  if (userData === null) return <div className="min-h-screen flex justify-center items-center"><p className="text-xl text-gray-700">Loading...</p>;</div>
  if (userData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hi {user}, you haven't attempted any quizzes yet.
          </h2>
          <div className="flex justify-center gap-4">
          <Link to={"/HomePage"}>
            <button className="w-auto h-auto bg-blue-500 text-white hover:bg-blue-600 rounded-lg p-2">
              Take Your First Quiz
            </button>
          </Link>
          <button
              onClick={handleLogout}
              className="w-auto h-auto bg-red-500 text-white hover:bg-red-600 rounded-lg p-2"
            >
              Logout
            </button>
            </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {userData[0].username}
        </h2>
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2"
          >
            Logout
          </button>
          </div>
        <div className="space-y-4">
          {userData.map((attempt, index) => (
            <div
              key={attempt.id}
              className="bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <p className="text-gray-700 font-semibold">
                Attempt #{userData.length - index}
              </p>
              <p className="text-gray-600">Category: {attempt.category}</p>
              <p className="text-gray-600">Score: {attempt.score}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-gray-700 flex justify-between">
          <p className="font-medium">Total Attempts: {userData.length}</p>
          <Link to={"/HomePage"}>
            <button className="w-auto h-auto bg-gray-200 hover:bg-gray-300 rounded-lg p-2">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

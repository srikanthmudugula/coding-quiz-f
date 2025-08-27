import { Link } from "react-router-dom";
export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4 relative overflow-hidden">
      <div className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          🖥️ Coding Quiz
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Test your skills in <span className="font-semibold">Java</span>, 
          <span className="font-semibold"> JavaScript</span>, and 
          <span className="font-semibold"> Python</span> — Challenge yourself & grow!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={"/signupForm"}>
          <button
            className="px-8 py-3 bg-white text-gray-800 hover:text-white rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
          </Link>
          <Link to={"/LoginForm"}>
          <button
            className="px-8 py-3 bg-white text-gray-800 hover:text-white border border-gray-300 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
          </Link>
        </div>
        <div className="mt-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            alt="Quiz Illustration"
            className="w-full max-w-xs mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

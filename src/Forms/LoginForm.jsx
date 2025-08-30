import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../QuestionP/QuestionProvider";
import API_BASE_URL from "../url";

export function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { setUser } = useQuestions();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true); 
    try {
      const res = await fetch(`${API_BASE_URL}/user/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      if (res.ok) {
        const data = await res.json();
        console.log("logged in user :", data);
        setUser(data.username);
        navigate("/HomePage");
      } else if (res.status === 401) {
        setErrorMsg("Email and password didn't match");
      } else {
        setErrorMsg("Something went wrong.. Try again later");
      }
    } catch (error) {
      setErrorMsg("Server error.. Please try again later");
      console.error("server error...", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 font-medium text-center">{errorMsg}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            disabled={loading} 
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            disabled={loading} 
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

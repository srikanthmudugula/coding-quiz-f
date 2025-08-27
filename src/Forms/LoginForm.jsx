import { useState} from "react";
import {useNavigate } from 'react-router-dom';
import { useQuestions } from "../QuestionP/QuestionProvider";

export function LoginForm() {
  const[credentials,setCredentials] = useState({
    email:"",
    password:""
  })
const[errorMsg, seterrorMsg] = useState('');
const Navigate = useNavigate();
const{setUser} = useQuestions();

const handleChange=(e)=>{
setCredentials((prev)=>({
...prev,
[e.target.name]:e.target.value
})
)
}
const handlesubmit = async(e)=>{
  e.preventDefault();
  seterrorMsg('')
  try{
    const res = await fetch("http://localhost:8080/user/auth/login",{
      method:"Post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(credentials)
    })
    
    if(res.ok){
      const data = await res.json();
      console.log("loged in user :", data)
      setUser(data.username)
      return Navigate("/HomePage");
    }else if(res.status === 401){
      seterrorMsg("email and password didn't match")
    } else {
      seterrorMsg("something went wrong.. Try again later")
    }
  }
  catch(error){
    console.error("server error...")
  }
}
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handlesubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && (
          <div className="md-4 text-red-600 font-medium text-center">{errorMsg}</div>
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

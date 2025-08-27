import { useState } from "react";
import {useNavigate} from 'react-router-dom'
export function SignupForm() {

  const[errorMsg, seterrorMsg] = useState('');
const[userdata,setuserData] = useState({
  username:"",
  email:"",
  password:""
})
const Navigate = useNavigate();

  const handleChange=(e)=>{
    setuserData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
        const postData = await fetch("http://localhost:8080/user/auth/signup",{
          method:"POST",
          headers:
          {"Content-Type":"application/json"},
          body:JSON.stringify(userdata),
        })
        const msg = await postData.text();
        if(postData.ok){
          alert(msg)
          return Navigate("/");
        }else{
          seterrorMsg(msg)
        }
      }catch(error){
        console.error(error)
        alert("error in signing")
      }
    }
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"  onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
         {errorMsg && (
          <div className="md-4 text-red-600 font-medium text-center">{errorMsg}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Enter username"
            name="username"
            onChange={handleChange}
            value={userdata.username}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={userdata.email}
            required
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
            value={userdata.password}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

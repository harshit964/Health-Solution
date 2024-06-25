import React from 'react'
import Header from './Header'
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { API_END_POINT } from '../utils/constant.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();


  const loginHandler = () => {
    setIsLogin(!isLogin);
  }
  const getInputData = async(e) =>{
    e.preventDefault();
    
    {
    if(isLogin){
      const user={email,password};
      
      try{
        const res = await axios.post(`${API_END_POINT}/login`, user,{
          headers:{
              'Content-Type':'application/json'
          },
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message);
        }
        navigate("/browse")

      }
      catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    else{
      const user={fullName,email,password};
      console.log(user);
      try{
        const res = await axios.post(`${API_END_POINT}/register`,user,{
          headers:{
              'Content-Type':'application/json'
          },
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message);
        }
        setIsLogin(true);
      }
      catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }

    }
    }
    setFullName("");
    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <div className='absolute'>
        <img className='w-[100vw] h-[100vh] bg-cover' src="https://imgs.search.brave.com/BaRIC-57lX5i56sjmvkEUNOFHd1Uc_vf965quAF0aPA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk1Lzll/LzA3Lzk1OWUwNzc0/ZmMxNjE3YjIyNDI2/MmU5YTA3NzFiNWZh/LmpwZw" alt="banner" />
      </div>
      <form onSubmit={getInputData} className='flex flex-col w-3/12 p-12 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90'>
        <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Login" : "Signup"}</h1>
        <div className='flex flex-col'>
            {
              !isLogin && <input type='text' value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='Fullname' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
            }
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
            <button type='submit' className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'>{(isLogin?"Login":"Signup")}</button>
            <p className='text-white mt-2'>{isLogin ? "New to Dr. Mini?" : "Already have an account?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></p>
        </div>
      </form>
    </div>
  )
}

export default Login
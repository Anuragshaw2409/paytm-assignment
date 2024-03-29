import React from 'react'
import Heading from "../Components/Heading"
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import SubmitButton from '../Components/SubmitButton'
import BottomWarning from '../Components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { useState, useEffect } from 'react'
import axios from 'axios'




function Signin() {
  const navigate = useNavigate();

  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");
  const signInSchema = z.object({
    email: z.string().email({message: "Enter correct email address"}),
    password: z.string().min(8,{message: "Enter correct Password"})
  });
  const [message, setMessage] = useState(null);


  useEffect(()=>{
    setMessage(null);
  },[email, password])

  async function submitSignIn(){

    const parsing = signInSchema.safeParse({email,password});
    if(!parsing.success)
      setMessage( parsing.error.issues[0].message);
    else
    try {
      const data = parsing.data;
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",
      data);
      

      setMessage(response.data.message);
      if(response.data.success){
      localStorage.setItem('token', response.data.token);
      
      setTimeout(()=>navigate('/dashboard'),1000);}
      else
      setMessage(response.data.message);



    } catch (error) {
      setMessage("Some error happened");
      
    }
}





  return (
    <div className='bg-slate-600 h-screen absolute w-full'>

       <div className='card bg-white rounded-xl left-[50%] relative -translate-x-[50%] py-3 px-1 top-[50%] -translate-y-[50%] w-96'>

        <Heading title={"Sign in"}/>
        <SubHeading title={"Enter your information to login to your account"}/>
        <InputBox title={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e)=>setEmail(e.target.value)}/>
        <InputBox title={"Password"} placeholder={"*******"} type={"password"} onChange={(e)=>setPassword(e.target.value)}/>
        {message && <h1 className='text-blue-700'>{message}</h1>}
        <SubmitButton title={"Submit"} onClick={submitSignIn}/>
        <BottomWarning title={"Don't have an account?"} link={'/signup'} linkText={"Sign Up"}/>

       </div>
    </div>
  )
}

export default Signin
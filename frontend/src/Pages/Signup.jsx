import React, { useEffect, useState } from 'react'
import Heading from "../Components/Heading"
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import SubmitButton from '../Components/SubmitButton'
import BottomWarning from '../Components/BottomWarning'
import z from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();

  const[firstName, setFirstName]=useState("");
  const[lastName, setLastName]=useState("");
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");
  const signUpSchema = z.object({
    firstName:z.string().min(1,{message:"First name cannot be empty"}),
    lastName:z.string().min(1,{message:"Last name cannot be empty"}),
    email: z.string().email({message: "Enter correct email address"}),
    password: z.string().min(8,{message: "Password must be atleast 8 characters long"})
  });
  const [message, setMessage] = useState(null);


  useEffect(()=>{
    setMessage(null);
  },[firstName, lastName, email, password])

  async function submitSignup(){

    const parsing = signUpSchema.safeParse({firstName,lastName,email,password});
    if(!parsing.success)
      setMessage( parsing.error.issues[0].message);
    else
    try {
      const data = parsing.data;
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",
      data);

      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      setTimeout(()=>navigate('/dashboard'),500);



    } catch (error) {
      setMessage("Some error happened");
    }




  }






  return (
    <div className='bg-slate-600 h-screen absolute w-full'>

      <div className='card bg-white rounded-xl left-[50%] relative -translate-x-[50%] py-3 px-1 top-[50%] -translate-y-[50%] w-96'>
        <Heading title={"Sign up"} />
        <SubHeading title={"Enter your information to create an account"} />
        <InputBox title={"First Name"} placeholder={"John"} onChange={(e)=>setFirstName(e.target.value)} />
        <InputBox title={"Last Name"} placeholder={"Doe"} onChange={(e)=>setLastName(e.target.value)}/>
        <InputBox title={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e)=>setEmail(e.target.value)}/>


        <InputBox title={"Password"} placeholder={"*******"} type={"password"}onChange={(e)=>setPassword(e.target.value)} />


        {message &&  <h1 className='text-red-500 text-center'>{message}</h1>}
        <SubmitButton title={"Submit"} onClick={submitSignup}/>


        <BottomWarning title={"Already have an account?"} link={'/signin'} linkText={"Sign in"} />

      </div>

    </div>
  )
}

export default Signup
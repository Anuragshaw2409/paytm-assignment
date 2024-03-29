import React, { useEffect } from 'react'
import SendMoney from '../Components/SendMoney'
import { useSearchParams, useNavigate } from 'react-router-dom'


function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const userName = searchParams.get('name');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/signin');

  })


  return (
    <>
    <div className='bg-slate-600 h-screen absolute w-full '>
      <SendMoney Name={userName} userId={id}/>

    </div>
    </>
  )
}

export default Send
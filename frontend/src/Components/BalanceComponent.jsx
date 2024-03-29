import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BalanceComponent() {

  const [balance, setBalance] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{

    const token = localStorage.getItem('token');
   
    if(!token)
      navigate('/signin');
    else
     try {
       axios.get("http://localhost:3000/api/v1/account/balance",{headers:{'authorization': token}}
        )
       
       .then((res)=>setBalance(res.data.balance))
       .catch((err)=>setErrorMsg(err.message));
     } catch (error) {
      setErrorMsg(error.message);
     }

  },[]);


  return (
    <>
    
        <div className='flex flex-row justify-start gap-2 p-2'>
            <h1 className='font-bold text-lg'>Your Balance:</h1>

            {balance && <h1 className='text-lg'>Rs {balance}</h1>} 
            {errorMsg && <h1 className='text-lg'>{errorMsg}</h1>}

        </div>
    
    
    
    </>
  )
}

export default BalanceComponent
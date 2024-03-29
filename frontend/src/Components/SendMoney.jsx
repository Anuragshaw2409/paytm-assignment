import React, { useState } from 'react'
import Heading from './Heading'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SendMoney({ Name="something", userId="123456" }) {
    const [amount, setAmount] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    async function handleOnSend(){
        const token = localStorage.getItem('token');
        if(!token)
            navigate('/signin');
        try {

            const response = await axios.post("http://localhost:3000/api/v1/account/transfer",
            {
                to: userId,
                amount: parseInt(amount)
            },{
                headers:{
                    authorization:token
                    
                }
            });
            console.log(response);
            if(response.status == 200)
                {   setTimeout(()=>navigate('/dashboard'), 1000);
                    setMessage("Transaction Successful");
                       
                }
            else 
                setMessage(response.data.message);
            
            


        } catch (error) {
            
            setMessage(error.response.data.message);
            
            
        }







    }


    return (
        <>
            
        

                <div className='card bg-white rounded-xl left-[50%] relative -translate-x-[50%] py-3  top-[50%] -translate-y-[50%] w-80 p-4 shadow-xl'>
                    <Heading title={"Send Money"} />
                    
                        <div className='flex  py-2 mt-6'>

                            <div className='bg-green-500 h-10 w-10 text-center rounded-full text-white text-2xl'>{Name.charAt(0)}</div>
                            <h1 className='ml-2 text-xl font-semibold'>{Name}</h1>
                        </div>
                        <h1 className='font-semibold '>Amount (in Rs)</h1>

                        <input type="number" placeholder='Enter Amount ' className='border-2  w-full px-2 rounded-sm text-sm py-1 outline-1 outline-blue-500' min={0} inputMode='numeric' onChange={(e)=>setAmount(e.target.value)}/>

                        {message && <h1 className='text-blue-800'>{message}</h1>}

                        <button className='bg-green-500 text-white w-full py-1 my-2 rounded-md hover:bg-green-600' onClick={handleOnSend}>Initiate Transfer</button>
                        

                    
                </div>
            
        </>
    )
}

export default SendMoney
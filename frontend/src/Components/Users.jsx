import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(()=>{

        const token = localStorage.getItem('token');
        if(!token)
            navigate('/signin');
        else
            
            try {

                axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`)
                .then((res)=>setUsers(res.data))
                .catch((err)=>setError(err.message))

                
            } catch (error) {
                setError(error.message);
                
            }

    },[search]);





  return (
    <>
        <div className='w-full p-2'>
            <h1 className='font-bold text-lg'>Users</h1>
            <input type="text" placeholder='Search users...' className='border-2 w-full py-1 px-2 rounded-md' onChange={(e)=>setSearch(e.target.value)}/>
            {users && users.map((user)=> <User user={user} key={user.userId}/>)}
            {error && <h1 className='text-red-700'>{error}</h1>}
        </div>


    </>
  )
}

function User({user}){
    const Name = user.firstName + " "+ user.lastName;
    const userId = user.userId;
    const navigate = useNavigate();


    function handleSendMoney(){
        navigate(`/send?id=${userId}&name=${Name}`);
    }
    return(
        <>

        <div className='p-2 flex justify-between my-2 shadow-sm'>

            <div className='flex'>

            <div className='bg-blue-400 h-7 w-7 text-center rounded-full text-white'>{Name.charAt(0)}</div>
            <h1 className='ml-2'>{Name}</h1>
            </div>
            <button className='bg-blue-400 py-1 px-2 rounded-md text-white hover:bg-blue-500' onClick={handleSendMoney}>Send Money</button>
            
        </div>

        
        
        </>


)

}

export default Users
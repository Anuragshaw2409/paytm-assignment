import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'





function Root() {


  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }}, [token]);


  return (
    <>
      <div className='w-full flex justify-end'>

        {token && <button className='bg-blue-600 p-2 rounded-md mx-2 my-1 text-white' onClick={() => { setToken(null); localStorage.removeItem('token'); navigate('/signin') }}>Log Out</button>}
      </div>
      <Outlet />

    </>
  )
}

export default Root
import React, { useState } from 'react'

function InputBox({ title, placeholder, onChange, type }) {



  return (
    <>
      <div className=' p-1'>
        <h1 className='font-semibold text-lg'>{title}</h1>
        <input type={type} placeholder={placeholder} className='border-2 rounded-md p-1 text-md outline-1 outline-blue-600 w-full' onChange={onChange} />
         
      </div>
    </>
  )
}

export default InputBox
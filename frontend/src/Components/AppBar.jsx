import React from 'react'

function AppBar({name="Default"}) {
  return (
    <>
        <div className='flex justify-between border-2 p-2 shadow-md flex-row'>
            <div><h1>PayTM App</h1></div>
            <div className='flex '>
            
                <h1 className='px-2'>Hello,</h1>
                <div className='bg-blue-300 h-7 w-7 text-center rounded-full text-white'>{name.charAt(0).toUpperCase()}</div>

            </div>
        </div>
    </>
  )
}

export default AppBar
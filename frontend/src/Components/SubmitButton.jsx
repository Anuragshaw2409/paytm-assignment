import React from 'react'

function SubmitButton({title, onClick}) {
  return (
    <>
    <button className='border-2 w-full rounded-md bg-blue-600 text-white font-semibold py-1 text-lg hover:bg-blue-700 my-3' onClick={onClick}>
        {title}
    </button>

    </>
  )
}

export default SubmitButton
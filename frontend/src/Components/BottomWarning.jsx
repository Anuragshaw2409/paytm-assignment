import React from 'react'
import { Link } from 'react-router-dom'

function BottomWarning({title, link, linkText}) {
  return (
    <>
    <div className='text-center'>
        
            <h1 className='text-sm'>{title}
            <Link to={link} className='px-2 text-sm text-blue-700 underline'>{linkText}</Link>
            </h1>
        
    </div>
    
    
    </>
  )
}

export default BottomWarning
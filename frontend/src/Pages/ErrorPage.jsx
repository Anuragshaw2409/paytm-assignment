import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError();
    console.log(error); 
  return (
    <>
    <h1>Uh, ho</h1>
    <h3>Guess, we ran into an error</h3>
    <i>{error.statusText}</i>
    </>
  )
}

export default ErrorPage
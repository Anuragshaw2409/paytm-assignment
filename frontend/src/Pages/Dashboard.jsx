import React from 'react'
import AppBar from "../Components/AppBar"
import BalanceComponent from "../Components/BalanceComponent"
import Users from "../Components/Users"


function Dashboard() {
  



  return (
    <>
    <div className='mt-20'>
    <AppBar name={"Default"}/>
    </div>
    <div>
      <BalanceComponent />
    </div>
    <div>
      <Users/>
    </div>

    </>
  )
}

export default Dashboard
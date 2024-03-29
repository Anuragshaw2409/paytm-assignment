import Root from "./Pages/Root"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import ErrorPage from "./Pages/ErrorPage"
import { RecoilRoot } from "recoil"
import Send from "./Pages/Send"
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [{
        path:'/signup',
        element: <Signup/>
      },
      {
        path:'/signin',
        element: <Signin/>

      },
      {
        path:'/dashboard',
        element: <Dashboard/>
      },
      {
        path:'/send',
        element: <Send/>
      }
    ]
      
    }
   
  ])

  return (
    <>
    <RecoilRoot>
    <RouterProvider router={router}/>

    </RecoilRoot>
  
    </>
  )
}

export default App

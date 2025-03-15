import { Routes,Route, Navigate } from "react-router-dom"
import {Navbar} from "./components/Navbar.jsx"
import { Toaster} from "react-hot-toast"
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/Login.jsx"
import { SignUpPage } from "./pages/SignUp.jsx"
import { SettingsPage } from "./pages/Settings.jsx"
import { Profile } from "./pages/Profile.jsx"
import { UserAuthStore } from "./store/userAuthstore.jsx"
import { Loader } from 'lucide-react';
import { useEffect } from "react"
import { useThemeStore } from "./store/useThemestore.js"


const App = ()=>{

  const {authuser,CheckAuth,isCheckAuth} =  UserAuthStore()
  const { theme}= useThemeStore()

  useEffect(() => {
    CheckAuth()
  },[CheckAuth])

  if(isCheckAuth && !authuser){
    return(
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return(
    <>

    <div data-theme={theme}>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          duration:4000
        }}/>
        <Navbar />
        <Routes >
          <Route path="/" element={authuser ? <Home /> : <Navigate to={'/login'}/>} /> 
          <Route path="/signup" element={!authuser ? <SignUpPage  /> : <Navigate to={'/'} />} />
          <Route path="/login" element={!authuser ?  <Login/> : <Navigate to={'/'} />} />
          <Route path="/settings" element={<SettingsPage />}/>
          <Route path="/profile" element={authuser ? <Profile /> : <Navigate to={'/login'}/> }/>

        </Routes>
      
    </div>

    </>
  )
}

export default App
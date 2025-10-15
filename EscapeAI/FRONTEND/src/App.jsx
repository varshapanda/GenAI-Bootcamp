import React from "react"
import LoginForm from "./components/LoginForm"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Signup from "./components/SignUp";
import MainMenu from "./components/MainMenu";
import Landing from "./components/LandingPage";
function App() {
  
  
  return(
  <BrowserRouter>
  <Routes>
    <Route index='/EscapeAI' element={<Landing/>}/>
    <Route path="/Login" element={<LoginForm/>}/>
    <Route path='/signup' element={<Signup/>}/>
     <Route path="/Menu" element={<MainMenu/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App

import React from "react"
import LoginForm from "./components/LoginForm"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Signup from "./components/SignUp";
import MainMenu from "./components/MainMenu";
function App() {
  
  
  return(
  <BrowserRouter>
  <Routes>
    <Route index='/Login' element={<LoginForm/>}/>
    <Route path="/Login" element={<LoginForm/>}/>
    <Route path='/signup' element={<Signup/>}/>
     <Route path="/Menu" element={<MainMenu/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App

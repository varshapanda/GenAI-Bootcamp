import React from "react"
import LoginForm from "./components/LoginForm"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
function App() {
  return (
    
    <>
      <h1>
        Welcome to EscapeAI
      </h1>
      <button onClick={LoginNav}>
        Login
      </button>
      
    </>
  )
}

export default App

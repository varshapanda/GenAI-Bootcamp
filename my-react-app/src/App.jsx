import React from "react"
import {useState} from "react"
import LoginForm from "./components/Loginpage"
import Menu from "./components/mainMenu"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm/>}/>
          <Route path='/LoginForm' element={<LoginForm/>}/>
          <Route path='/Menu' element={<Menu/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

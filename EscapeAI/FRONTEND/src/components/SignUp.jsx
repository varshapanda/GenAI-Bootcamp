import React from "react";
import {BrowserRouter,Routes,Route,Link, Navigate} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Signup=()=>{
    const Navigate=useNavigate()
    function LoginNav(){
        Navigate('/Login')
    }
    return(
        <div>
            <p>dfewfwefewf</p>
            <button onClick={LoginNav}>ververv</button>
        </div>
    )

}
export default Signup
import React from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const LoginForm=()=>{
    const Navigate=useNavigate()
    function SignNav(){
        Navigate('/signup')
    }

    return(
        <div>
            <div className="InputForm">
                <form>
                    <input type="text" placeholder="Username" />
                    <button onClick={SignNav}>vvrever</button>
                </form>
            </div>

        </div>
    )
}
export default LoginForm
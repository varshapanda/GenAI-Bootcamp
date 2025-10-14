import React from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import { Navigate } from "react-router-dom";

const LoginForm=()=>{
    return(
        <div>
            <div className="InputForm">
                <form>
                    <input type="text" placeholder="Username" />
                </form>
            </div>

        </div>
    )
}
export default LoginForm
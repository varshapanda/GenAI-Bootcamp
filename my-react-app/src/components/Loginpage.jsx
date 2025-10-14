import React from "react";
import './Loginpage.css'
const LoginForm=()=>{
    return (
        <div className="Wrapped">
            <form action="">
                <h1>Login</h1>
                <div className="Input-box">
                    <input type="text" placeholder="Username"  /><br /><br />
                    <input type="password" placeholder="Password"  />
                </div>

                <div className="Register"><p>Dont have an account?  
                     <a href="#">Register</a> </p>
                </div>
                

            </form>
        </div>
    )
}
export default LoginForm
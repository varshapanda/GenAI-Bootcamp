import React from "react";
const LoginForm=()=>{
    return (
        <div className="Wrapped">
            <h1>Login</h1>
            <form action=''>
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
import React from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {

    const navigate = useNavigate ()

    const handlesubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main>

            
            <div className="form-container">
                <h1>Register</h1>

                    <form onSubmit={handlesubmit}>
                
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address"  />
                </div>


                 <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter Username"  />
                </div> 


                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your confirm password"  />
                </div>

                <button className="button primary-button"><b>Register</b></button>
            </form>

            <p>Already have an account ? <Link to = {"/login"}>Login</Link></p>


            </div>
        </main>
    )
}

export default Register



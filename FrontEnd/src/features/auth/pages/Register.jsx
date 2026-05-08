import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const navigate = useNavigate ()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword ] = useState("")
    const [confirmpassword, setconfirmPassword ] = useState("")

    const { loading, handelRegister } = useAuth()

    const handlesubmit = async (e) => {
        e.preventDefault()
        await ({username, email, password, confirmpassword })
        navigate("/")
    }
    if(loading){
        return (<main><h1>Loading...........</h1></main>)
    }

    return (
        <main>

            
            <div className="form-container">
                <h1>Register</h1>

                    <form onSubmit={handlesubmit}>
                
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e) => {setEmail(e.target.value)}} // two way binding
                    type="email" id="email" name="email" placeholder="Enter your email address"  />
                </div>


                 <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e) => {setUsername(e.target.value)}}
                    type="text" id="username" name="username" placeholder="Enter Username"  />
                </div> 


                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e) => {setPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder="Enter your password" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input 
                    onChange={(e) => {setconfirmPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder="Enter your confirm password"  />
                </div>

                <button className="button primary-button"><b>Register</b></button>
            </form>

            <p>Already have an account ? <Link to = {"/login"}>Login</Link></p>


            </div>
        </main>
    )
}

export default Register



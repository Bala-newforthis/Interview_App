import React from "react";   // this page is UI
import "../auth.form.scss"

const Login = () => {
    
    const handlesubmit = (e) => {
        e.preventDefault()
    }
    
    
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handlesubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>

                    <button className="button primary-button"><b>Login</b></button>

                </form>
            </div>
        </main>
    )
}

export default Login
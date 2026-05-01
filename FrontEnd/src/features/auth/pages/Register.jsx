import React from "react";

const Register = () => {

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
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>

                <button className="button primary-button"><b>Register</b></button>
            </form>
            </div>
        </main>
    )
}

export default Register



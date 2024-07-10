import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUpPage = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context); 

    const handleClick = () => {
        actions.signUp(email, password)
    }

    useEffect(() => {
        if(store.isSignUpSuccessful){
            navigate("/login")
        }
    }, [store.isSignUpSuccessful])

    return (
        <>
            <div className="signup-page">
                <div>
                    <h1>Sign Up</h1>
                </div>
                <div>
                    {store.signupMessage || ""}
                </div>
                <div>
                    <input 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <br></br>
                    <input 
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button">
                    <button
                       onClick={handleClick} 
                    >Sign Up</button>
                </div>
            </div>
        </>
    );
} 
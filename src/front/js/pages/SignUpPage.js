import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

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
           <div className="signup-page container-fluid" style={{textAlign: "center", justifyContent: "center", display: "inline-flex"}}>
                <div className="signup-box" style={{width:"325px", height: "250px", margin: "auto", marginTop: "100px"}}>
                    <div className="signup-box-contents">
                        <h1>Create an account</h1>
                        <br></br>
                        <br></br>
                        <div>
                            {store.signupMessage || ""}
                        </div>
                        <input 
                            type="name"
                            placeholder="Enter full name"
                            //value={full_name}
                            //onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <input 
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <input 
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <input 
                            type="password"
                            placeholder="Confirm password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <button onClick={handleClick}>Create account</button>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        </>
    );
}
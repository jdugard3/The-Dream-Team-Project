import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const LoginPage = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleClick = () => {
        actions.login(email, password)
    }

    useEffect(() => {
        if (store.isLoginSuccessful) {
            navigate("/home")
        }

    }, [store.isLoginSuccessful])

    return (
        <> 
            <div className="login-page container-fluid" style={{textAlign: "center", justifyContent: "center", display: "inline-flex"}}>
                <div className="login-box" style={{width:"325px", height: "250px", margin: "auto", marginTop: "100px"}}>
                    <div className="login-box-contents" style={{width:"400px", height: "450px"}} >
                        <h2>Log into your account</h2>
                        <br></br>
                        <br></br>
                        <div>
                            {store.signupMessage || ""}
                        </div>
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
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <button onClick={handleClick}>Login</button>
                        <br></br>
                        <br></br>
                        <a>Don't have an account?</a> 
                            <Link to={"/signup"}>
                                <a className="link-primary">Sign Up</a>
                            </Link> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const LoginPage = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    return (
        <> 
            <div className="login-page container-fluid" style={{textAlign: "center", justifyContent: "center", display: "inline-flex"}}>
                <div className="login-box" style={{width:"325px", height: "250px", margin: "auto", marginTop: "100px"}}>
                    <div className="login-box-contents">
                        <a>Log into your account</a>
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
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br></br>
                        <br></br>
                        <button>Login</button>
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
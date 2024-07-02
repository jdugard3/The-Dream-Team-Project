import React from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {

    return (
        <> 
            <div className="login-page container-fluid" style={{textAlign: "center", justifyContent: "center", display: "inline-flex"}} >
                <div className="login-box" style={{width:"325px", height: "250px", margin: "auto", marginTop: "100px"}} >
                    <div className="login-box-contents">
                        <a>Log into your account</a>
                        <br></br>
                        <br></br>
                        <input placeholder="Enter email" type="email" /> 
                        <br></br>
                        <br></br>
                        <input placeholder="Enter password" type="password" />
                        <br></br>
                        <br></br>
                        <button type="button" class="btn btn-primary">Log in</button>
                        <br></br>
                        <br></br>
                        <a>
                            Don't have an account? 
                            <Link to={"/signup"}>
                                <a href="" class="link-primary"> Sign Up </a>
                            </Link> 
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [emptyEmail, setEmptyEmail] = useState("");
    const [emptyPassword, setEmptyPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleClick = async () => {

        // setErrorMessage("");
        // setResetPassword("");
        // setEmptyEmail("");
        // setEmptyPassword("");

        const success = await actions.login({
            email: email,
            password: password
        });

        if (email === "") {
            setEmptyEmail("Field cannot be empty");
        }
        if (password === "") {
            setEmptyPassword("Field cannot be empty");
        }

        if (success) {
            navigate("/profile")
        } else {
            alert("An error occurred when logging in")
        }

        /* if (success) {
            setErrorMessage("Email or password does not match. Try Again");
            setResetPassword("Forgot your password?");
        } */
        
    }

    useEffect(() => {
        if (store.isLoginSuccessful) {
            navigate("/profile")
        }

    }, [store.isLoginSuccessful])

    return (
        <>
            <div className="login-page container-fluid" style={{ textAlign: "center", justifyContent: "center", display: "flex"}}>
                <div className="login-box" style={{ width: "325px", height: "250px", margin: "auto", marginTop: "100px" }}>
                    <div className="login-box-contents" style={{ width: "400px", height: "550px" }}>
                        <h2>Log In</h2>
                        <br></br>
                        <br></br>
                        <div>
                            {store.signupMessage || ""}
                        </div>
                        {errorMessage && !emptyEmail && !emptyPassword && <div style={{ color: 'red' }}>{errorMessage}</div>}
                        <br></br>
                        <h4 style={{ marginLeft: "-125px" }}>Email:</h4>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <br></br>
                        {emptyEmail && <div style={{ color: 'red' }}>{emptyEmail}</div>}
                        <br></br>
                        <h4 style={{ marginLeft: "-82px" }}>Password:</h4>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br></br>
                        {emptyPassword && <div style={{ color: 'red' }}>{emptyPassword}</div>}
                        {resetPassword && !emptyEmail && !emptyPassword && <Link to={"/resetpassword"}>{resetPassword}</Link>}
                        <br></br>
                        <button className="basketball-button" onClick={handleClick}><img className="basketball-img" src="https://cdn-icons-png.flaticon.com/512/889/889455.png" /></button>
                        <br></br>
                        <br></br>
                        <a>Don't have an account? </a>
                        <Link to={"/signup"}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
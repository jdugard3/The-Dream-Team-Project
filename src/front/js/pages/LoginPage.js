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

        setErrorMessage("");
        setResetPassword("");
        setEmptyEmail("");
        setEmptyPassword("");

        const success = await actions.login(email, password);

        if (success) {
            setErrorMessage("Email or password does not match. Try Again");
        }

        if (email === "") {
            setEmptyEmail("*Field cannot be empty*");
        }
        if (password === "") {
            setEmptyPassword("*Field cannot be empty*");
        }
    }

    useEffect(() => {
        if (store.isLoginSuccessful) {
            navigate("/profile");
        }

    }, [store.isLoginSuccessful])

    return (
        <div className="login-page container-fluid">
            <div className="login-box">
                <div className="login-box-contents">
                    <h2>Log In</h2>
                    {errorMessage && !emptyEmail && !emptyPassword && <div style={{color:"red"}} >{errorMessage}</div>}
                    <h4 style={{ textAlign: 'left'}}>Email:</h4>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    {emptyEmail && <div className="error-message">{emptyEmail}</div>}
                    <h4 style={{ textAlign: 'left' }}>Password:</h4>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {emptyPassword && <div className="error-message">{emptyPassword}</div>}
                    <button className="basketball-button" onClick={handleClick}>
                        <img className="basketball-img" src="https://cdn-icons-png.flaticon.com/512/889/889455.png" alt="Basketball Icon" />
                    </button>
                    <div>
                        Don't have an account?
                        <Link to={"/signup"} className="text-primary" >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

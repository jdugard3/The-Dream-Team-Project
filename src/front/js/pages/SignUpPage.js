import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUpPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState("");
    const [emptyName, setEmptyName] = useState("");
    const [emptyEmail, setEmptyEmail] = useState("");
    const [emptyPassword, setEmptyPassword] = useState("");
    const [specialCharWarning, setSpecialCharWarning] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleClick = () => {

        setEmptyName("");
        setEmptyEmail("");
        setEmptyPassword("");
        setSpecialCharWarning("");

        if (password == confirmPassword) {
            actions.signUp(email, password, fullName);
        } else {
            setPasswordMismatch("Passwords do not match");
        }

        if (email === "") {
            setEmptyEmail("Field cannot be empty");
        }
        if (password === "") {
            setEmptyPassword("Field cannot be empty");
        }
        if (fullName === "") {
            setEmptyName("Field cannot be empty");
        }
        if (password === "" || !/[!@$1-9]/.test(password)) {
            setSpecialCharWarning("Password must include at least one special character: @, !, 1-10");
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value !== confirmPassword) {
            setPasswordMismatch("Passwords do not match");
        } else {
            setPasswordMismatch("");
        }

        if (!/[!@1-9$]/.test(e.target.value)) {
            setSpecialCharWarning("Password must include at least one special character: @, !, 1-9");
        } else {
            setSpecialCharWarning("");
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setPasswordMismatch("Passwords do not match");
        } else {
            setPasswordMismatch("");
        }
    }



    useEffect(() => {
        if (store.isSignUpSuccessful) {
            navigate("/feedback");
        }
    }, [store.isSignUpSuccessful, navigate]);

    return (
        <>
            <div className="signup-page container-fluid" style={{ textAlign: "center", justifyContent: "center", display: "inline-flex" }}>
                <div className="signup-box" style={{ width: "325px", height: "250px", margin: "auto", marginTop: "100px" }}>
                    <div className="signup-box-contents">
                        <h1>Create an account</h1>
                        <br />
                        <br />
                        <div>
                            {store.signupMessage || ""}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        />
                        {emptyName && <div style={{ color: 'red' }}>{emptyPassword}</div>}
                        <br />
                        <br />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        {emptyEmail && !confirmPassword && !passwordMismatch && <div style={{ color: 'red' }}>{emptyEmail}</div>}
                        <br />
                        <br />
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <br />
                        <a style={{ color: 'red' }}>Special characters needed: @!$1-9</a>
                        {specialCharWarning && !confirmPassword && !passwordMismatch && <div style={{ color: 'red' }}>{specialCharWarning}</div>}
                        {emptyPassword && !confirmPassword && !passwordMismatch && <div style={{ color: 'red' }}>{emptyPassword}</div>}
                        <br />
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {emptyPassword && <div style={{ color: 'red' }}>{emptyPassword}</div>}
                        <br />
                        {passwordMismatch && <div style={{ color: 'red' }}>{passwordMismatch}</div>}
                        <br />
                        <button onClick={handleClick}>Create account</button>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;

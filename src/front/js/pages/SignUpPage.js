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

        if (password === confirmPassword) {
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
            navigate("/");
        }
    }, [store.isSignUpSuccessful, navigate]);

    return (
        <div className="signup-page">
            <div className="signup-box">
                <div className="signup-box-contents">
                    <h1>Create an account</h1>
                    <input
                        type="text"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                    />
                    {emptyName && <div className="error">{emptyName}</div>}
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    {emptyEmail && !confirmPassword && !passwordMismatch && <div className="error">{emptyEmail}</div>}
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <div className="special-char-warning">Special characters needed: @!$1-9</div>
                    {specialCharWarning && !confirmPassword && !passwordMismatch && <div className="error">{specialCharWarning}</div>}
                    {emptyPassword && !confirmPassword && !passwordMismatch && <div className="error">{emptyPassword}</div>}
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {emptyPassword && <div className="error">{emptyPassword}</div>}
                    {passwordMismatch && <div className="error">{passwordMismatch}</div>}
                    <button onClick={handleClick}>Create account</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/resetpassword.css";


export const ResetPassword = () => {
    return (
        <>
            <div className="container-fluid">
                <h1 className="h1-title" >Reset Your Password</h1>
                <div className="reset-password-box">
                    <div className="reset-password-contents">
                        <h3 className="h3-directions">Please enter your email address</h3>
                        <h5 className="sentence-directions" >Enter your email address and you will receive a link sent to your email with instructions on how to reset your password.</h5>
                        <br />
                        <h4 className="user-info-title">Email: <input type="email" placeholder="Enter email address" /> </h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
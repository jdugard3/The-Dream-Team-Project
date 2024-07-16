import React, { useContext, useEffect, useState } from 'react';
import '../../styles/profile.css';
import { UserBar } from '../component/UserBar.js';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Import Context

export const UserProfilePage = () => {
    const { store, actions } = useContext(Context); // Use Context to access store and actions
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: "1",
        email: "",
        password: "",
        full_name: "",
        favorites: "",
        shoes: "",
        feedbacks: ""
    })

    useEffect(() => {

        const getCurrentUser = async() => {
           actions.fetchUserData()
           
        }

        /* try {
            if (!sessionStorage.getItem("token")||!sessionStorage.getItem("userId")) {
                navigate("/login")
            } else {
                getCurrentUser()
            }     
        } catch (err) {
            console.log(err)
        } */
        

    },[]);

    useEffect(() => {
        actions.fetchUserData();
    }, [actions]); // Include actions as a dependency

    const UserEditRedir = () => {
        navigate(`/profile/edit`);
    }

    /* const user = store.user;
    console.log("Current user data:", user); // Debugging log 

    if (!user) {
        return <div>Loading...</div>; // Handle loading state
    } */

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <UserBar />
                </div>
                <div className="col-1"></div>
                </div>
                <div className="col-md-8">
                    <h1>{user.username}</h1>
                    <h3>{user.full_name}</h3>
                    <h5>{user.details}</h5>
                    <button onClick={UserEditRedir}>Update Shipping/Card Info</button>
                </div>
            </div>
    );
};

export default UserProfilePage;

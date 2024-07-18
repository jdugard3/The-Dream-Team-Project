import React, { useContext, useEffect, useState } from 'react';
import '../../styles/profile.css';
import { UserBar } from '../component/UserBar.js';
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Import Context

export const UserProfilePage = () => {
    const { store, actions } = useContext(Context); // Use Context to access store and actions
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        full_name: "",
        favorites: "",
        shoes: "",
        feedbacks: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!sessionStorage.getItem("token")) {
                    navigate("/login");
                    return; // Exit function early if token or userId is not present
                }
    
                const result = await actions.fetchUserData(); // Assuming fetchUserData returns user data
                if (result) {
                    setUser(store.user)
                } else {
                    alert("An error occurred when trying to fetch user data. Please try again later")
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                // Optionally handle error state or retry logic
            }
        };
    
        fetchUserData(); // Call fetchUserData when component mounts
    }, []);
    
    const UserEditRedir = () => { navigate(`/profile/edit`); };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <UserBar />
                </div>
                <div className="col-1"></div>
                <div className="col-md-8">
                    <h1>{user?.username}</h1>
                    <h3>{user?.full_name}</h3>
                    <h5>{user?.details}</h5>
                    {/* <button onClick={UserEditRedir}></button> */}
                    <Link to="/profile/edit"><button>Update Shipping/Card Info</button></Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
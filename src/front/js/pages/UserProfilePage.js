import React, { useContext, useEffect, useState } from 'react';
import '../../styles/profile.css';
import { UserBar } from '../component/UserBar.js';
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserProfilePage = () => {
    const { store, actions } = useContext(Context);
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
                    return;
                }
    
                const result = await actions.fetchUserData();
                if (result) {
                    setUser(store.user)
                } else {
                    alert("An error occurred when trying to fetch user data. Please try again later")
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
    
        fetchUserData();
    }, []);
    
    const UserEditRedir = () => { navigate(`/profile/edit`); };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '10px' }}>
            <div className="row" style={{height:"620px"}}>
                <div className="col-1"></div>
                <div className="col-10">
                    <UserBar />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '20px' }}></div>
                        <div>
                            <h1>{user?.username}</h1>
                            <h3>{user?.full_name}</h3>
                            <p>{user?.details}</p>
                            <Link to="/profile/edit"><button className="btn btn-primary">Edit Shipping Info</button></Link>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-md-8">
                    
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
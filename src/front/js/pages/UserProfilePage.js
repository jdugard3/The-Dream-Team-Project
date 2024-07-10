import React from 'react';
import '../../styles/profile.css';
import { AppContext } from '../store/appContext.js';
import { OrdersPage } from './OrdersPage.js';
import { UserBar } from '../component/UserBar.js';

export const UserProfilePage = () => {

    // Sample user data
    const user = {
        profilePic: 'https://via.placeholder.com/150', // Placeholder image, replace with actual image URL
        username: 'ervil_lebaron',
        name: 'Ervil Lebaron',
        details: '6 Lakers Ln, Los Angeles, CA',
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-10">
                    <UserBar />
                </div>
                <div className="col-1">

                </div>
                <div className="col-md-4">
                    <img 
                        src={user.profilePic} 
                        alt="Profile-picture" 
                        className="img-fluid rounded-circle"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{user.username}</h1>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <h5>{user.details}</h5>
                    <button onlick='<OrdersPage />'>Update Shipping/Card Info</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;

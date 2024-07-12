import React from 'react';
import '../../styles/profile.css';
import { UserBar } from '../component/UserBar.js';
import { useNavigate } from "react-router-dom";
//import User from '../../../api/models.py';

export const UserProfilePage = () => {
    const navigate = useNavigate()
  
    const UserEditRedir=()=>{
      navigate(`/profile/${User.id}/edit`);
    }

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
                    <h3>{user.fullName}</h3>
                    <h5>{user.details}</h5>
                    <button onlick={UserEditRedir()}>Update Shipping/Card Info</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;

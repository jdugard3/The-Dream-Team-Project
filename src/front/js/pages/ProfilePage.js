import React from 'react';
import '../../styles/profile.css';

export const ProfilePage = () => {
    // Sample user data
    const user = {
        profilePic: 'https://via.placeholder.com/150', // Placeholder image, replace with actual image URL
        username: 'john_doe',
        name: 'John Doe',
        details: '[home address goes here]',
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img 
                        src={user.profilePic} 
                        alt="Profile-picture" 
                        className="img-fluid rounded-circle"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{user.username}</h1>
                    <h3>{user.name}</h3>
                    <h5>{user.details}</h5>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

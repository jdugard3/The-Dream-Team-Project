import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/UserBar.css'; 

export const UserBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link btn-custom" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn-custom" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn-custom" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn-custom" to="/favorites">Favorites</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserBar;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"; // Adjusted import path

export const Navbar = () => {
    const { actions, store } = useContext(Context);

    return (
        <nav className="navbar custom-navbar">
            <div className="container">
                <Link to="/home" className="navbar-brand">
                    <img src="https://trello.com/1/cards/667c94d0b4d07a8c0c828db2/attachments/6685f3cabc9664e54ed22c08/previews/6685f3cbbc9664e54ed22c15/download/Hoop_Legend_Sneakers_Logo%21.webp" alt="Logo" className="navbar-logo" />
                </Link>
                <div className="navbar-buttons ml-auto">
                    <Link to="/login">
                        <button className="btn btn-custom">Login/Signup</button>
                    </Link>
                    <Link to="/profilePage">
                        <button className="btn btn-custom">Profile</button>
                    </Link>
                    <div className="dropdown">
                        <button className="btn btn-custom dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Shoe #1</a></li>
                            <li><a className="dropdown-item" href="#">Shoe #2</a></li>
                            <li><a className="dropdown-item" href="#">Shoe #3</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-custom" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Shopping Cart</button>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Shopping Cart</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    Item #1 
                </div>
            </div>
        </nav>
    );
};

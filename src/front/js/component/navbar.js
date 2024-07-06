import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login/Signup</button>
					</Link>
				</div>
				<div>
					<Link to="/profilePage">
						<button className="btn btn-danger">Profile</button>
					</Link>
				</div>
				<div className="dropdown">
					<button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Shoe #1</a></li>
						<li><a className="dropdown-item" href="#">Shoe #2</a></li>
						<li><a className="dropdown-item" href="#">Shoe #3</a></li>
					</ul>
				</div>
				<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Shopping Cart</button>

				<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasRightLabel">Shopping Cart</h5>
						<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						...
					</div>
				</div>
			</div>
		</nav>
	);
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<header>
				<nav>
					<div className="logo">Hoop Legend Sneakers</div>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/michael-jordan">Michael Jordan Collection</a></li>
					</ul>
				</nav>
			</header>
			<main>
				<section className="hero">
					<h1>Welcome to Hoop Legend Sneakers</h1>
					<p className="mission-statement">
						At HoopLegendSneakers, we celebrate the legacy of basketball's greatest superstars by bringing you an exclusive collection of iconic sneakers from Michael Jordan, Kobe Bryant, LeBron James, Stephen Curry, and Kevin Durant. Our mission is to connect you with the stories behind each legendary pair, providing not just footwear but a piece of basketball history. With detailed player bios and the rich narratives of their signature sneakers, we aim to inspire and ignite the passion of every basketball enthusiast. Step into greatness and wear the legacy with HoopLegendSneakers.
					</p>
					<a href="/collections" className="explore-button">Explore Collections</a>
				</section>
				<section className="collections">
					<div className="collection">
						<img src="/path/to/michael-jordan-sneakers.jpg" alt="Michael Jordan Sneakers" />
						<h2>Michael Jordan</h2>
					</div>
					<div className="collection">
						<img src="/path/to/kobe-bryant-sneakers.jpg" alt="Kobe Bryant Sneakers" />
						<h2>Kobe Bryant</h2>
					</div>
					<div className="collection">
						<img src="/path/to/lebron-james-sneakers.jpg" alt="LeBron James Sneakers" />
						<h2>LeBron James</h2>
					</div>
					<div className="collection">
						<img src="/path/to/stephen-curry-sneakers.jpg" alt="Stephen Curry Sneakers" />
						<h2>Stephen Curry</h2>
					</div>
					<div className="collection">
						<img src="/path/to/kevin-durant-sneakers.jpg" alt="Kevin Durant Sneakers" />
						<h2>Kevin Durant</h2>
					</div>
				</section>
			</main>
			<footer>
				<p>© 2024 Hoop Legend Sneakers. All rights reserved.</p>
				<ul>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Terms of Service</a></li>
				</ul>
			</footer>
		</div>
	);
};

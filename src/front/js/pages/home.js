import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const collections = [
		{
			name: "Michael Jordan",
			image: "/path/to/michael-jordan-sneakers.jpg",
			route: "/michael-jordan"
		},
		{
			name: "Kobe Bryant",
			image: "/path/to/kobe-bryant-sneakers.jpg",
			route: "/kobe-bryant"
		},
		{
			name: "LeBron James",
			image: "/path/to/lebron-james-sneakers.jpg",
			route: "/lebron-james"
		},
		{
			name: "Stephen Curry",
			image: "/path/to/stephen-curry-sneakers.jpg",
			route: "/stephen-curry"
		},
		{
			name: "Kevin Durant",
			image: "/path/to/kevin-durant-sneakers.jpg",
			route: "/kevin-durant"
		}
	];


	return (
		<>
			<div>
				<main>
					<section className="hero">
						<h1 className="website-title" >Welcome to Hoop Legend Sneakers</h1>
						<p className="mission-statement">
							At HoopLegendSneakers, we celebrate the legacy of basketball's greatest superstars by bringing you an exclusive collection of iconic sneakers from Michael Jordan, Kobe Bryant, LeBron James, Stephen Curry, and Kevin Durant. Our mission is to connect you with the stories behind each legendary pair, providing not just footwear but a piece of basketball history. With detailed player bios and the rich narratives of their signature sneakers, we aim to inspire and ignite the passion of every basketball enthusiast. Step into greatness and wear the legacy with HoopLegendSneakers.
						</p>
						{/* <a href="/collections" className="explore-button">Explore Collections</a> */}
					</section>
					<section className="collections">
						{collections.map((collection, index) => (
						<Link to={collection.route} key={index} className="collection">
								<img src={collection.image} alt={`${collection.name} Sneakers`}/>
								<h2>{collection.name}</h2>
						</Link>
						))}
					</section>
				</main>
			</div>
		</>
	);
};

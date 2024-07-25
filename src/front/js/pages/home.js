import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const collections = [
		{
			name: "Michael Jordan",

			image: "https://www.si.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTY4MTg2MDIyNzgyODM4MDMz/1988-michael-jordan-001238167_0jpg.webp",



			route: "/michael-jordan"
		},
		{
			name: "Kobe Bryant",

			image: "https://media.gettyimages.com/id/84597779/photo/los-angeles-lakers-v-new-york-knicks.jpg?s=2048x2048&w=gi&k=20&c=Aj0r0rG0r7FPfRTDYqEQh6qnHV411wEQaJOQ7k9B5C4=",


			route: "/kobe-bryant"
		},
		{
			name: "LeBron James",

			image: "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2023-12/LeBron%20James%20121123.jpeg?h=920929c4&itok=Y69O-gbW",

			route: "/lebron-james"
		},
		{
			name: "Stephen Curry",

			image: "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2021-12/stephen-curry-12142021-ftr_4eql5k00ttqn1jkyeqm8zu999.jpeg?itok=4ZMIHMKt",


			route: "/stephen-curry"
		},
		{
			name: "Kevin Durant",

			image: "https://pyxis.nymag.com/v1/imgs/031/1e4/8624fe26c49094b3910d0d0b2f144f07c7-Kevin-Durant.rhorizontal.w700.jpg",

			route: "/kevin-durant"
		}
	];

	return (
		<>
			<div>
				{/* <header>

				</header> */}
				<main style={{ height: "1000px" }} >
					<section className="hero">
						<h1 className="website-title" >Welcome to Hoop Legend Sneakers</h1>
						<p className="mission-statement">
							At HoopLegendSneakers, we celebrate the legacy of basketball's greatest superstars by bringing you an exclusive collection of iconic sneakers from Michael Jordan, Kobe Bryant, LeBron James, Stephen Curry, and Kevin Durant. Our mission is to connect you with the stories behind each legendary pair, providing not just footwear but a piece of basketball history. With detailed player bios and the rich narratives of their signature sneakers, we aim to inspire and ignite the passion of every basketball enthusiast. Step into greatness and wear the legacy with HoopLegendSneakers.
						</p>
					</section>
					<section className="collections">
						{collections.map((collection, index) => (
							// <Link to={collection.route} key={index} className="collection">
							// 	<img src={collection.image} alt={`${collection.name} Sneakers`} className="collection-image" />
							// 	<h2>{collection.name}</h2>
							// </Link>

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

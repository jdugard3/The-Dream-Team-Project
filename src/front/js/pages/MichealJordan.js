import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const MichaelJordan = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<header>
				<nav>
					<div className="logo">HoopLegendSneakers</div>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/michael-jordan">Michael Jordan Collection</a></li>
					</ul>
				</nav>
			</header>
			<main>
				<section className="player-profile">
					<img src="/path/to/michael-jordan.jpg" alt="Michael Jordan" />
					<h2>Michael Jordan</h2>
					<p>Position: Shooting Guard</p>
					<p>Team: Chicago Bulls</p>
					<p>Achievements: 6x NBA Champion</p>
				</section>
				<section className="sneaker-pairs">
					<h2>Legendary Sneaker Pairs</h2>
					<div className="sneaker-pair">
						<img src="/path/to/air-jordan-1.jpg" alt="Air Jordan 1" />
						<h3>Air Jordan 1</h3>
						<p>The iconic sneaker that started it all. Worn by the player in their rookie season.</p>
					</div>
					<div className="sneaker-pair">
						<img src="/path/to/air-jordan-6.jpg" alt="Air Jordan 6" />
						<h3>Air Jordan 6</h3>
						<p>Worn during the player's first NBA championship win in 1991.</p>
					</div>
					<div className="sneaker-pair">
						<img src="/path/to/air-jordan-11.jpg" alt="Air Jordan 11" />
						<h3>Air Jordan 11</h3>
						<p>Known for its patent leather finish, worn during the 1995-96 season.</p>
					</div>
				</section>
				<section className="stories-behind">
					<h2>Stories Behind the Sneakers</h2>
					<div className="story">
						<h3>The Birth of a Legend</h3>
						<p>The Air Jordan 1 was first introduced in 1985. The player wore these during their rookie season, marking the beginning of a legendary career.</p>
					</div>
					<div className="story">
						<h3>First Championship</h3>
						<p>In 1991, the player led the Chicago Bulls to their first NBA Championship, wearing the Air Jordan 6. This marked the start of their dominance in the league.</p>
					</div>
					<div className="story">
						<h3>The Comeback</h3>
						<p>After a brief retirement, the player returned to the NBA in 1995 and wore the Air Jordan 11, leading the Bulls to a historic 72-10 season and another championship.</p>
					</div>
				</section>
			</main>
			<footer>
				<p>© 2024 HoopLegendSneakers. Celebrating the history and significance of legendary basketball sneakers.</p>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Terms of Service</a></li>
				</ul>
				<div className="social-media">
					<a href="#"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
					<a href="#"><img src="/path/to/twitter-icon.png" alt="Twitter" /></a>
					<a href="#"><img src="/path/to/instagram-icon.png" alt="Instagram" /></a>
				</div>
			</footer>
		</div>
	);
};
